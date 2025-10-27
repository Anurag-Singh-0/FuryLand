import Navbar from "./components/Navbar.jsx";
import Sidebar from "./components/Sidebar.jsx";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex w-full">
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
