package com.community.cms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "communities")
public class Community {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long communityId;

    private String name;
    private String description;
}