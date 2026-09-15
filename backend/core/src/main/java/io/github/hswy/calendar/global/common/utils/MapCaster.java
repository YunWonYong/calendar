package io.github.hswy.calendar.global.common.utils;

import java.util.Map;

public interface MapCaster {
    @SuppressWarnings("unchecked")
    default Map<String, Object> castToMap(Object obj) throws Exception {
        if (obj instanceof Map) {
            return (Map<String, Object>) obj;
        }
        throw new Exception("Map Casting Failed.");
    }
}
