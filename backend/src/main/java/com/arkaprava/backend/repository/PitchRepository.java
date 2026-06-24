package com.arkaprava.backend.repository;

import com.arkaprava.backend.entity.Pitch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PitchRepository
extends JpaRepository<Pitch, Long> {

}