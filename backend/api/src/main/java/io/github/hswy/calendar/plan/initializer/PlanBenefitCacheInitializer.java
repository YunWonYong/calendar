package io.github.hswy.calendar.plan.initializer;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import io.github.hswy.calendar.plan.benefit.PlanBenefitProcessor;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor 
public class PlanBenefitCacheInitializer  implements ApplicationRunner {

    // private final PlanRepository planRepository;
    private final PlanBenefitProcessor planBenefitProcessor;

    @Override
    public void run(ApplicationArguments args) {
        // planRepository.findAllPlanIds()
        //     .forEach(planBenefitProcessor::getPlanBenefits);
    }
}
