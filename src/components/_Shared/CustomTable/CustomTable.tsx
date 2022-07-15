import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { ColumnType } from '@/data/types/ColumnType';

type Props<TData extends object> = {
    rowKey: keyof TData;
    columns: ColumnType<TData>[];
    rows: TData[];
}

const CustomTable = <TData extends object>({ rowKey, columns, rows }:Props<TData>):React.ReactElement => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((column, idx) => (
                        <TableCell key={idx}>{column.name}</TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <TableBody>
                {rows.map((row: TData) => (
                    <TableRow key={row[rowKey] as unknown as string | number}>
                        {columns.map((column, idx) => {
                            const value = row[column.key] as unknown as string | number;

                            return (
                                <TableCell key={idx}>{value ?? ''}</TableCell>
                            )
                        })}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default CustomTable;