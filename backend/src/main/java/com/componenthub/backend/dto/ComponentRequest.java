package com.componenthub.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ComponentRequest {

    @NotBlank(message = "Component adı zorunludur.")
    @Size(max = 120, message = "Component adı en fazla 120 karakter olabilir.")
    private String name;

    @NotBlank(message = "Slug alanı zorunludur.")
    @Size(max = 140, message = "Slug en fazla 140 karakter olabilir.")
    @Pattern(
            regexp = "^[a-z0-9]+(?:-[a-z0-9]+)*$",
            message = "Slug yalnızca küçük harf, rakam ve tire içermelidir.")
    private String slug;

    @NotBlank(message = "Açıklama alanı zorunludur.")
    private String description;

    @NotBlank(message = "Kategori alanı zorunludur.")
    @Size(max = 80, message = "Kategori en fazla 80 karakter olabilir.")
    private String category;

    @NotBlank(message = "Önizleme tipi zorunludur.")
    @Size(max = 100, message = "Önizleme tipi en fazla 100 karakter olabilir.")
    private String previewType;

    private String componentCode;

    private String styleCode;

    private String jsxCode;

    private String tsxCode;

    @NotBlank(message = "CSS kodu zorunludur.")
    private String cssCode;

    private String tailwindJsxCode;

    private String tailwindTsxCode;

    private String dependencies;

    private String responsiveNotes;

    private Boolean builtin;

    @AssertTrue(message = "JSX veya TSX kodlarından en az biri girilmelidir.")
    public boolean hasReactCode() {
        return hasText(jsxCode) || hasText(tsxCode);
    }

    @AssertTrue(message = "CSS kodu @media veya @container ile responsive breakpoint içermelidir.")
    public boolean hasResponsiveCss() {
        if (!hasText(cssCode)) {
            return false;
        }
        String normalizedCss = cssCode.toLowerCase();
        return normalizedCss.contains("@media") || normalizedCss.contains("@container");
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPreviewType() {
        return previewType;
    }

    public void setPreviewType(String previewType) {
        this.previewType = previewType;
    }

    public String getComponentCode() {
        return componentCode;
    }

    public void setComponentCode(String componentCode) {
        this.componentCode = componentCode;
    }

    public String getStyleCode() {
        return styleCode;
    }

    public void setStyleCode(String styleCode) {
        this.styleCode = styleCode;
    }

    public String getJsxCode() {
        return jsxCode;
    }

    public void setJsxCode(String jsxCode) {
        this.jsxCode = jsxCode;
    }

    public String getTsxCode() {
        return tsxCode;
    }

    public void setTsxCode(String tsxCode) {
        this.tsxCode = tsxCode;
    }

    public String getCssCode() {
        return cssCode;
    }

    public void setCssCode(String cssCode) {
        this.cssCode = cssCode;
    }

    public String getTailwindJsxCode() {
        return tailwindJsxCode;
    }

    public void setTailwindJsxCode(String tailwindJsxCode) {
        this.tailwindJsxCode = tailwindJsxCode;
    }

    public String getTailwindTsxCode() {
        return tailwindTsxCode;
    }

    public void setTailwindTsxCode(String tailwindTsxCode) {
        this.tailwindTsxCode = tailwindTsxCode;
    }

    public String getDependencies() {
        return dependencies;
    }

    public void setDependencies(String dependencies) {
        this.dependencies = dependencies;
    }

    public String getResponsiveNotes() {
        return responsiveNotes;
    }

    public void setResponsiveNotes(String responsiveNotes) {
        this.responsiveNotes = responsiveNotes;
    }

    public Boolean getBuiltin() {
        return builtin;
    }

    public void setBuiltin(Boolean builtin) {
        this.builtin = builtin;
    }
}
