import "./App.css";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";
import Feed from "./Feed";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        <Sidebar />
        <Feed />
      </div>
    </div>
  );
}

export default App;
