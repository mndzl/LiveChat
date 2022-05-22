import './App.css';
import SignIn from './components/SignIn';
import Chat from './components/Chat';
import { useState } from 'react';
import { UserProvider } from './components/UserContext';

function App() {
  const [user, setUser ] = useState("");

  return (
      <UserProvider value={{user, setUser}}>
        {user ? <Chat /> : <SignIn setUser={setUser} />}
      </UserProvider>
  );
}

export default App;
