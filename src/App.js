import Router from './Router/Router';
import { AuthProvider } from './useAuth';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
