import os

base_dir = "backend/src/main/java/com/websitebuilder/backend"
dirs = ["config", "controller", "dto", "entity", "repository", "security", "service", "exception"]

for d in dirs:
    os.makedirs(os.path.join(base_dir, d), exist_ok=True)

# 1. Entities
user_java = """package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.List;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String email;
    private String password;
    private List<String> roles;
}
"""

project_java = """package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "projects")
public class Project {
    @Id
    private String id;
    private String userId;
    private String name;
    private String description;
}
"""

page_java = """package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "pages")
public class Page {
    @Id
    private String id;
    private String projectId;
    private String name;
    private Object components; // JSON structured pages
}
"""

pub_site_java = """package com.websitebuilder.backend.entity;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "published_sites")
public class PublishedSite {
    @Id
    private String id;
    private String projectId;
    private String url;
    private String htmlContent;
    private String cssContent;
}
"""

# Write entities
with open(os.path.join(base_dir, "entity/User.java"), "w") as f: f.write(user_java)
with open(os.path.join(base_dir, "entity/Project.java"), "w") as f: f.write(project_java)
with open(os.path.join(base_dir, "entity/Page.java"), "w") as f: f.write(page_java)
with open(os.path.join(base_dir, "entity/PublishedSite.java"), "w") as f: f.write(pub_site_java)

# 2. Repositories
user_repo = """package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
}
"""
project_repo = """package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByUserId(String userId);
}
"""
page_repo = """package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PageRepository extends MongoRepository<Page, String> {
    List<Page> findByProjectId(String projectId);
}
"""
pub_repo = """package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.PublishedSite;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PublishedSiteRepository extends MongoRepository<PublishedSite, String> {}
"""

with open(os.path.join(base_dir, "repository/UserRepository.java"), "w") as f: f.write(user_repo)
with open(os.path.join(base_dir, "repository/ProjectRepository.java"), "w") as f: f.write(project_repo)
with open(os.path.join(base_dir, "repository/PageRepository.java"), "w") as f: f.write(page_repo)
with open(os.path.join(base_dir, "repository/PublishedSiteRepository.java"), "w") as f: f.write(pub_repo)

# 3. Security (Bypass for now for speed, enable basic CORS)
sec_config = """package com.websitebuilder.backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

@Configuration
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.anyRequest().permitAll());
        return http.build();
    }
    
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
"""
with open(os.path.join(base_dir, "config/SecurityConfig.java"), "w") as f: f.write(sec_config)

# 4. Controllers
proj_controller = """package com.websitebuilder.backend.controller;
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
"""
page_controller = """package com.websitebuilder.backend.controller;
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
"""
with open(os.path.join(base_dir, "controller/ProjectController.java"), "w") as f: f.write(proj_controller)
with open(os.path.join(base_dir, "controller/PageController.java"), "w") as f: f.write(page_controller)

print("Backend generation complete.")
