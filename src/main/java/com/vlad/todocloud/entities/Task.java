package com.vlad.todocloud.entities;


import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;

@Entity
@Table(name = "task")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;

    private boolean status;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private Instant dateCreated;
    private Integer priority;

    @LastModifiedDate
    @Column(nullable = false)
    private Instant dateModified;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public void setPriority(int priority) {
        this.priority = priority;
    }

    protected Task(String title, String description, int priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
    }

    protected Task() {
    }

    public Instant getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Instant dateCreated) {
        this.dateCreated = dateCreated;
    }

    public Instant getDateModified() {
        return dateModified;
    }

    public void setDateModified(Instant dateModified) {
        this.dateModified = dateModified;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getStatus() {
        return status;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setStatus(Boolean newStatus) {
        this.status = newStatus;
    }
}
