package io.github.hswy.calendar.user.plan;

import org.springframework.data.jpa.repository.JpaRepository;

interface UserPlanRepository extends JpaRepository<UserPlanEntity, Long> {
    
}
