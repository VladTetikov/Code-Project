package com.vlad.todocloud.controlers;

import com.vlad.todocloud.entities.Task;
import com.vlad.todocloud.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin
@RestController
@RequestMapping("/Tasks")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @PostMapping("add")
    public ResponseEntity<Task> createTask(@RequestBody Task task) {
        taskRepository.save(task);
        return ResponseEntity.ok(task);
    }
    @GetMapping("/task/{id}")
    public String getTask(@PathVariable Long id) {
        Optional<Task> task = taskRepository.findById(id);
        return task.map(Task -> Task.getTitle() + " " + Task.getDescription() + " " + Task.getPriority()
        + " " + Task.getStatus()). orElse(null);
    }

    @GetMapping("/all")
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

}
