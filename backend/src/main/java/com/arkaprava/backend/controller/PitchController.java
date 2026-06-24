package com.arkaprava.backend.controller;

import com.arkaprava.backend.entity.Pitch;
import com.arkaprava.backend.repository.PitchRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pitch")
@CrossOrigin(
    origins =
    "http://localhost:5173"
)
public class PitchController {

    @Autowired
    private PitchRepository 
            pitchRepository;

    @PostMapping("/create")
    public Pitch createPitch(
            @RequestBody Pitch pitch
    ) {

        return pitchRepository.save(
                pitch
        );
    }
}
