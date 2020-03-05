import GenericWorker from "../../generic.worker";
import {IQueueConfig} from "../../../interfaces/queue.config";
import {ISQSConfig} from "./sqs.config";
import SQS = require("aws-sdk/clients/sqs");
import {ReceiveMessageRequest} from "aws-sdk/clients/sqs";

export class SqsWorker extends GenericWorker<SQS, ISQSConfig> {

    constructor(sqsConfig: IQueueConfig<ISQSConfig>) {
        super(sqsConfig);

        this.workerClient = new SQS({
            apiVersion: "2012-11-05",
            credentials: {
                accessKeyId: this.workerConfig.queueAuth.accessKeyId,
                secretAccessKey: this.workerConfig.queueAuth.accessKeySecret,
            }
        });
    }

    connect(): void {
        super.run();
    }

    pullMessages(): void {
        const receiveConfig: ReceiveMessageRequest = {
            MaxNumberOfMessages: this.workerConfig.messagesToPull,
            QueueUrl: this.workerConfig.queueUrl
        };

        this.workerClient.receiveMessage(receiveConfig, this.processMessage.bind(this));
    }

    processMessage(message: any): void {
        console.log(message);
    }

}
