export type TaskType = {
    type: 'test' | 'composition' | 'custom',
    description: string;
    rightAnswer: string | number | null;
}