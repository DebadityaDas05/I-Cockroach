package com.service;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class OcrService {

    @Autowired
    private AIverificationService aiVerificationService;

    public boolean extractText(MultipartFile file)
            throws Exception {

        // Convert uploaded file to temp file
        File convFile =
                File.createTempFile("temp", ".png");

        file.transferTo(convFile);

        // OCR setup
        ITesseract tesseract = new Tesseract();

        // Tessdata path
        tesseract.setDatapath(
                "src/main/resources/tessdata"
        );

        // Language
        tesseract.setLanguage("eng");

        // Better OCR settings
        tesseract.setPageSegMode(6);
        tesseract.setOcrEngineMode(1);

        // OCR extraction
        String text =
                tesseract.doOCR(convFile);

        // Print OCR text
        System.out.println(
                "===== OCR TEXT ====="
        );

        System.out.println(text);

        // Extract institute name
        String institute =
                text.split("\\n")[0];

        System.out.println(
                "Institute Found: "
                + institute
        );

        // AI verification
        boolean verified =
                aiVerificationService
                        .verifyInstitute(institute);

        System.out.println(
                "Verified: "
                + verified
        );

        // Delete temp file
        convFile.delete();

        return verified;
    }
}
