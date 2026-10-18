package io.github.hswy.calendar.plan.model;

import java.util.Map;

public record PlanListReponseBody(
    PlanItemMetadataDTO metadata,
    Map<String, PlanItemDTO> plans
){}
