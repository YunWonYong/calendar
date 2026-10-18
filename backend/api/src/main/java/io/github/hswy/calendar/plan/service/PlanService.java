package io.github.hswy.calendar.plan.service;


import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.plan.PlanDTO;
import io.github.hswy.calendar.plan.PlanMetadataDTO;
import io.github.hswy.calendar.plan.PlanProcessor;
import io.github.hswy.calendar.plan.benefit.PlanBenefitProcessor;
import io.github.hswy.calendar.plan.model.PlanItemDTO;
import io.github.hswy.calendar.plan.model.PlanListReponseBody;
import io.github.hswy.calendar.plan.model.PlanItemMetadataDTO;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class PlanService {
    private final PlanProcessor planProcessor;
    private final PlanBenefitProcessor planBenefitProcessor;

    public PlanListReponseBody getPlanList() {
        List<PlanMetadataDTO> planMetadata = planProcessor.getPlanMetadata();
        Map<String, PlanItemDTO> plans = planMetadata
            .stream()
            .collect(
                Collectors.toUnmodifiableMap(
                    metadata -> metadata.planType(),
                    metadata -> {
                        Long planId = metadata.planId();
                        PlanDTO planDTO = planProcessor.getPlanDTO(planId);
                        return new PlanItemDTO(
                            planDTO.id(),
                            planDTO.price(),
                            planBenefitProcessor.getPlanBenefitDTOs(planId)
                        );
                    }
                )
            );
        return new PlanListReponseBody(
            new PlanItemMetadataDTO(
                planMetadata,
                planBenefitProcessor.getPlanBenefitMetadata()
            ),
            plans
        );
    }
}
