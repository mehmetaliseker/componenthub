package com.componenthub.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "ui_components")
public class UiComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, unique = true, length = 140)
    private String slug;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, length = 80)
    private String category;

    @Column(name = "preview_type", nullable = false, length = 100)
    private String previewType;

    @Column(name = "component_code", nullable = false, columnDefinition = "TEXT")
    private String componentCode;

    @Column(name = "style_code", columnDefinition = "TEXT")
    private String styleCode;

    @Column(name = "jsx_code", columnDefinition = "TEXT")
    private String jsxCode;

    @Column(name = "tsx_code", columnDefinition = "TEXT")
    private String tsxCode;

    @Column(name = "css_code", columnDefinition = "TEXT")
    private String cssCode;

    @Column(name = "tailwind_jsx_code", columnDefinition = "TEXT")
    private String tailwindJsxCode;

    @Column(name = "tailwind_tsx_code", columnDefinition = "TEXT")
    private String tailwindTsxCode;

    @Column(columnDefinition = "TEXT")
    private String dependencies;

    @Column(name = "responsive_notes", columnDefinition = "TEXT")
    private String responsiveNotes;

    @Column(name = "is_builtin", nullable = false)
    private boolean builtin;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
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

    @PreUpdate
    public void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
