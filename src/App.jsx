// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import StatusRoute from "./routes/StatusRoute";

function App() {
  return (
    <Router>
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white p-4 rounded-xl shadow-md">
        <header className="p-2 bg-white shadow-lg rounded-2xl mx-2">
          <h3 className=" font-medium">Tracking Details</h3>
        </header>

        <main className="pt-2 px-2">
          <Routes>
            <Route path="/" element={<Navigate to="/status-tracker" replace />} />
            <Route path="/status-tracker" element={<StatusRoute />} />
          </Routes>
        </main>

        <footer className="p-2 text-center text-xs text-muted-foreground">
          &copy; Dispatch Tracking {new Date().getFullYear()} CoreBase Solutions
          Limited
        </footer>
      </div>
    </Router>
  );
}

export default App;
