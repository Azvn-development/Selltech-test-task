export type InputProps<TData extends object> = {
    id: keyof TData;
    label: string;
    value: number | string;
    onChange: (field: keyof TData, value: string | number) => void;
    errors: string[]
}