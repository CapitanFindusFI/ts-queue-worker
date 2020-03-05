import GenericWorker from "../generic.worker";
import {IQueueConfig} from "../interfaces/queue.config";

export class SqsWorker extends GenericWorker {
    private SQSClient: any;

    constructor(sqsConfig: IQueueConfig) {
        super(sqsConfig);
    }

    connect(): void {
        super.run();
    }

    pullMessages(): void {
    }

    processMessage(message: any): void {
    }

}
