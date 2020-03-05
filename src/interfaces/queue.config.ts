interface IQueueAuth {
    host: string
    user: string
    password: string
}

export interface IQueueConfig {
    queueUrl: string;
    queueAuth: IQueueAuth;
    messagesToPull: number;
}
