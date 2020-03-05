export interface QueueWorker<T> {
    isEnabled(): boolean;

    run(): void;

    pullMessages(): void

    processMessage(message: T): void
}
