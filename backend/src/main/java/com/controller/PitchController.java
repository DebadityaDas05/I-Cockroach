package com.controller;

import com.entity.Pitch;
import com.repository.PitchRepository;

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
