
export default class FinisingAction {
    protected isRunning: boolean = false;
    execute(): void {
        this.isRunning = true;
    }
    isExecuted(): boolean {
        return this.isRunning;
    }
    finish(): void {
        this.isRunning = false;
    }
}
