package io.github.hswy.calendar.group.controller;

import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.github.hswy.calendar.auth.model.AuthUser;
import io.github.hswy.calendar.common.model.ApiResponseBody;
import io.github.hswy.calendar.global.file.storage.FileStorage;
import io.github.hswy.calendar.global.file.storage.FileTargetType;
import io.github.hswy.calendar.group.GroupEmblemType;
import io.github.hswy.calendar.group.exception.GroupNotFoundCustomEmblemFileException;
import io.github.hswy.calendar.group.model.GroupBasicRequestBody;
import io.github.hswy.calendar.group.model.GroupCreateResponseBody;
import io.github.hswy.calendar.group.model.GroupCreationAvailabilityDTO;
import io.github.hswy.calendar.group.model.GroupEmblemRequestBody;
import io.github.hswy.calendar.group.service.GroupService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController 
@RequestMapping("/groups")
@RequiredArgsConstructor 
public class GroupController {

    private final GroupService groupService;
    private final FileStorage fileStorage;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponseBody<GroupCreateResponseBody> createGroup(
        @Valid @RequestPart("basic") GroupBasicRequestBody basic,
        @Valid @RequestPart("emblem") GroupEmblemRequestBody emblem,
        @RequestPart(value = "emblemFile", required = false) MultipartFile emblemFile,
        @AuthenticationPrincipal AuthUser authUser
    ) {

        if (GroupEmblemType.CUSTOM.equals(emblem.getType())) {
            if (emblemFile == null) {
                throw new GroupNotFoundCustomEmblemFileException();
            }

            String emblemId = fileStorage.upload(FileTargetType.GROUP_EMBLEM, emblemFile);
            emblem.changeEmblemId(emblemId);
        }

        try {
            GroupCreateResponseBody responseBody = groupService.createGroup(authUser.userId(), basic, emblem);
            return ApiResponseBody.success(responseBody);
        } catch(Exception e) {
            if (GroupEmblemType.CUSTOM.equals(emblem.getType())) {
                fileStorage.delete(
                    FileTargetType.GROUP_EMBLEM,
                    emblem.getId()
                );
            }
            throw e;
        }
    }


    @GetMapping("/creation-availability")
    public ApiResponseBody<GroupCreationAvailabilityDTO> getGroupCreationAvailability(@AuthenticationPrincipal AuthUser authUser) {
        return ApiResponseBody.success(
            groupService.getGroupCreationAvailability(
                authUser.userId()
            )
        );
    }
}