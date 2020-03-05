import GenericWorker from "../../generic.worker";
import {IQueueConfig} from "../../../interfaces/queue.config";
import {IRabbitMQConfig} from "./rabbit.config";
import * as Ampq from 'amqp-ts'

export class RabbitWorker extends GenericWorker<Ampq.Connection, IRabbitMQConfig, Ampq.Message> {
    private amqpQueue!: Ampq.Queue;

    constructor(rabbitConfig: IQueueConfig<IRabbitMQConfig>) {
        super(rabbitConfig);

        this.workerClient = new Ampq.Connection(
            this.getConnectionUrl()
        );
    }

    private getConnectionUrl(): string {
        const {queueAuth} = this.workerConfig;
        return [
            queueAuth.connection.protocol,
            queueAuth.connection.user,
            ':',
            queueAuth.connection.password,
            '@',
            queueAuth.connection.host
        ].join('');
    }

    connect(): void {
        const {queueAuth} = this.workerConfig;
        if (queueAuth.queueName) {
            this.amqpQueue = this.workerClient.declareQueue(queueAuth.queueName)
        }

        if (this.amqpQueue) {
            super.run();
        }
    }

    pullMessages(): void {
        this.amqpQueue.activateConsumer(this.processMessage.bind(this)).then((consumer: any) => {
            console.log(consumer)
        })
    }

    processMessage(message: Ampq.Message): void {
        console.log(message);
    }

}
