package io.github.hswy.calendar.plan.benefit;

public record PlanBenefitData (
    Integer maxCreatedGroups,
    Integer maxSubLeaders,
    Integer maxJoinedGroups,
    Integer maxOwnedGroupMembers,
    Integer maxAlarmGroups,
    Boolean enablePersonalAlarms,
    Boolean enableGroupAlarms
) {};
