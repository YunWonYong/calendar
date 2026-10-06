package io.github.hswy.calendar.global.utils;

import java.util.HashMap;
import java.util.Map;

public interface MapCaster {
    static Map<String, Object> castToMap(Object obj) {
        if (!(obj instanceof Map<?, ?> map)) {
            return null;
        }
        
        Map<String, Object> result = new HashMap<String, Object>();
        
        for (Map.Entry<?, ?> entry : map.entrySet()) {
            result.put(String.valueOf(entry.getKey()), entry.getValue());
        }
        return result;
    }
}
