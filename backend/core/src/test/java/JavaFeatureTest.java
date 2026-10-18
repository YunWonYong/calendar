import static org.assertj.core.api.Assertions.assertThatExceptionOfType;
import static org.assertj.core.api.Assertions.assertThatNoException;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.IllegalFormatConversionException;

import org.junit.jupiter.api.Test;

public class JavaFeatureTest {
    
    @Test
    void testStringFormat() {
        Long a = null;
        String b = null;
        assertEquals("null", String.valueOf(a));
        assertEquals("null", String.format("%s", a));
        assertThatNoException() 
        .isThrownBy(() -> { String.format("%d", a); });
        assertEquals("null", String.format("%d", a));
            
        assertEquals("null", String.valueOf(b));
        assertEquals("null", String.format("%s", b));
        assertEquals("null", String.format("%d", b));

        assertThatExceptionOfType(IllegalFormatConversionException.class) 
            .isThrownBy(() -> { String.format("%d", "123"); });
    }
}
