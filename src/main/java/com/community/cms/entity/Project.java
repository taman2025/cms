package com.community.cms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    private String title;

    @ManyToOne
    @JoinColumn(name = "community_id")
    private Community community;

    private String status;
}