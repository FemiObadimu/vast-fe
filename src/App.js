import "./App.css";
import BlogState from "./components/context/Blog/BlogState";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import View from "./components/pages/View";
import Create from "./components/pages/Create";
import SnackbarProvider from "react-simple-snackbar";
function App() {
  return (
    <SnackbarProvider>
      <BlogState>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/create" element={<Create />} />
            <Route exact path="/view/:id" element={<View />} />
          </Routes>
        </div>
      </BlogState>
    </SnackbarProvider>
  );
}

export default App;
