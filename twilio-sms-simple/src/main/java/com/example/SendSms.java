package com.example;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendSms {
    public static final String ACCOUNT_SID = "AC70f022ff52755e9c0e58a38584f191f0";
    public static final String AUTH_TOKEN = "bbb1848130ddd0dd15b7baf8af782a89";

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        Message message = Message.creator(
                new PhoneNumber("+917094873494"),
                new PhoneNumber("+18159184150"),
                "Hello"
        ).create();

        System.out.println("Message SID: " + message.getSid());
    }
}
