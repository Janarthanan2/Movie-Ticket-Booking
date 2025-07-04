package com.example.bookyourshow;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class BookyourshowApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookyourshowApplication.class, args);
	}

}
