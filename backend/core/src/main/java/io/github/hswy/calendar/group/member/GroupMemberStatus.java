package io.github.hswy.calendar.group.member;

public enum GroupMemberStatus {
    PENDING(2),		    // 그룹 장의 승인을 기다리는 상태.
    INVITED(3),		    // 그룹에 초대됐으나 수락하지 않은 상태.
    JOINED(0),		    // 정상적으로 활동 중인 멤버.
    KICKED(5),		    // 그룹에서 강제 추방된 상태.
    BANNED(6),		    // 그룹에서 영구 추방된 상태.
    READ_ONLY(1),		// 읽기만 가능한 멤버. 
    LEFT(4);			// 그룹에서 자발적으로 떠남.   
    
    private final int orderNo;
    
    GroupMemberStatus(int orderNo) {
        this.orderNo = orderNo;
    }

    public int getOrderNo() {
        return this.orderNo;
    }
}
