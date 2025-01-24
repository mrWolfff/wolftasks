package com.wolf.wolftasks.amqp;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TaskAMQPConfiguration {
    @Bean
    public Queue createQueue(){
        return new Queue("payment.success", false);
        //return QueueBuilder.nonDurable("payment.success").build();
    }
    @Bean
    public RabbitAdmin createRabbitAdmin(ConnectionFactory connection){
        return new RabbitAdmin(connection);
    }
    @Bean
    public ApplicationListener<ApplicationReadyEvent> startAdmin(RabbitAdmin admin){
        return;
    }
}
