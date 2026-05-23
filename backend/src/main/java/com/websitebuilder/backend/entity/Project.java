package com.websitebuilder.backend.entity;
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
