package io.github.hswy.calendar.global.annotations;

import org.springframework.stereotype.Component;

@Component 
public class RequireTransactionTestTarget {
    
    @RequireTransaction
    public void execute() {
    }
}
