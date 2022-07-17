import { ApolloError, OperationVariables, QueryResult } from '@apollo/client';

export type ActionType<TData> = {
    execFunction: (value?: string | undefined) => Promise<QueryResult<TData, OperationVariables>>;
    queryInfo: {
        data: TData[],
        loading: boolean; 
        error: ApolloError | undefined;
    };
}