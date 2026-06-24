package com.service;

import okhttp3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class AIverificationService {

        @Value("${groq.api.key}")
        private String API_KEY;

    public boolean verifyInstitute(String instituteName)
            throws Exception {

        OkHttpClient client = new OkHttpClient();

        String prompt = """
                Check if this is a real educational institute.

                Institute:
                """ + instituteName + """

                Return only:
                true
                or
                false
                """;

        // Message JSON
        JSONObject message = new JSONObject();

        message.put("role", "user");
        message.put("content", prompt);

        // Request body JSON
        JSONObject body = new JSONObject();

        body.put("model", "llama-3.1-8b-instant");

        body.put(
                "messages",
                new org.json.JSONArray().put(message)
        );

        // HTTP request
        Request request = new Request.Builder()
                .url(
                  "https://api.groq.com/openai/v1/chat/completions"
                )
                .post(
                  RequestBody.create(
                    body.toString(),
                    MediaType.parse("application/json")
                  )
                )
                .addHeader(
                  "Authorization",
                  "Bearer " + API_KEY
                )
                .addHeader(
                  "Content-Type",
                  "application/json"
                )
                .build();

        // Execute request
        Response response =
                client.newCall(request).execute();

        String responseBody =
                response.body().string();

        // Print full API response
        System.out.println(
                "===== API RESPONSE ====="
        );

        System.out.println(responseBody);

        // Convert to JSON
        JSONObject json =
                new JSONObject(responseBody);

        // Error handling
        if (json.has("error")) {

            System.out.println(
                    "===== API ERROR ====="
            );

            System.out.println(
                    json.getJSONObject("error")
            );

            return false;
        }

        // Extract AI result
        String result = json
                .getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content")
                .trim();

        System.out.println(
                "===== AI RESULT ====="
        );

        System.out.println(result);

        // Return boolean
        return result.equalsIgnoreCase("true");
    }
}
