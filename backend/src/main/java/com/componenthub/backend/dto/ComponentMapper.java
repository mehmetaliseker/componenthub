package com.componenthub.backend.dto;

import com.componenthub.backend.entity.UiComponent;

public final class ComponentMapper {

    private ComponentMapper() {
    }

    public static ComponentResponse toResponse(UiComponent entity) {
        ComponentResponse response = new ComponentResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setSlug(entity.getSlug());
        response.setDescription(entity.getDescription());
        response.setCategory(entity.getCategory());
        response.setPreviewType(entity.getPreviewType());
        response.setComponentCode(entity.getComponentCode());
        response.setStyleCode(entity.getStyleCode());
        response.setBuiltin(entity.isBuiltin());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        return response;
    }

    public static UiComponent toEntity(ComponentRequest request) {
        UiComponent entity = new UiComponent();
        applyRequest(entity, request);
        entity.setCreatedAt(java.time.LocalDateTime.now());
        entity.setUpdatedAt(java.time.LocalDateTime.now());
        return entity;
    }

    public static void applyRequest(UiComponent entity, ComponentRequest request) {
        entity.setName(request.getName());
        entity.setSlug(request.getSlug().trim().toLowerCase());
        entity.setDescription(request.getDescription());
        entity.setCategory(request.getCategory());
        entity.setPreviewType(request.getPreviewType());
        entity.setComponentCode(request.getComponentCode());
        entity.setStyleCode(request.getStyleCode());
        entity.setBuiltin(request.getBuiltin() != null && request.getBuiltin());
    }
}
