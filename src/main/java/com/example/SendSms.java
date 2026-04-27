package com.example;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendSms {
    public static void main(String[] args) {
        String accountSid = System.getenv("TWILIO_ACCOUNT_SID");
        String authToken = System.getenv("TWILIO_AUTH_TOKEN");

        if (accountSid == null || authToken == null) {
            throw new IllegalStateException("Set TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN before running.");
        }

        Twilio.init(accountSid, authToken);

        Message message = Message.creator(
                new PhoneNumber("+917094873494"),
                new PhoneNumber("+18159184150"),
                "Peace Bro"
        ).create();

        System.out.println("Message SID: " + message.getSid());
    }
}
