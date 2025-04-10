package com.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.ldap.authentication.ad.ActiveDirectoryLdapAuthenticationProvider;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LdapUserService {

    @Autowired
    private ActiveDirectoryLdapAuthenticationProvider authenticationProvider;

    public UserDetails authenticate(String username, String password) {
        Authentication authentication = authenticationProvider.authenticate(
                new UsernamePasswordAuthenticationToken(username, password)
        );

        if (authentication.isAuthenticated()) {
            org.springframework.security.core.userdetails.User userDetails =
                    (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

            // 🔹 Récupérer les groupes AD en tant que rôles
            List<GrantedAuthority> roles = authentication.getAuthorities().stream()
                    .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                    .collect(Collectors.toList());

            return User.withUsername(userDetails.getUsername())
                    .password(userDetails.getPassword())
                    .authorities(roles)  // Associer les rôles AD à l'utilisateur
                    .build();
        } else {
            throw new RuntimeException("❌ Authentication failed!");
        }
    }
}

