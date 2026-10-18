package io.github.hswy.calendar.global.model;

public interface HistoryEntityFormInterface<T, R> {
    R form(T entity);
}
