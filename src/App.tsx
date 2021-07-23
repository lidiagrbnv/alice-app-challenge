import React, { createContext, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { UserFrom } from './components/userForm'
import { Portfolio } from './components/portfolio'

export const AppContext = createContext(null as any)

const App = () => {
  const [ context, setContext ] = useState(null)
  const value = { context, setContext }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <AppContext.Provider value={value}>
          {
            !context ? <UserFrom /> : <Portfolio />
          }
        </AppContext.Provider>
      </Container>
    </React.Fragment>
  );
}

export default App;
