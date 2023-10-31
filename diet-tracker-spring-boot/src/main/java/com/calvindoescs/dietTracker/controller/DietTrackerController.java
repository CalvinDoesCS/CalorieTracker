package com.calvindoescs.dietTracker.controller;

import com.calvindoescs.dietTracker.entity.User;
import com.calvindoescs.dietTracker.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value="/api", produces = { "application/json" })
public class DietTrackerController {

}
