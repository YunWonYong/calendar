package io.github.hswy.calendar.global.annotations;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@EnableAspectJAutoProxy 
@ExtendWith (SpringExtension.class)
@ContextConfiguration(classes = {
    RequireTransactionAspect.class,
    RequireTransactionTestTarget.class
})
public class RequireTransactionAspectTest {
    @Autowired
    private RequireTransactionTestTarget target;

    @Test 
    void testNoTransactionAnnotation() {
        assertThrows(
            IllegalStateException.class,
            () -> target.execute()
        );
    }

    
    @Test 
    void testTransactionAnnotation() {
        TransactionSynchronizationManager.setActualTransactionActive(true);

        try {
            assertDoesNotThrow(
                () -> target.execute()
            );
        } finally {
            TransactionSynchronizationManager.setActualTransactionActive(false);
        }
    }
}
