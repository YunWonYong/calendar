package io.github.hswy.calendar.plan.benefit;

import java.util.regex.Pattern;

import io.github.hswy.calendar.plan.benefit.exception.PlanBenefitValueEmptyException;
import io.github.hswy.calendar.plan.benefit.exception.PlanBenefitValueInvalidException;
import io.github.hswy.calendar.plan.benefit.exception.PlanBenefitValueTypeMismatchException;

enum PlanBenefitValueTypes {
    INTEGER(
        Integer.class,
        value -> {
            if (value == null || !value.matches("-?\\d+")) {
                throw new PlanBenefitValueInvalidException(
                    value, 
                    Integer.class.getTypeName()
                );
            }
            try {
                return Integer.valueOf(value);
            } catch (NumberFormatException e) {
                throw new PlanBenefitValueInvalidException(
                    value, 
                    Integer.class.getTypeName(), 
                    e
                );
            }
        }
    ), 
    DECIMAL(
        Double.class,
        value -> {
            if (value == null || !Pattern.matches("-?\\d+(\\.\\d+)?", value)) {
                throw new PlanBenefitValueInvalidException(
                    value,
                    Double.class.getTypeName()
                );
            }

            double parsed;

            try {
                parsed = Double.parseDouble(value);
            } catch (NumberFormatException e) {
                throw new PlanBenefitValueInvalidException(
                    value,
                    Double.class.getTypeName(),
                    e
                );
            }

            if (!Double.isFinite(parsed)) {
                throw new PlanBenefitValueInvalidException(
                    value,
                    Double.class.getTypeName()
                );
            }

            return parsed;
        }
    ), 
    BOOLEAN(
        Boolean.class,
        value -> {
            if (value == null || value.isBlank()) {
                throw new PlanBenefitValueEmptyException(Boolean.class.getTypeName());
            }

            if (!(value.equalsIgnoreCase("true") || value.equalsIgnoreCase("false"))) {
                throw new PlanBenefitValueInvalidException(value, Boolean.class.getTypeName());
            }
            return Boolean.parseBoolean(value);
        }
    ),
    STRING(
        String.class,
        value -> {
            if (value == null || value.isBlank()) {
                throw new PlanBenefitValueEmptyException(String.class.getTypeName());
            }
            return value;
        }
    );

    private final Class<?> valueType;
    private final PlanBenefitValueParser<?> parser;

    PlanBenefitValueTypes(Class<?> valueType, PlanBenefitValueParser<?> parser) {
        this.valueType = valueType;
        this.parser = parser;
    }

    public Class<?> getValueTypeClass() {
        return this.valueType;
    }

    public <T> T parse(String value, Class<T> targetType) {
        if (!this.valueType.equals(targetType)) {
            throw new PlanBenefitValueTypeMismatchException(
                value,
                this.valueType.getTypeName(),
                targetType.getTypeName()
            );
        }
        return targetType.cast(this.parser.parse(value));
    }
}
