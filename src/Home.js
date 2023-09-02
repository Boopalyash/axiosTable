import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";
import readIcon from "./assets/images/eye.png";
import editIcon from "./assets/images/edit.png";
import deleteIcon from "./assets/images/delete.png";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        "https://fts-backend.onrender.com/admin/testing/getallusers?offset=2&limit=5"
      )
      .then((res) => setUsers(res.data.response.paginationOutput.items))
      .catch((err) => console.log(err));
  }, [currentPage]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee detail?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `https://fts-backend.onrender.com/admin/testing/deleteUserById?id=${id}`
        );

        if (response.data.response.status === "success") {
          const updatedUsers = users.filter((user) => user.id !== id);
          setUsers(updatedUsers);
          toast.success(response.data.response.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        toast.error("An error occurred while deleting the employee", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const renderUsers = users
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((user) => (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone_number}</td>
        <td>{user.message}</td>
        <td>{user.createdAt}</td>
        <td>{user.updatedAt}</td>
        <td>
          <Link to={`/read/${user.id}`} className="btn btn-sm me-2">
            <img src={readIcon} alt="Read" />
          </Link>
          <Link to={`/update/${user.id}`} className="btn btn-sm me-2">
            <img src={editIcon} alt="Edit" />
          </Link>
          <button onClick={() => handleDelete(user.id)} className="btn btn-sm">
            <img src={deleteIcon} alt="Delete" />
          </button>
        </td>
      </tr>
    ));

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100">
      <h1>List of Concert IDC Employee</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">
            Add
          </Link>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone_number</th>
              <th>Message</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderUsers}</tbody>
        </table>
        <div className="d-flex justify-content-end mt-3">
          <ReactPaginate
            pageCount={Math.ceil(users.length / itemsPerPage)}
            pageRangeDisplayed={5}
            // marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            disabledClassName="disabled"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
