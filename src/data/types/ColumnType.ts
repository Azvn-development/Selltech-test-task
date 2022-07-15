export type ColumnType<TData> = {
    key: keyof TData;
    name: string;
}