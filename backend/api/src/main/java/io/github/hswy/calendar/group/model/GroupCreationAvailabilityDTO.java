package io.github.hswy.calendar.group.model;

public record GroupCreationAvailabilityDTO(
    Long userActiveGroupCount,
    Integer maxCreateGroups,
    boolean available
) {}
