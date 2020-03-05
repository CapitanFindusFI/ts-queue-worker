import {QueueWorker} from "../interfaces/queue.worker";
import {IQueueConfig} from "../interfaces/queue.config";

export default abstract class GenericWorker<T, K> implements QueueWorker {
    protected workerConfig: IQueueConfig<K>;
    protected workerClient!: T;

    protected constructor(workerConfig: IQueueConfig<K>) {
        this.workerConfig = workerConfig;
        this.connect();
    }

    isEnabled(): boolean {
        // maybe read something from PROCESS instead
        return true
    }

    run(): void {
        while (this.isEnabled()) {
            try {
                this.pullMessages()
            } catch (e) {
                console.error(e)
            }
        }
    }

    abstract connect(): void;

    abstract pullMessages(): void;

    abstract processMessage(message: any): void;

}
