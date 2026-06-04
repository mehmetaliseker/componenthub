package com.componenthub.backend.dto;

import com.componenthub.backend.entity.UiComponent;

public final class ComponentMapper {

    private ComponentMapper() {
    }

    public static ComponentResponse toResponse(UiComponent entity) {
        ComponentResponse response = new ComponentResponse();
        String cssCode = firstText(entity.getCssCode(), entity.getStyleCode());
        String tsxCode = firstText(entity.getTsxCode(), entity.getComponentCode());
        String tailwindTsxCode = entity.getTailwindTsxCode();

        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setTitle(entity.getName());
        response.setSlug(entity.getSlug());
        response.setDescription(entity.getDescription());
        response.setCategory(entity.getCategory());
        response.setPreviewType(entity.getPreviewType());
        response.setComponentCode(tsxCode);
        response.setStyleCode(cssCode);
        response.setJsxCode(entity.getJsxCode());
        response.setTsxCode(tsxCode);
        response.setCssCode(cssCode);
        response.setTailwindJsxCode(entity.getTailwindJsxCode());
        response.setTailwindTsxCode(tailwindTsxCode);
        response.setDependencies(entity.getDependencies());
        response.setResponsiveNotes(entity.getResponsiveNotes());
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
        String jsxCode = cleanOptional(request.getJsxCode());
        String tsxCode = cleanOptional(request.getTsxCode());
        String cssCode = cleanRequired(request.getCssCode());
        String tailwindJsxCode = cleanOptional(request.getTailwindJsxCode());
        String tailwindTsxCode = cleanOptional(request.getTailwindTsxCode());

        entity.setName(cleanRequired(request.getName()));
        entity.setSlug(cleanRequired(request.getSlug()).toLowerCase());
        entity.setDescription(cleanRequired(request.getDescription()));
        entity.setCategory(cleanRequired(request.getCategory()));
        entity.setPreviewType(cleanRequired(request.getPreviewType()));
        entity.setJsxCode(jsxCode);
        entity.setTsxCode(tsxCode);
        entity.setCssCode(cssCode);
        entity.setTailwindJsxCode(tailwindJsxCode);
        entity.setTailwindTsxCode(tailwindTsxCode);
        entity.setDependencies(cleanOptional(request.getDependencies()));
        entity.setResponsiveNotes(cleanOptional(request.getResponsiveNotes()));
        entity.setComponentCode(firstText(tsxCode, jsxCode, tailwindTsxCode, tailwindJsxCode));
        entity.setStyleCode(cssCode);
        entity.setBuiltin(request.getBuiltin() != null && request.getBuiltin());
    }

    private static String firstText(String... values) {
        for (String value : values) {
            if (value != null && !value.trim().isEmpty()) {
                return value;
            }
        }
        return null;
    }

    private static String cleanRequired(String value) {
        return value.trim();
    }

    private static String cleanOptional(String value) {
        if (value == null || value.trim().isEmpty()) {
            return null;
        }
        return value.trim();
    }
}
