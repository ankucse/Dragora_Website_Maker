package com.websitebuilder.backend.controller;
import com.websitebuilder.backend.entity.Page;
import com.websitebuilder.backend.repository.PageRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pages")
public class PageController {
    private final PageRepository repo;
    public PageController(PageRepository repo) { this.repo = repo; }
    
    @GetMapping("/project/{projectId}")
    public List<Page> getByProject(@PathVariable String projectId) { return repo.findByProjectId(projectId); }
    
    @PostMapping
    public Page save(@RequestBody Page p) { return repo.save(p); }
}
