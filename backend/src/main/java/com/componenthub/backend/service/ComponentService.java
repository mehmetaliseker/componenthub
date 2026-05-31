package com.componenthub.backend.service;

import com.componenthub.backend.dto.ComponentMapper;
import com.componenthub.backend.dto.ComponentRequest;
import com.componenthub.backend.dto.ComponentResponse;
import com.componenthub.backend.entity.UiComponent;
import com.componenthub.backend.exception.ComponentNotFoundException;
import com.componenthub.backend.exception.DuplicateSlugException;
import com.componenthub.backend.repository.UiComponentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ComponentService {

    private final UiComponentRepository uiComponentRepository;

    public ComponentService(UiComponentRepository uiComponentRepository) {
        this.uiComponentRepository = uiComponentRepository;
    }

    @Transactional(readOnly = true)
    public List<ComponentResponse> listAll() {
        return uiComponentRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(ComponentMapper::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public ComponentResponse getBySlug(String slug) {
        UiComponent component = uiComponentRepository.findBySlug(normalizeSlug(slug))
                .orElseThrow(() -> new ComponentNotFoundException("Component not found: " + slug));
        return ComponentMapper.toResponse(component);
    }

    @Transactional
    public ComponentResponse create(ComponentRequest request) {
        String slug = normalizeSlug(request.getSlug());
        validateSlugAvailable(slug, null);
        UiComponent entity = ComponentMapper.toEntity(request);
        entity.setSlug(slug);
        UiComponent saved = uiComponentRepository.save(entity);
        return ComponentMapper.toResponse(saved);
    }

    @Transactional
    public ComponentResponse update(Long id, ComponentRequest request) {
        UiComponent entity = uiComponentRepository.findById(id)
                .orElseThrow(() -> new ComponentNotFoundException("Component not found with id: " + id));
        String slug = normalizeSlug(request.getSlug());
        validateSlugAvailable(slug, id);
        ComponentMapper.applyRequest(entity, request);
        entity.setSlug(slug);
        UiComponent saved = uiComponentRepository.save(entity);
        return ComponentMapper.toResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        if (!uiComponentRepository.existsById(id)) {
            throw new ComponentNotFoundException("Component not found with id: " + id);
        }
        uiComponentRepository.deleteById(id);
    }

    private void validateSlugAvailable(String slug, Long excludeId) {
        boolean exists = excludeId == null
                ? uiComponentRepository.existsBySlug(slug)
                : uiComponentRepository.existsBySlugAndIdNot(slug, excludeId);
        if (exists) {
            throw new DuplicateSlugException("Slug already exists: " + slug);
        }
    }

    private String normalizeSlug(String slug) {
        return slug.trim().toLowerCase();
    }
}
