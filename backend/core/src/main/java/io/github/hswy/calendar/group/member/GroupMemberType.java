package io.github.hswy.calendar.group.member;

public enum GroupMemberType {
    LEADER(0),
    SUB_LEADER(1),
    NORMAL(2);

    private final int orderNo;
    
    GroupMemberType(int orderNo) {
        this.orderNo = orderNo;
    }

    public int getOrderNo() {
        return this.orderNo * 1000;
    }
}
