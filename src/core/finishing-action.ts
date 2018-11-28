
export default interface FinisingAction {
    execute(): void;
    isExecuted(): boolean;
    finish(): void;
}
