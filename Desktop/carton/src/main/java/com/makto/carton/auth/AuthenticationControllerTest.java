package com.makto.carton.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.makto.carton.auth.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthenticationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        // Perform any setup if needed
    }

    @Test
    void register_ValidRequest_ReturnsOkResponse() throws Exception {
        // Arrange
        RegisterRequest request = new RegisterRequest();
        request.setFirstname("John");
        request.setLastname("Doe");
        request.setEmail("tdd3@makto.com");
        request.setPassword("Hello@123!");
        request.setRolee("admin");
        // Set up the request object with the desired values

        // Act
        MvcResult result = mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
// Assert
        AuthenticationResponse response = objectMapper.readValue(result.getResponse().getContentAsString(), AuthenticationResponse.class);
// Perform assertions on the response object
        assertNull(response.getError());


    }
    @Test
    void auth_ValidRequest_ReturnsOkResponse() throws Exception {
        // Arrange
        AuthenticationRequest request = new AuthenticationRequest();

        request.setEmail("tdd3@makto.com");
        request.setPassword("Hello@123!");
        // Set up the request object with the desired values

        // Act
        MvcResult result = mockMvc.perform(post("/api/v1/auth/authenticate")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn();

        // Assert
// Assert
        AuthenticationResponse response = objectMapper.readValue(result.getResponse().getContentAsString(), AuthenticationResponse.class);
// Perform assertions on the response object
        assertNull(response.getError());


    }
//    @Test
//    void register_InvalidRequest_ReturnsBadRequestResponse() throws Exception {
//        // Arrange
//        RegisterRequest request = new RegisterRequest();
//        request.setPassword(null); // Set password to null intentionally
//
//        // Act
//        MvcResult result = mockMvc.perform(post("/api/v1/auth/register")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(objectMapper.writeValueAsString(request)))
//                .andExpect(status().isBadRequest())
//                .andReturn();
//
//        // Assert
//        // Perform assertions on the response object or message
//        String errorMessage = result.getResponse().getContentAsString();
//        assertEquals("Invalid password", errorMessage);
//    }

    // Add more test cases as needed for different scenarios

}
