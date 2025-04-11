import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const lenderTypes = ["Public Sector Bank", "Private Sector Bank", "Cooperative Bank", "NBFC"];
const statusOptions = ["Active", "Inactive"];

const fieldConfig = [
  { name: "lender_code", label: "Lender Code", required: true, type: "text", maxLength: 10 },
  { name: "lender_name", label: "Lender Name", required: true, type: "text", maxLength: 100 },
  { name: "lender_address_1", label: "Address Line 1", required: true, type: "text" },
  { name: "lender_address_2", label: "Address Line 2", required: false, type: "text" },
  { name: "lender_address_3", label: "Address Line 3", required: false, type: "text" },
  { name: "lender_contact_1", label: "Contact 1", required: true, type: "text" },
  { name: "lender_contact_2", label: "Contact 2", required: false, type: "text" },
  { name: "lender_contact_3", label: "Contact 3", required: false, type: "text" },
  { name: "lender_email_id_1", label: "Lender Email 1", required: true, type: "email" },
  { name: "lender_email_id_2", label: "Lender Email 2", required: false, type: "email" },
  { name: "lender_email_id_3", label: "Lender Email 3", required: false, type: "email" },
  { name: "lender_spoc_name", label: "SPOC Name", required: true, type: "text" },
  { name: "lender_spoc_contact", label: "SPOC Contact", required: true, type: "text" },
  { name: "lender_spoc_email", label: "SPOC Email", required: true, type: "email" },
  { name: "lender_escalation_name", label: "Escalation Name", required: true, type: "text" },
  { name: "lender_escalation_contact", label: "Escalation Contact", required: true, type: "text" },
  { name: "lender_escalation_email", label: "Escalation Email", required: true, type: "email" },
];

const LenderMaster = ({ isDropped }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [existingLenderCodes, setExistingLenderCodes] = useState(new Set());
  const [lenderCodeError, setLenderCodeError] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState(
    fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {
      lender_type: "",
      status: "",
      createdby: localStorage.getItem("token") || "", // ✅ Initialize but don't display
      updatedby: localStorage.getItem("token") || "",
    })
  );
  useEffect(() => {
    const fetchLenderCodes = async () => {
      try {
        const response = await fetch(`${API_URL}/sanction/lendercodes`);
        if (!response.ok) throw new Error("Failed to fetch lender codes");
        const responseData = await response.json();


        if (responseData && Array.isArray(responseData.data)) {
          setExistingLenderCodes(
            new Set(responseData.data.map(item => item.lender_code.trim().toLowerCase()))
          );
        } else {
          console.error("Unexpected API response format:", responseData);
        }
      } catch (error) {
        console.error("Error fetching lender codes:", error);
      }
    };

    fetchLenderCodes();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "lender_code") {
      const trimmedValue = value.trim().toLowerCase();

      if (existingLenderCodes.has(trimmedValue)) {
        setLenderCodeError("Lender Code already exists!");
      } else {
        setLenderCodeError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (let field of fieldConfig) {
      if (field.required && !formData[field.name]?.trim()) {
        setMessage(`Error: ${field.label} is required ⚠️`);
        return;
      }
    }
    if (!formData.lender_type) {
      setMessage("Error: Lender Type is required ⚠️");
      return;
    }
    if (!formData.status) {
      setMessage("Error: Status is required ...⚠️");
      return;
    }

    // console.log("Form Data:  ", formData);

    try {
      const response = await fetch(`${API_URL}/Lender/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // console.log("Response Data sent: ", data);
      if (!response.ok) {
        const errorData = await response.json();

        localStorage.setItem("submissionMessage", "Lender Sent to Approval failed!");
        localStorage.setItem("messageType", "error");

        console.error("Server responded with error:", errorData);
        throw new Error(`Server Error: ${response.status}`);
      }

      setMessage("Lender Sent to Approval ✅");
      // console.log("Response Data sent to api: ", response);

      localStorage.setItem("submissionMessage", "Lender Sent to Approval!");
      localStorage.setItem("messageType", "success");

      // Reset form data after successful submission
      setFormData(
        fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {
          lender_type: "",
          status: "",
        })
      );

      navigate("/DataCreation/LenderMaster"); // If you want to navigate, otherwise remove this line

    } catch (error) {
      setMessage("Error connecting to the server ⚠️");
      console.log("Error: connecting to the server ⚠️");
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        // width: "auto",
        margin: "auto",
        marginTop: "70px",
        marginLeft: isDropped ? "100px" : "280px",
        transition: "margin-left 0.3s ease",
        width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
        boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Typography
        sx={{
          color: "#0056b3",
          fontWeight: "600",
          fontSize: "20px",
          marginBottom: "20px",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "2px solid #0056b3",
          paddingBottom: "10px",
        }}
      >
        Lender Master
      </Typography>
      {message && (
        <Typography color="error" sx={{ textAlign: "center", fontWeight: "bold" }}>
          {message}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fieldConfig.map((field) => (
            <Grid key={field.name} item xs={12} sm={6}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                required={field.required}
                type={field.type}
                error={field.name === "lender_code" && !!lenderCodeError}
                helperText={field.name === "lender_code" ? lenderCodeError : ""}
                inputProps={{ maxLength: field.maxLength }}
              />
            </Grid>
          ))}



          {/* Lender Type Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel id="lender-type-label">Lender Type</InputLabel>
              <Select
                labelId="lender-type-label"
                name="lender_type"
                value={formData.lender_type || ""}
                onChange={handleSelectChange("lender_type")}
              >
                {lenderTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


          {/* Status Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={formData.status} onChange={handleSelectChange("status")}>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate("/DataCreation/LenderMaster")}
          >
            Back
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
          <Button
            variant="contained"
            color="error"
            type="button"
            onClick={() => setFormData(fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: "" }), { lender_type: "", status: "" }))}
          >
            Reset
          </Button>
        </Box>
      </form>

    </Box>
  );
};

export default LenderMaster;
