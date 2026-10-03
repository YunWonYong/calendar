package io.github.hswy.calendar.global.utils;

public interface HistoryEntityFieldMapper<T, R> {
    R of(T entity);
}
