import React, { useState } from "react";
import { TextField, Button, Grid, Box, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";

const approvedByOptions = ["Board", "Finance Committee"];

const BankAccount = ({ isDropped }) => {
  const [formData, setFormData] = useState({
    sanctionId: "",
    currentAccountNo: "",
    bankName: "",
    bankBranch: "",
    location: "",
    ifscCode: "",
    approvedBy: "",
    dateOfApproval: "",
    documentExecutedDate: "",
    dueDateChargeCreation: "",
    dateOfFormFiledCreation: "",
    dueDateSatisfaction: "",
    dateOfFilingSatisfaction: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: 2,
      width: "auto",
      // maxWidth: "800px",
      margin: "auto",
      // marginLeft:"200px;"
      marginTop: "70px",
      marginLeft: isDropped ? "100px" : "280px",
      transition: "margin-left 0.3s ease",
      width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
      // marginLeft: `calc(${isDropped}px + 20px)`,
      padding: 3,
      border: "1px solid #ccc",
      borderRadius: 2,
      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
      transition: "margin-left 0.3s ease-in-out",
    }}>
      <Typography sx={{ color: "#0056b3", fontWeight: "600", fontSize: "20px", marginBottom: "20px", textAlign: "center", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #0056b3", paddingBottom: "10px" }}>
        Bank Account Details for Repayment
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}><TextField label="Sanction ID" name="sanctionId" value={formData.sanctionId} onChange={handleChange} fullWidth required /></Grid>
        <Grid item xs={6}><TextField label="Current A/C No" name="currentAccountNo" value={formData.currentAccountNo} onChange={handleChange} fullWidth required /></Grid>
        <Grid item xs={6}><TextField label="Name of the Bank" name="bankName" value={formData.bankName} onChange={handleChange} fullWidth required /></Grid>
        <Grid item xs={6}><TextField label="Bank Branch" name="bankBranch" value={formData.bankBranch} onChange={handleChange} fullWidth required /></Grid>
        <Grid item xs={6}><TextField label="Location" name="location" value={formData.location} onChange={handleChange} fullWidth required /></Grid>
        <Grid item xs={6}><TextField label="IFSC Code" name="ifscCode" value={formData.ifscCode} onChange={handleChange} fullWidth required /></Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
        <Button variant="contained" color="secondary">Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
      </Box>
    </Box>
  );
};

export default BankAccount;
