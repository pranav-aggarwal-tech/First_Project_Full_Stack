import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./assets/Header";
import Form from "./assets/Form";
import DBEntries from "./assets/DBentries";

function Home() {
  return (
    <div className="container">
      <Header />
      <Form />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/db-entries"
          element={<DBEntries />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;