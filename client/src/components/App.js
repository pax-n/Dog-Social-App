import "./App.css";
import { useContext } from 'react';
import { userContext } from './providers/UserProvider';
import { toggleContext } from './providers/ToggleProvider';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import Register from "./Register";

function App() {
  const { loggedin } = useContext(userContext);
  const { toggleRegister } = useContext(toggleContext);

  return (
    <div className="App">
      <Header />
      <div className="body">
        {!loggedin && toggleRegister && <Register />}
        {!loggedin && !toggleRegister && <Login />}
        {loggedin && <Sidebar /> && <Feed />}
        {/* Uncomment above once cookies properly implemented
        Until then, manually comment and uncomment below */}
        {/* <Login /> */}
        {/* <Register /> */}
        {/* <Sidebar />
        <Feed /> */}
      </div>
    </div>
  );
}

export default App;
