import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Container,
} from "@mui/material";

export default function Form(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    dateOfBirth: "",
    weekdays: [
      { day: "Monday", checked: false },
      { day: "Tuesday", checked: false },
      { day: "Wednesday", checked: false },
      { day: "Thursday", checked: false },
      { day: "Friday", checked: false },
    ],
    gender: "Male",
  });

  useEffect(() => {
    if (props.formData) {
      setFormData(props.formData);
      // sessionStorage.setItem('formData', JSON.stringify(props.formData));
    } else {
      const storedFormData = sessionStorage.getItem("formData");
      if (!storedFormData) {
        // Set form data to initial state if there is no previous form data
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          dateOfBirth: "",
          weekdays: [
            { day: "Monday", checked: false },
            { day: "Tuesday", checked: false },
            { day: "Wednesday", checked: false },
            { day: "Thursday", checked: false },
            { day: "Friday", checked: false },
          ],
          gender: "Male",
        });
      } else {
        const previousFormData = JSON.parse(storedFormData);
        if (previousFormData && Array.isArray(previousFormData.weekdays)) {
          setFormData(previousFormData);
        } else {
          console.error("Stored form data is invalid:", previousFormData);
        }
      }
    }
  }, [props.formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedWeekdays = formData.weekdays.map((weekday) =>
        weekday.day === name ? { ...weekday, checked } : weekday
      );
      setFormData({
        ...formData,
        weekdays: updatedWeekdays,
      });
    } else if (type === "radio") {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { index, ...formDataWithoutIndex } = formData; // Extract index from formData
    const storedFormData = sessionStorage.getItem("formData");
    let previousFormDataArray = storedFormData
      ? JSON.parse(storedFormData)
      : [];

    if (!Array.isArray(previousFormDataArray)) {
      console.error("Stored form data is not an array:", previousFormDataArray);
      previousFormDataArray = [];
    }

    if (index !== undefined && index !== null) {
      previousFormDataArray[index] = formDataWithoutIndex;
      sessionStorage.setItem("formData", JSON.stringify(previousFormDataArray));
    } else {
      const updatedFormDataArray = [
        ...previousFormDataArray,
        formDataWithoutIndex,
      ];
      sessionStorage.setItem("formData", JSON.stringify(updatedFormDataArray));
    }

    if (props.onFormSubmit) {
      props.onFormSubmit(previousFormDataArray);
    }

    setFormData({
      name: "",
      email: "",
      contactNumber: "",
      dateOfBirth: "",
      weekdays: [
        { day: "Monday", checked: false },
        { day: "Tuesday", checked: false },
        { day: "Wednesday", checked: false },
        { day: "Thursday", checked: false },
        { day: "Friday", checked: false },
      ],
      gender: "Male",
    });

    navigate("/Data");
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData && formData.name}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={formData && formData.email}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <TextField
          label="Contact Number"
          variant="outlined"
          fullWidth
          margin="normal"
          type="tel"
          name="contactNumber"
          // value={formData.contactNumber}
          value={formData && formData.contactNumber}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Weekdays:</FormLabel>
          <FormGroup>
            {formData !== undefined &&
              formData.weekdays.map(({ day, checked }) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      name={day}
                      checked={checked}
                      onChange={handleChange}
                    />
                  }
                  label={day}
                />
              ))}
          </FormGroup>
        </FormControl>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Gender:</FormLabel>
          <RadioGroup
            name="gender"
            value={formData.gender}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel
              value="Female"
              control={<Radio />}
              label="Female"
            />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Date of Birth"
          variant="outlined"
          fullWidth
          margin="normal"
          type="date"
          name="dateOfBirth"
          // value={formData.dateOfBirth}
          value={formData && formData.dateOfBirth}
          onChange={(e) => {
            handleChange(e);
          }}
          required
          InputLabelProps={{ shrink: true }}
          inputProps={{ max: new Date().toISOString().split("T")[0] }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
