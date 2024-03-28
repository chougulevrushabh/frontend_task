import React, { useState } from "react";
import "../CSS/Data.css";
import Form from "../components/Form";
import { useNavigate,Link  } from "react-router-dom";

const Data = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Retrieve form data from sessionStorage
  const storedFormData = sessionStorage.getItem("formData");
  const formDataArray = storedFormData ? JSON.parse(storedFormData) : [];

  const handleFormSubmit = (formDataArray) => {
    // alert(JSON.stringify(formDataArray))
    console.log("Form submitted with data: ", formDataArray);
    setShowModal(false);
  };

  const handleEdit = (row, index) => {
    setSelectedRow({ ...row, index }); // Pass index along with the row
    setShowModal(true);
  };

  const handleToDelete = (index) => {
    const updatedFormDataArray = formDataArray.filter((_, i) => i !== index);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormDataArray));
    window.location.reload();
  };
 

  return (
    <div>
      {showModal === false ? (
      <div className="Table">
      <div className="back-button">
      <Link to="/">Back</Link>
    </div>
        
        <table className="data-table">
         
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Weekdays</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
  {formDataArray.length === 0 ? (
    <tr>
      <td colSpan="8">No data available</td>
    </tr>
  ) : (
    formDataArray.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.contactNumber}</td>
        <td>{item.gender}</td>
        <td>{item.dateOfBirth}</td>
        <td>
          {/* Iterate through weekdays array and render only checked days */}
          {item.weekdays.map(
            (dayObj, dayIndex) =>
              dayObj.checked && <span key={dayIndex}>{dayObj.day}, </span>
          )}
        </td>
        <td>
          <button className="edit-button" onClick={() => handleEdit(item, index)}>Edit</button>
          <button className="delete-button" onClick={() => handleToDelete(index)}>Delete</button>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
 </div>
      ) : (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit</h2>
            <Form formData={selectedRow} onFormSubmit={handleFormSubmit} />
          </div>
        </div>
      )}
     
     
    </div>
  );
};

export default Data;
