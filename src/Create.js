import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone_number: "",
    message: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://fts-backend.onrender.com/user/newRegistration",
        values
      );

      if (response.data.response.status === "success") {
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
      } else {
        toast.error("An error occurred while registering.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error registering:", error);
      toast.error("An error occurred while registering.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleConfirmBack = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const handleCancelBack = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add Employee</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter Name"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="name">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Enter Email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={values.phone_number}
              onChange={(e) =>
                setValues({ ...values, phone_number: e.target.value })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name">Message:</label>
            <input
              type="text"
              name="message"
              className="form-control"
              placeholder="Enter Message"
              value={values.message}
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }
            />
          </div>
          <button className="btn btn-success">Submit</button>
          <button
            className="btn btn-primary ms-3"
            onClick={() => setShowConfirmation(true)}
          >
            Back
          </button>
          <Link
            className="btn btn-dark ms-3"
            onClick={() => {
              toast.error("Cancelled", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }}
          >
            Cancel
          </Link>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
      {showConfirmation && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <p>Do you want to exit?</p>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleCancelBack}>
                Cancel
              </button>
              <button className="confirm-button" onClick={handleConfirmBack}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = `
  .custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center; 
    z-index: 1000;  
  }
  .custom-modal {
    background-color: white;
    border-radius: 5px;
    padding: 20px;  
  }
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .cancel-button,
  .confirm-button {
    padding: 5px 15px;
    border: none;
    cursor: pointer;
    border-radius: 10px;  
  }
  .cancel-button {
    background-color: #ddd;
  }
  .confirm-button {
    background-color: #007bff;
    color: white;
  }
`;

export default function App() {
  return (
    <div>
      <style>{styles}</style>
      <Create />
    </div>
  );
}
