import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMemo } from 'react';


const leapYear = ["Yes", "No"];
const interestTypes = ["Fixed", "Floating"];
const repaymentTerms = ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "Bullet"];
const interestDays = ["360", "365", "366"];

const TrancheDetails = ({ isDropped }) => {
  const navigate = useNavigate();
  const [lenderCodes, setLenderCodes] = useState([]);
  const [sanctionData, setSanctionData] = useState([]);
  const [trancheData, setTrancheData] = useState([]);
  // const [totalTrancheAmount, setTotalTrancheAmount] = useState(0);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const API_URL = process.env.REACT_APP_API_URL;


  const fieldConfig = useMemo(() => [
    { name: "lender_code", label: "Lender Code/Lender Name", required: true, type: "dropdown", options: lenderCodes },
    {
      name: "sanction_id", label: "Sanction ID", required: true, type: "dropdown",
      options: sanctionData.filter(s => s.lender_code === formData.lender_code)
    },
    { name: "tranche_id", label: "Tranche ID", required: true, type: "text", maxLength: 10 },
    { name: "tranche_date", label: "Tranche Date", required: true, type: "date" },
    { name: "tranche_number", label: "Tranche Number", required: true, type: "number" },
    { name: "tranche_amount", label: "Tranche Amount", required: true, type: "number" },
    { name: "interest_type", label: "Interest Type", required: true, type: "dropdown", options: interestTypes },
    { name: "interest_rate", label: "Interest Rate", required: true, type: "number" },
    { name: "tenure_months", label: "Tenure (Months)", required: true, type: "number" },
    { name: "principal_start_date", label: "Principal Start Date", required: true, type: "date" },
    { name: "interest_start_date", label: "Interest Start Date", required: true, type: "date" },
    { name: "principal_payment_frequency", label: "Principal Payment Frequency", required: true, type: "dropdown", options: repaymentTerms },
    { name: "interest_payment_frequency", label: "Interest Payment Frequency", required: true, type: "dropdown", options: repaymentTerms },
    { name: "applicable_of_leap_year", label: "Applicable Of Leap Year", required: true, type: "dropdown", options: leapYear },
    { name: "interest_calculation_days", label: "Interest Calculation Days", required: true, type: "dropdown", options: interestDays },
    { name: "current_ac_no", label: "Current A/C No", required: true, type: "text" },
    { name: "conf_acc_no", label: "Confirm A/C No", required: true, type: "text" },
    { name: "bank_name", label: "Name of the Bank", required: true, type: "text" },
    { name: "bank_branch", label: "Bank Branch", required: true, type: "text" },
    { name: "location", label: "Location", required: true, type: "text" },
    { name: "ifsc_code", label: "IFSC Code", required: true, type: "text" },
  ], [formData.lender_code, lenderCodes, sanctionData]);

  useEffect(() => {
    const initialFormData = {};
    fieldConfig.forEach((field) => {
      initialFormData[field.name] = "";
    });
    setFormData(initialFormData);
  }, [fieldConfig]);

  useEffect(() => {
    const fetchLenders = async () => {
      try {
        const response = await axios.get(`${API_URL}/sanction/lendercodes`);
        if (response.data?.data) {
          setLenderCodes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching lenders:", error);
      }
    };

    const fetchSanctions = async () => {
      try {
        const response = await axios.get(`${API_URL}/roc/sanctionid`);
        if (response.data?.data && Array.isArray(response.data.data)) {
          setSanctionData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching sanction IDs:", error);
      }
    };

    const fetchTranche = async () => {
      try {
        const response = await axios.get(`${API_URL}/tranche/findTwo`);
        // console.log("Tranche findtwo: ", response)
        if (response.data?.data && Array.isArray(response.data.data)) {
          setTrancheData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching sanction IDs:", error);
      }
    };

    fetchLenders();
    fetchSanctions();
    fetchTranche();
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newFormData = { ...formData, [name]: value };
    let newErrors = { ...errors };

    if (name === "lender_code") {
      newFormData.sanction_id = "";
      newFormData.tranche_amount = "";
      newErrors.tranche_amount = "";
    }

    if (name === "sanction_id") {
      newFormData.tranche_amount = "";
      newErrors.tranche_amount = "";
    }

    if (name === "tranche_id") {
      const exists = trancheData.some(
        (item) =>
          item.sanction_id === newFormData.sanction_id &&
          item.lender_code === newFormData.lender_code &&
          item.tranche_id === value
      );
      newErrors.tranche_id = exists ? "Tranche ID already exists for this Sanction ID!" : "";
    }

    // ✅ FIXED: tranche_amount validation
    if (name === "tranche_amount") {
      const amount = parseFloat(value || 0);

      // ✅ use correct key: sanction_amount
      const selectedSanction = sanctionData.find(
        (s) => s.sanction_id === newFormData.sanction_id
      );

      const allowedAmount = selectedSanction ? parseFloat(selectedSanction.sanction_amount) : 0;

      // console.log("Selected sanction:", selectedSanction);
      // console.log("Allowed amount:", allowedAmount, "Entered amount:", amount);

      newErrors.tranche_amount =
        amount > allowedAmount
          ? `Tranche amount cannot exceed sanction amount (${allowedAmount})`
          : "";

      // setTotalTrancheAmount(amount);
    }

    setFormData(newFormData);
    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdby = localStorage.getItem("token");  // Assuming token is the user ID
    const updatedby = localStorage.getItem("token");

    const finalFormData = {
      ...formData,
      createdby,
      updatedby,
    };
    if (finalFormData.current_ac_no !== finalFormData.conf_acc_no) {
      alert("Current A/C No and Confirm A/C No must match");
      return;
    }
    // console.log("Submitting final:", finalFormData);
    if (Object.values(errors).some((error) => error)) {
      alert("Please fix validation errors before submitting.");
      return;
    }

    try {
      // console.log("Form data Tranche: ", formData)
      const response = await fetch(`${API_URL}/tranche/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalFormData),
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      localStorage.setItem("submissionMessage", "Tranche Details Sent for Approval!");
      localStorage.setItem("messageType", "success");
      navigate("/DataCreation/TrancheDetails");
    } catch (error) {
      console.error("Error submitting tranche:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
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
          textAlign: "center",
          textTransform: "uppercase",
          borderBottom: "2px solid #0056b3",
          paddingBottom: "10px",
          mb: 3,
        }}
      >
        Tranche Details
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fieldConfig.map((field) => {
            const dynamicOptions = (() => {
              if (field.name === "lender_code") return lenderCodes;
              if (field.name === "sanction_id")
                return sanctionData.filter(
                  (sanction) => sanction.lender_code === formData.lender_code
                );
              return field.options || [];
            })();

            return (
              <Grid item xs={12} sm={6} key={field.name}>
                {field.type === "dropdown" ? (
                  <TextField
                    select
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    fullWidth
                    required={field.required}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                  >
                    {field.name === "lender_code" &&
                      dynamicOptions.map((lender) => (
                        <MenuItem key={lender.lender_code} value={lender.lender_code}>
                          {`${lender.lender_code} - ${lender.lender_name || lender.lender_code}`}
                        </MenuItem>
                      ))}

                    {field.name === "sanction_id" &&
                      dynamicOptions.map((sanction) => (
                        <MenuItem key={sanction.sanction_id} value={sanction.sanction_id}>
                          {sanction.sanction_id}
                        </MenuItem>
                      ))}

                    {field.name !== "lender_code" &&
                      field.name !== "sanction_id" &&
                      dynamicOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </TextField>
                ) : (
                  <TextField
                    type={field.type}
                    label={field.label}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    fullWidth
                    required={field.required}
                    inputProps={field.maxLength ? { maxLength: field.maxLength } : {}}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]}
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default TrancheDetails;
