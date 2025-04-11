import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box, Grid, Typography, TextField, CircularProgress, Paper,
  Button, Select, MenuItem, FormControl, InputLabel
} from "@mui/material";
import axios from "axios";

const fieldConfig = [
  { name: "lender_code", label: "Lender Code" },
  { name: "lender_name", label: "Lender Name" },
  { name: "lender_type", label: "Lender Type", type: "select", options: ["Public Sector Bank", "Private Sector Bank", "Cooperative Bank", "NBFC"] },
  { name: "lender_address_1", label: "Address Line 1" },
  { name: "lender_address_2", label: "Address Line 2" },
  { name: "lender_address_3", label: "Address Line 3" },
  { name: "lender_contact_1", label: "Contact 1" },
  { name: "lender_contact_2", label: "Contact 2" },
  { name: "lender_contact_3", label: "Contact 3" },
  { name: "lender_email_id_1", label: "Lender Email 1" },
  { name: "lender_email_id_2", label: "Lender Email 2" },
  { name: "lender_email_id_3", label: "Lender Email 3" },
  { name: "lender_spoc_name", label: "SPOC Name" },
  { name: "lender_spoc_contact", label: "SPOC Contact" },
  { name: "lender_spoc_email", label: "SPOC Email" },
  { name: "lender_escalation_name", label: "Escalation Name" },
  { name: "lender_escalation_contact", label: "Escalation Contact" },
  { name: "lender_escalation_email", label: "Escalation Email" },
  { name: "remarks", label: "Remarks" },
  { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] }
];

const LenderDetailsMaker = ({ isDropped }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const location = useLocation();
  const { lender_code, approval_status, lender_name, updatedat } = location.state || {};
  const navigate = useNavigate();
  const [lender, setLender] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchLenderDetails = async () => {
      try {
        // console.log("maker: ", lender_code, approval_status, lender_name, updatedat)
        const response = await axios.get(`${API_URL}/lender/details`, {
          params: { lender_code, approval_status, lender_name, updatedat }
        });
        // console.log("details: ", response)

        if (response.status === 200) {
          setLender(response.data.lender);
        } else {
          console.log("No lender found in the response.");
        }
      } catch (error) {
        console.error("Error fetching lender details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLenderDetails();
  }, [API_URL, lender_code, approval_status, lender_name, updatedat]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      const createdby = localStorage.getItem("token");
      const updatedby = localStorage.getItem("token");

      const lenderData = {
        ...lender,
        // id: null,
        createdby,
        updatedby,
      };
      // console.log("response sending: ", lenderData)

      const response = await fetch(`${API_URL}/lender/update/${lender.lender_code}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lenderData),
      });
      // console.log("response : ",response)

      if (response.ok) {
        if (response.status === 201) {
          alert("Lender updated Sent to Approval!");
        } else {
          alert("Lender updated Sent to Approval Failed!");
        }
      } else {
        const errorResponse = await response.json();
        alert(errorResponse.message);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating lender details:", error);
      alert("Failed to update lender details");
    }
  };

  const handleBack = () => {
    navigate("/DataCreation/LenderMaster");
  };

  const handleChange = (e) => {
    setLender({ ...lender, [e.target.name]: e.target.value });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        margin: "auto",
        marginTop: "70px",
        marginLeft: isDropped ? "100px" : "280px",
        transition: "margin-left 0.3s ease-in-out",
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
        Lender Details
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : lender ? (
        <Paper elevation={0} sx={{ padding: 3 }}>
          <Grid container spacing={2}>
            {fieldConfig.map((field) => (
              <Grid key={field.name} item xs={12} sm={6}>
                {field.type === "select" ? (
                  <FormControl fullWidth>
                    <InputLabel>{field.label}</InputLabel>
                    <Select
                      name={field.name}
                      value={lender[field.name] || ""}
                      onChange={handleChange}
                      disabled={!isEditing || field.name === "lender_code"}
                      // sx={{
                      //   backgroundColor: !isEditing || field.name === "lender_code" ? "#ebeced" : "#ebeced",
                      // }}
                      sx={{
                        cursor: "default",
                        backgroundColor: lender.updated_fields?.includes(field.name) ? "#fcec03" : "#ebeced",
                        "& .MuiInputBase-root": {
                          // pointerEvents: "none"
                        }
                      }}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={field.label}
                    name={field.name}
                    value={lender[field.name] || ""}
                    fullWidth
                    onChange={handleChange}
                    InputProps={{
                      readOnly: field.name === "lender_code" || !isEditing,
                      style: field.name === "lender_code"
                        ? { pointerEvents: "none", cursor: "not-allowed", backgroundColor: "#ebeced" }
                        : {},
                    }}
                    sx={{
                      cursor: "default",
                      backgroundColor: lender.updated_fields?.includes(field.name) ? "#fcec03" : "#ebeced",
                      "& .MuiInputBase-root": {
                        // pointerEvents: "none"
                      }
                    }}
                  />
                )}
              </Grid>
            ))}
          </Grid>
          <Box mt={3} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained" color="warning" onClick={handleBack}>
              Back
            </Button>
            {isEditing ? (
              <Button variant="contained" color="primary" onClick={handleUpdate}>
                Update
              </Button>
            ) : (
              <Button variant="contained" color="error" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </Box>
        </Paper>
      ) : (
        <Typography sx={{ textAlign: "center", marginTop: 2 }}>Lender details not found</Typography>
      )}
    </Box>
  );
};

export default LenderDetailsMaker;
