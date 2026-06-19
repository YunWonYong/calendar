package io.github.hswy.calendar.global.properties.frontend;


import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

@Tag("dev")
@ActiveProfiles("dev")
public class DevFrontendPropertiesTest extends FrontendPropertiesTest {

    @Override
    @Test
    protected void baseUrlTest() {
        super.baseUrlTest("http://localhost:3000");
    }

    @Override
    @Test
    protected void oauth2UrlsTest() {
        super.oauth2UrlsTest("http://localhost:3000/", "http://localhost:3000/login");
    }
}
