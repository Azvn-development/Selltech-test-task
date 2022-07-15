import { TokenName } from '@/data/enums/TokenName';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: API_HOST,
});
  
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(TokenName.Authorization);

    return {
        headers: {
          ...headers,
          Authorization: token ? `Bearer ${token}` : '',
        }
    }
}) // setContext

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});