package com.controller;

import com.service.EmailService;
import com.util.OtpUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private EmailService emailService;

    private String savedOtp;
    private String savedEmail;

    @GetMapping("/send-otp")
    public String sendOtp(
            @RequestParam String email
    ) {

        try {

            String otp = OtpUtil.generateOtp();

            savedOtp = otp;

            savedEmail = email;


            emailService.sendOtpEmail(
                    email,
                    otp
            );

            return "OTP Sent Successfully";

        } catch (Exception e) {

            e.printStackTrace();

            return e.getMessage();
        }
    }
    @GetMapping("/verify-otp")
        public String verifyOtp(

                @RequestParam String email,

                @RequestParam String otp
        ){

            if(
                    email.equals(savedEmail)
                    &&
                    otp.equals(savedOtp)
            ){

                return "OTP VERIFIED";

            } else {

                return "INVALID OTP";
            }
        }
}
