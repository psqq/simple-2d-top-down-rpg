
export default interface DataAction<T> {
    execute(data: T): void;
}
