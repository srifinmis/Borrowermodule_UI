import React, { useState } from "react";
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

const approvalTypes = ["Board", "Finance Committee"];

const Rocform = ({ isDropped }) => {
  const [formData, setFormData] = useState({
    sanctionId: "",
    approvedBy: "",
    dateOfApproval: "",
    documentExecutedDate: "",
    dueDateChargeCreation: "",
    dateFormFiledCreation: "",
    dueDateSatisfaction: "",
    dateFilingSatisfaction: "",
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
    <Box
     sx={{
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
        ROC Form
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Sanction ID" name="sanctionId" value={formData.sanctionId} onChange={handleChange} fullWidth required />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth required>
            <InputLabel>Approved By</InputLabel>
            <Select name="approvedBy" value={formData.approvedBy} onChange={handleSelectChange("approvedBy")}>
              {approvalTypes.map((type) => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField label="Date of Approval" name="dateOfApproval" type="date" value={formData.dateOfApproval} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Document Executed Date" name="documentExecutedDate" type="date" value={formData.documentExecutedDate} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Due Date - Charge Creation" name="dueDateChargeCreation" type="date" value={formData.dueDateChargeCreation} onChange={handleChange} fullWidth required InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Date of Form Filed (Creation)" name="dateFormFiledCreation" type="date" value={formData.dateFormFiledCreation} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Due Date - Satisfaction" name="dueDateSatisfaction" type="date" value={formData.dueDateSatisfaction} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
        <Grid item xs={6}>
          <TextField label="Date of Filing (Satisfaction)" name="dateFilingSatisfaction" type="date" value={formData.dateFilingSatisfaction} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} />
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
        <Button variant="contained" color="secondary">Cancel</Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>Save</Button>
      </Box>
    </Box>
  );
};

export default Rocform;
