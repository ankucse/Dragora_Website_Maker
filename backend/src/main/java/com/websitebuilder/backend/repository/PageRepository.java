package com.websitebuilder.backend.repository;
import com.websitebuilder.backend.entity.Page;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface PageRepository extends MongoRepository<Page, String> {
    List<Page> findByProjectId(String projectId);
}
