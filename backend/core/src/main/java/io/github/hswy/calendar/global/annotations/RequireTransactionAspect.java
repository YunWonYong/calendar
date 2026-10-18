package io.github.hswy.calendar.global.annotations;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Aspect 
@Component 
public class RequireTransactionAspect {
    @Before("@annotation(io.github.hswy.calendar.global.annotations.RequireTransaction)")
    public void checkTransaction() {
        if (!TransactionSynchronizationManager.isActualTransactionActive()) {
            throw new IllegalStateException(
                "Repository write operation requires an active transaction."
            );
        }
    }
}
