package io.github.hswy.calendar.plan.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.hswy.calendar.common.model.ApiResponseBody;
import io.github.hswy.calendar.plan.model.PlanListReponseBody;
import io.github.hswy.calendar.plan.service.PlanService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/plans")
@RequiredArgsConstructor 
public class PlanController {
    private final PlanService planService;

    @GetMapping 
    public ApiResponseBody<PlanListReponseBody> list() {
        return ApiResponseBody.success(planService.getPlanList());
    }
}
