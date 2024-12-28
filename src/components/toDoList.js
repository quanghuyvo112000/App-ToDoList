// @ts-nocheck
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import DeleteTaskModal from "./deleteTaskModal"; // Import modal

function ToDoList() {
  const navigate = useNavigate(); // Use navigate hook
  const [todoList, setTodoList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const itemsPerPage = 10;

  // Lấy danh sách ToDo từ localStorage khi component mount
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("todoList") ?? "[]");
    if (storedList) {
      setTodoList(storedList);
    }
  }, []);

  // Xử lý checkbox thay đổi
  const handleCheckboxChange = (id) => {
    const updatedList = todoList.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            checked: !todo.checked,
            status: !todo.checked ? "Completed" : "In Progress",
          }
        : todo
    );
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
  };

  // Tính toán các mục hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = todoList.slice(indexOfFirstItem, indexOfLastItem);

  // Tạo nút phân trang
  const totalPages = Math.ceil(todoList.length / itemsPerPage);
  const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`btn ${
        currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
      } mx-1`}
    >
      {index + 1}
    </button>
  ));
  // Chuyển trang add task
  const turnPage = () => {
    navigate("/add-task");
  };

  // Xử lý mở modal và chọn task cần xóa
  const handleShowModal = (task) => {
    setTaskToDelete(task);
    setShowModal(true);
  };

  // Xử lý đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  // Xử lý xóa task
  const handleDeleteTask = () => {
    const updatedList = todoList.filter((todo) => todo.id !== taskToDelete.id);
    setTodoList(updatedList);
    localStorage.setItem("todoList", JSON.stringify(updatedList));
    handleCloseModal();
  };

  return (
    <div>
      <Helmet>
        <title>To Do List</title>
      </Helmet>
      <div className="container">
        <h3 className="text-center mt-5">ToDo List</h3>
        <div className="d-flex my-2 justify-content-end">
          <button type="button" className="btn btn-success" onClick={turnPage}>
            Add Task
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList.length === 0 ? (
              // Nếu todoList rỗng, hiển thị dòng "Chưa có task nào"
              <tr>
                <td colSpan="4" className="text-center fw-bolder">
                  No tasks available!
                </td>
              </tr>
            ) : (
              currentItems.map((todo, index) => (
                <tr key={todo.id}>
                  <th scope="row">{indexOfFirstItem + index + 1}</th>
                  <td
                    className="fw-bolder"
                    style={{
                      textDecoration: todo.checked ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                  </td>
                  <td>
                    <span
                      className="rounded-pill px-2"
                      style={{
                        backgroundColor: todo.checked ? "green" : "yellow",
                        color: "black",
                      }}
                    >
                      {todo.status}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex">
                      <input
                        type="checkbox"
                        checked={todo.checked || false}
                        disabled={todo.checked} // Disable checkbox nếu đã được checked
                        onChange={() => handleCheckboxChange(todo.id)}
                      />
                      <div>
                        <button
                          type="button"
                          className="btn btn-danger ms-3"
                          onClick={() => handleShowModal(todo)}
                        >
                          Delete Task
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-3">
          {paginationButtons}
        </div>
      </div>

      {/* Modal Delete */}
      <DeleteTaskModal
        show={showModal}
        handleClose={handleCloseModal}
        handleDelete={handleDeleteTask}
      />
    </div>
  );
}

export default ToDoList;
