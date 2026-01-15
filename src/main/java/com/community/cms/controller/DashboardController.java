package com.community.cms.controller;

import com.community.cms.entity.Community;
import com.community.cms.entity.Project;
import com.community.cms.entity.User;
import com.community.cms.repository.CommunityRepository;
import com.community.cms.repository.ProjectRepository;
import com.community.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allows all ports (5173, 5174, etc.)
public class DashboardController {

    @Autowired
    private CommunityRepository communityRepo;

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private UserRepository userRepo;

    // --- GET DATA ---
    @GetMapping("/communities")
    public List<Community> getAllCommunities() {
        return communityRepo.findAll();
    }

    @GetMapping("/projects")
    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    @GetMapping("/developers")
    public List<User> getAllDevelopers() {
        return userRepo.findAll();
    }
    // --- Get Single Community by ID ---
    @GetMapping("/communities/{id}")
    public Community getCommunity(@PathVariable Long id) {
        return communityRepo.findById(id).orElse(null);
    }

    // --- SAVE DATA (NEW) ---
    @PostMapping("/projects")
    public Project createProject(@RequestBody Project project) {
        return projectRepo.save(project);
    }

    @PostMapping("/communities")
    public Community createCommunity(@RequestBody Community community) {
        return communityRepo.save(community);
    }

    @PostMapping("/developers")
    public User createDeveloper(@RequestBody User user) {
        return userRepo.save(user);
    }
}