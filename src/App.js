import { useState } from "react";
import EventForm from "./components/EventForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<EventForm setIsAuth={setIsAuth} isAuth={isAuth} />}
          />
        </Routes>
      </Router>
    </>
  );
}
