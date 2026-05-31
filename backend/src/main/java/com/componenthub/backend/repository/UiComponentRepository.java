package com.componenthub.backend.repository;

import com.componenthub.backend.entity.UiComponent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UiComponentRepository extends JpaRepository<UiComponent, Long> {

    List<UiComponent> findAllByOrderByCreatedAtDesc();

    Optional<UiComponent> findBySlug(String slug);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndIdNot(String slug, Long id);
}
