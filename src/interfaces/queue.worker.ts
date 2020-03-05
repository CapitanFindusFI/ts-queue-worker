export interface QueueWorker {
    isEnabled(): boolean;

    run(): void;

    pullMessages(): void

    processMessage(message: any): void
}
