package com.componenthub.backend;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class BackendApplicationTests {

    @Test
    void applicationClassLoads() {
        assertNotNull(BackendApplication.class);
    }
}
