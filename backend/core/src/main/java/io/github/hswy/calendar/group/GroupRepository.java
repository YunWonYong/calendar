package io.github.hswy.calendar.group;

import org.springframework.data.jpa.repository.JpaRepository;

interface GroupRepository extends JpaRepository<GroupEntity, Long> {
    long countByGroupLeaderIdAndGroupStatus(
        Long groupLeaderId,
        GroupStatus groupStatus
    );
}
