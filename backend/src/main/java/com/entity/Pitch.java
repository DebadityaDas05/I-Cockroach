package com.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "pitch")
public class Pitch {

    @Id
    @GeneratedValue(
        strategy =
        GenerationType.IDENTITY
    )
    private Long id;

    @Column(name = "pitch_text",
            columnDefinition = "TEXT")
    private String pitchText;

    @Column(name = "project_title")
    private String projectTitle;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPitchText() {
        return pitchText;
    }

    public void setPitchText(
            String pitchText
    ) {
        this.pitchText = pitchText;
    }

    public String getProjectTitle() {
        return projectTitle;
    }

    public void setProjectTitle(
            String projectTitle
    ) {
        this.projectTitle =
                projectTitle;
    }
}
