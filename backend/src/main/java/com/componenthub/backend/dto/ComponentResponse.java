package com.componenthub.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDateTime;

public class ComponentResponse {

    private Long id;
    private String name;
    private String title;
    private String slug;
    private String description;
    private String category;

    @JsonProperty("previewType")
    private String previewType;

    @JsonProperty("componentCode")
    private String componentCode;

    @JsonProperty("styleCode")
    private String styleCode;

    @JsonProperty("jsxCode")
    private String jsxCode;

    @JsonProperty("tsxCode")
    private String tsxCode;

    @JsonProperty("cssCode")
    private String cssCode;

    @JsonProperty("tailwindJsxCode")
    private String tailwindJsxCode;

    @JsonProperty("tailwindTsxCode")
    private String tailwindTsxCode;

    private String dependencies;

    @JsonProperty("responsiveNotes")
    private String responsiveNotes;

    private boolean builtin;

    @JsonProperty("createdAt")
    private LocalDateTime createdAt;

    @JsonProperty("updatedAt")
    private LocalDateTime updatedAt;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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

    @JsonProperty("isBuiltin")
    public boolean isBuiltin() {
        return builtin;
    }

    public void setBuiltin(boolean builtin) {
        this.builtin = builtin;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
