package com.example.vmssystem.service;

import com.example.vmssystem.dto.LoginRequest;
import com.example.vmssystem.dto.LoginResponse;
import com.example.vmssystem.entity.User;
import com.example.vmssystem.repository.UserRepository;
import com.example.vmssystem.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email ou senha inválidos"));

        // Validar senha com BCrypt
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Email ou senha inválidos");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getName());

        return new LoginResponse(token, user.getEmail(), user.getName());
    }
}
