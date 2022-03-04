import logo from './logo.svg';
import './App.css';
import { Route, Routes, Router } from "react-router-dom";
import Landing from "./components/Landing"
import Expense from "./components/Expense"
import Category from "./components/Category"


import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  const ReactRoutes = () => {
    return (
      <div>
        <Routes>
          <Route
            exact
            path="/"
            element={<Landing />}
          />
          <Route
                exact
                path="/addexpenses"
                element={<Expense />}
            />
  
            <Route
                exact
                path="/addcategories"
                element={<Category />}
            />
        </Routes>
      </div>
    )
  }
  return (
    <ReactRoutes />
  );
}

export default App;
