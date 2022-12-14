import './App.css';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {

    signInWithPopup(auth, provider)
      .then(result => {
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch(error => {
        console.error('error:', error);
      })
  }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(error => {
        setUser({});
        console.error(error);
      })
  }

  return (
    <div className="App">
      {
        user.email ?
          <button onClick={handleSignOut}>Sign Out</button>
          :
          <button onClick={handleGoogleSignIn}>Google Sign In</button>
      }
      {user.email && <div>
        <h3>User Name: {user.displayName}</h3>
        <p>Email Address: {user.email}</p>
        <img src={user.photoURL} alt="" />
      </div>}
    </div>
  );
}

export default App;
