package com.vlad.todocloud.controlers;

import com.vlad.todocloud.entities.Task;
import com.vlad.todocloud.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = {"http://localhost:63342", "http://34.27.237.197"})
@RestController
@RequestMapping("/api")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @PostMapping("add")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        task.setDateCreated(Instant.now());
        task.setDateModified(Instant.now());
        taskRepository.save(task);
        return ResponseEntity.ok(task);
    }

    @GetMapping("/task/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);

        if (task.isPresent()) {
            return ResponseEntity.ok(task.get()); // Return the task as JSON
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }
    }

    @GetMapping("/task")
    public ResponseEntity<List<Task>> getAllTasks() {
        List<Task> list = new ArrayList<>();
        taskRepository.findAll().forEach(list::add);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<HttpStatus> deleteTask(@PathVariable Long id) {
        if(id < 1){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bitte eine gültige ID eingeben");
        } else if(taskRepository.findById(id).isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task mit der ID " + id + " nicht gefunden");
        }

        taskRepository.deleteById(id);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("/task/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable Long id, @RequestBody Task updatedTask) {
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isPresent()) {
            Task existingTask = taskOptional.get();


            if (updatedTask.getTitle() != null) existingTask.setTitle(updatedTask.getTitle());
            if (updatedTask.getDescription() != null) existingTask.setDescription(updatedTask.getDescription());
            if (updatedTask.getPriority() != null) existingTask.setPriority(updatedTask.getPriority());
            existingTask.setDateModified(Instant.now());

            Task savedTask = taskRepository.save(existingTask);
            return ResponseEntity.ok(savedTask);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }
    }

    @PatchMapping("/task/{id}/status")
    public ResponseEntity<Task> updateTaskStatus(@PathVariable Long id, @RequestBody Boolean newStatus) {
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isPresent()) {
            Task existingTask = taskOptional.get();
            existingTask.setStatus(newStatus);
            existingTask.setDateModified(Instant.now());

            Task savedTask = taskRepository.save(existingTask);  // Save task after status change
            return ResponseEntity.ok(savedTask);  // Return updated task
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
        }
    }



}
