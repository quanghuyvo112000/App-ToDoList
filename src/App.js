// @ts-nocheck
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ToDoList from "./components/toDoList";
import AddTask from "./components/addTask";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        {/* Đặt ToastContainer ở một vị trí chung để hiển thị thông báo */}
        <Routes>
          <Route path="/" element={<ToDoList />} />
          <Route path="/add-task" element={<AddTask />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
