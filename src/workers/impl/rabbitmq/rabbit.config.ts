export interface IRabbitMQConfig {
    connection: {
        protocol: string;
        host: string;
        user: string;
        password: string;
    }
    exchangeName: string;
    queueName: string;
}
