import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Update = () => {
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://fts-backend.onrender.com/admin/testing/getUserById?id=${id}`
      )
      .then((res) => {
        const user = res.data.response.user;
        setValues({
          name: user.name,
          email: user.email,
          phone: user.phone_number,
          message: user.message,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();

    axios
      .put(
        `https://fts-backend.onrender.com/admin/testing/editUserById?id=${id}`,
        {
          name: values.name,
          email: values.email,
          phone_number: values.phone,
          message: values.message,
        }
      )
      .then((res) => {
        console.log("Update response:", res);
        if (res.data.response.status === "success") {
          toast.success(res.data.response.message);
          navigate("/");
        } else {
          toast.error("Failed to update user details");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred while updating user details");
      });
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
      <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update Employee</h1>
        <form onSubmit={handleUpdate}>
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
            <label htmlFor="email">Email:</label>
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
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter Phone"
              value={values.phone}
              onChange={(e) => setValues({ ...values, phone: e.target.value })}
            />
          </div>
          <button className="btn btn-success">Update</button>
          <Link to="/" className="btn btn-primary ms-3">
            Back
          </Link>
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
    </div>
  );
};

export default Update;
