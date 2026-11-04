package io.github.hswy.calendar.group.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.github.hswy.calendar.group.model.GroupBasicRequestBody;
import io.github.hswy.calendar.group.model.GroupEmblemRequestBody;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/groups")
@RequiredArgsConstructor 
public class GroupController {

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String createGroup(
        @Valid @RequestPart("basic") GroupBasicRequestBody basic,
        @Valid @RequestPart("emblem") GroupEmblemRequestBody emblem,
        @RequestPart(value = "emblemFile", required = false) MultipartFile emblemFile
    ) {
        System.out.println(basic);
        System.out.println(emblem);
        System.out.println(emblemFile);
        return "";
    }
}