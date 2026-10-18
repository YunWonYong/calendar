package io.github.hswy.calendar.plan;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

interface PlanRepository extends JpaRepository<PlanEntity, Long> {
    
    List<PlanEntity> findAllByOrderByPlanIdAsc();
}
