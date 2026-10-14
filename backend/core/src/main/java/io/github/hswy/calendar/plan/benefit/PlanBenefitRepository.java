package io.github.hswy.calendar.plan.benefit;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

interface PlanBenefitRepository extends JpaRepository<PlanBenefitEntity, PlanBenefitPK>{
    @Query(
"""
SELECT  A
  FROM  PlanBenefitEntity A
 WHERE  A.pk.planId = :planId
   AND  A.pk.versionNo = (
            SELECT  MAX(B.pk.versionNo)
              FROM  PlanBenefitEntity B
             WHERE  A.pk.planId = B.pk.planId
               AND  A.pk.benefitName = B.pk.benefitName
        )
"""
    )
    List<PlanBenefitEntity> getLastVersionPlanBenefits(
        @Param("planId") Long planId
    );
}
