package io.github.hswy.calendar.global.properties.frontend;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class OAuth2PathProperties {
    private String successPath;
    private String failurePath;
}
