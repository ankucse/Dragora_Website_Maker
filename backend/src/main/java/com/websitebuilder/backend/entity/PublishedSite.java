package com.websitebuilder.backend.entity;
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
