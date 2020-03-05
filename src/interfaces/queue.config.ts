export interface IQueueConfig<T> {
    queueUrl: string;
    queueAuth: T;
    messagesToPull: number;
}
