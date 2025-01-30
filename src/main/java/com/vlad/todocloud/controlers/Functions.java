package com.vlad.todocloud.controlers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Functions {
    @GetMapping("/")
    public String home() {
        return "redirect:/index.html";
    }
}