package io.github.hswy.calendar.plan.model;

import java.util.List;

import io.github.hswy.calendar.plan.PlanMetadataDTO;
import io.github.hswy.calendar.plan.benefit.PlanBenefitMetadataDTO;

public record PlanItemMetadataDTO(
    List<PlanMetadataDTO> plans,
    List<PlanBenefitMetadataDTO> benefits
){}
