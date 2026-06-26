package io.github.hswy.calendar.global.properties.frontend;


import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

@Tag("local")
@ActiveProfiles("local")
public class LocalFrontendPropertiesTest extends FrontendPropertiesTest {

    @Override
    @Test
    protected void baseUrlTest() {
        super.baseUrlTest("http://localhost:3001");
    }

    @Override
    @Test
    protected void oauth2UrlsTest() {
        super.oauth2UrlsTest("http://localhost:3001/", "http://localhost:3001/login");
    }
    
    @Override
    @Test
    protected void accessTokenTest() {
        super.accessTokenTest(false);
    }
}
