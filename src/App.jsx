import { useSelector } from 'react-redux'
import { AuthorizedRoutes, NotFoundPage, UnauthorizedRoutes } from './components';


function App() {
  const { isLogged } = useSelector(state => state.auth);
  if (isLogged) {
    return <AuthorizedRoutes />
  }
  return <UnauthorizedRoutes />
}

export default App;