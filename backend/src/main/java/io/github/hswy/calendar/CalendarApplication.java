package io.github.hswy.calendar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "io.github.hswy.calendar")
public class CalendarApplication {
	public static void main(String[] args) {
		SpringApplication.run(CalendarApplication.class, args);
	}
}
