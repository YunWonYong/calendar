package io.github.hswy.calendar.plan.service;

import java.util.List;

import org.springframework.stereotype.Service;

import io.github.hswy.calendar.plan.PlanDTO;
import io.github.hswy.calendar.plan.PlanProcessor;
import io.github.hswy.calendar.plan.benefit.PlanBenefitProcessor;
import io.github.hswy.calendar.plan.model.PlanItemDTO;
import io.github.hswy.calendar.plan.model.PlanListReponseBody;
import lombok.RequiredArgsConstructor;

@Service 
@RequiredArgsConstructor 
public class PlanService {
    private final PlanProcessor planProcessor;
    private final PlanBenefitProcessor planBenefitProcessor;

    public PlanListReponseBody getPlanItems() {
        List<PlanDTO> dtos = planProcessor.getPlanDatas();
        List<PlanItemDTO> items = dtos
            .stream()
            .map(dto -> {
                return new PlanItemDTO(
                    dto.id(),
                    dto.type(),
                    dto.price(),
                    planBenefitProcessor.getPlanBenefits(dto.id())
                );
            })
            .toList();
        return new PlanListReponseBody(items);
    }
}
