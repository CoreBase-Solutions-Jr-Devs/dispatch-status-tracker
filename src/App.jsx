// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import StatusRoute from "./routes/StatusRoute";

function App() {
  return (
    <Router>
      <div className="w-full max-w-md mx-auto bg-white p-4 rounded-xl shadow-md min-h-[500px] flex flex-col">
        <header className="p-2 bg-white shadow-lg rounded-2xl mx-2">
          <h3 className=" font-medium">Tracking Details</h3>
        </header>

        <main className="flex-1 pt-2 px-2">
          <Routes>
            <Route path="/status-tracker" element={<StatusRoute />} />
          </Routes>
        </main>

        <footer className="mt-auto p-2 text-center text-xs text-muted-foreground">
          &copy; Dispatch Tracking {new Date().getFullYear()} CoreBase Solutions
          Limited
        </footer>
      </div>
    </Router>
  );
}

export default App;
