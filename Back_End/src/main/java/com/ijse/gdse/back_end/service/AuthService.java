package com.ijse.gdse.back_end.service;

import com.ijse.gdse.back_end.dto.AuthDTO;
import com.ijse.gdse.back_end.dto.AuthResponseDTO;
import com.ijse.gdse.back_end.dto.RegisterDTO;
import com.ijse.gdse.back_end.entity.Role;
import com.ijse.gdse.back_end.entity.User;
import com.ijse.gdse.back_end.repository.UserRepository;
import com.ijse.gdse.back_end.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

   public AuthResponseDTO authenticate(AuthDTO authDTO) {

    //validate creadentials
    User user =  userRepository.findByUsername(authDTO.getUsername())
                   .orElseThrow(() -> new RuntimeException("Username not found"));

    //check password
    if (!passwordEncoder.matches(
               authDTO.getPassword(),
               user.getPassword())){
           throw new BadCredentialsException("Invalid Credentials");
       }

       //genarate token
       String token = jwtUtil.generateToken(authDTO.username);
       return new AuthResponseDTO(token);

   }

   public String register(RegisterDTO registerDTO) {
       if (userRepository.findByUsername(registerDTO.getUsername())
               .isPresent()) {
           throw new RuntimeException("Username already exists");
       }

       User user = User.builder()
               .username(registerDTO.getUsername())
               .password(passwordEncoder.encode(registerDTO.getPassword()))
               .role(Role.valueOf(registerDTO.getRole()))
               .build();
       userRepository.save(user);
       return "User registerd successfully";
   }
}
