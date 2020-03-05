import GenericWorker from "../generic.worker";
import {IQueueConfig} from "../interfaces/queue.config";

export class RabbitWorker extends GenericWorker {
    private rabbitMQClient: any;

    constructor(rabbitConfig: IQueueConfig) {
        super(rabbitConfig);
    }

    connect(): void {
        super.run();
    }

    pullMessages(): void {
    }

    processMessage(message: any): void {
    }

}
