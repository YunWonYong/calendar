package io.github.hswy.calendar.plan.model;

import java.util.List;

public record PlanListReponseBody(
    List<PlanItemDTO> plans
){}
