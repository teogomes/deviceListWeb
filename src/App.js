import Router from './Router/Router';
import { AuthProvider } from './useAuth';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

function App() {
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : null,
      },
    };
  });
  const httpLink = new HttpLink({ uri: 'http://localhost:4000' });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
  });

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
