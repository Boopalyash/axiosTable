import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const Read = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://fts-backend.onrender.com/admin/testing/getUserById?id=${id}`
      )
      .then((res) => {
        setUser(res.data.response.user);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleConfirmBack = () => {
    setShowConfirmation(false);
    navigate("/");
  };

  const handleCancelBack = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-light shadow px-5 pt-3 pb-5 rounded">
        <h3>Details of Employee</h3>
        <div className="mb-2">
          <strong>Name: {user.name}</strong>
        </div>
        <div className="mb-2">
          <strong>Email: {user.email}</strong>
        </div>
        <div className="mb-3">
          <strong>Phone: {user.phone_number}</strong>
        </div>
        <button className="btn btn-success">
          <Link to={`/update/${id}`} className="text-white">
            Edit
          </Link>
        </button>
        <button
          className="btn btn-primary ms-3"
          onClick={() => setShowConfirmation(true)}
        >
          Back
        </button>
      </div>

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
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;   
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
      <Read />
    </div>
  );
}
