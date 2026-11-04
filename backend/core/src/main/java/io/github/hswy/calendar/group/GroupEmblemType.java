package io.github.hswy.calendar.group;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum GroupEmblemType {
    NORMAL("normal"),
    CUSTOM("custom");

    private final String emblemType;
    GroupEmblemType(String emblemType) {
        this.emblemType = emblemType;
    }

    
    @JsonCreator
    public static GroupEmblemType fromPlanId(String emblemType) {
        for (GroupEmblemType value: values()) {
            if (value.emblemType.equals(emblemType)) {
                return value;
            }
        }

        throw new IllegalArgumentException("Unsupported emblemType : " + emblemType);
    }
    @JsonValue
    public String getPlanId() {
        return this.emblemType;
    }
}
