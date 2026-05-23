package com.websitebuilder.backend.controller;
import com.websitebuilder.backend.entity.Project;
import com.websitebuilder.backend.repository.ProjectRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectRepository repo;
    public ProjectController(ProjectRepository repo) { this.repo = repo; }
    
    @GetMapping
    public List<Project> getAll() { return repo.findAll(); }
    
    @PostMapping
    public Project create(@RequestBody Project p) { return repo.save(p); }
}
