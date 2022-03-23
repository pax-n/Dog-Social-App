import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";
import Register from "./Register";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        {/* {!cookie-sessions && <Login />}
        {cookie-sessions && <Sidebar /> && <Feed />} */}
        {/* Uncomment above once cookies properly implemented
        Until then, manually comment and uncomment below */}
        {/* <Login /> */}
        <Register />
        {/* <Sidebar />
        <Feed /> */}
      </div>
    </div>
  );
}

export default App;
