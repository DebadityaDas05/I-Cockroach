package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		loadEnv();
		SpringApplication.run(BackendApplication.class, args);
	}

	private static void loadEnv() {
		try {
			java.nio.file.Path path = java.nio.file.Paths.get(".env");
			if (!java.nio.file.Files.exists(path)) {
				path = java.nio.file.Paths.get("../.env");
			}
			if (!java.nio.file.Files.exists(path)) {
				path = java.nio.file.Paths.get("backend/.env");
			}
			if (java.nio.file.Files.exists(path)) {
				java.util.List<String> lines = java.nio.file.Files.readAllLines(path);
				for (String line : lines) {
					line = line.trim();
					if (line.isEmpty() || line.startsWith("#")) {
						continue;
					}
					int equalIdx = line.indexOf('=');
					if (equalIdx > 0) {
						String key = line.substring(0, equalIdx).trim();
						String value = line.substring(equalIdx + 1).trim();
						if (value.startsWith("\"") && value.endsWith("\"")) {
							value = value.substring(1, value.length() - 1);
						} else if (value.startsWith("'") && value.endsWith("'")) {
							value = value.substring(1, value.length() - 1);
						}
						System.setProperty(key, value);
					}
				}
			}
		} catch (java.io.IOException e) {
			System.err.println("Failed to load .env file: " + e.getMessage());
		}
	}

}
