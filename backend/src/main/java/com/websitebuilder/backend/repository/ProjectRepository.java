package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByUserId(String userId);
}
