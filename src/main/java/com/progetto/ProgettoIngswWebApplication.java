package com.progetto;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class ProgettoIngswWebApplication{

	public static void main(String[] args) {
		SpringApplication.run(ProgettoIngswWebApplication.class, args);
	}

}
