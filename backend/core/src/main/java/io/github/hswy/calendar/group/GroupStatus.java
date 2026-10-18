package io.github.hswy.calendar.group;

public enum GroupStatus {
    ACTIVE,			    // 활성화
    INACTIVE,			// 비활성화
    PAST_DUE,			// 결제 지연으로 인한 비활성화
    PENDING_DELETE,	    // 삭제 예정
    DELETED,			// 삭제
    CHANGED_DATA,       // history 테이블에만 저장되는 status고 group의 데이터가 수정될 때 사용됨.
    CHANGED_LEADER_ID   // history 테이블에만 저장되는 status고 group의 leader를 수정할 때 사용됨.
}
