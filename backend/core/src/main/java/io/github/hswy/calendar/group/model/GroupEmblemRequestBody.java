package io.github.hswy.calendar.group.model;

import io.github.hswy.calendar.group.GroupEmblemType;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter 
@NoArgsConstructor 
@ToString
public class GroupEmblemRequestBody {

    @NotNull 
    private GroupEmblemType type;

    private String id;
}
