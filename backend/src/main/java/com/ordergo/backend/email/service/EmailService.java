package com.ordergo.backend.email.service;

public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);

}
