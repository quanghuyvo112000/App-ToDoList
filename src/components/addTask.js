import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toastify

function AddTask() {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra độ dài của title
    if (title.length > 25) {
      setErrorMessage("Title must be less than 25 characters.");
    } else {
      setErrorMessage("");

      const newTask = {
        id: Date.now(), // Sử dụng timestamp làm id để đảm bảo duy nhất
        title: title.trim(),
        status: "In Progress",
        checked: false,
      };

      // Lấy danh sách todoList hiện tại từ localStorage
      const storedList = JSON.parse(localStorage.getItem("todoList") ?? "[]");

      // Thêm task mới vào đầu danh sách
      const updatedList = [newTask, ...storedList];

      // Cập nhật lại todoList vào localStorage
      localStorage.setItem("todoList", JSON.stringify(updatedList));

      toast.success("Task added successfully!");

      // Điều hướng về trang danh sách công việc
      navigate("/");
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Task</title>
      </Helmet>

      <div>
        <h3 className="text-center my-2">Add Task</h3>
        <div className="container w-50">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputTitle" className="form-label">
                Title
                <span className="text-danger">*</span>
              </label>
              {errorMessage && (
                <div className="text-danger mt-2">{errorMessage}</div>
              )}
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
