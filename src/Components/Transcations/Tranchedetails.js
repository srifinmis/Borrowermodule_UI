import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Box
} from "@mui/material";

const Tranchedetails = () => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [tranches, setTranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/tranche-details", data);
      setTranches([...tranches, data]); // Update local state
      reset();
    } catch (error) {
      console.error("Error saving tranche details", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "20px auto", p: 2, border: "1px solid #ccc", borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#1976d2" }}>
        Tranche Details 
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Tranche ID" fullWidth margin="normal" 
          {...register("trancheId", { required: "Tranche ID is required", maxLength: 10 })} 
          error={!!errors.trancheId}
          helperText={errors.trancheId?.message}
        />
        
        <TextField label="Sanction ID" fullWidth margin="normal" 
          {...register("sanctionId", { required: "Sanction ID is required" })} 
          error={!!errors.sanctionId}
          helperText={errors.sanctionId?.message}
        />

        <TextField label="Tranche Date" type="date" fullWidth margin="normal" 
          {...register("trancheDate", { required: "Tranche Date is required" })} 
          error={!!errors.trancheDate}
          helperText={errors.trancheDate?.message}
          InputLabelProps={{ shrink: true }}
        />

        <TextField label="Tranche Number" type="number" fullWidth margin="normal" 
          {...register("trancheNumber", { required: "Tranche Number is required", min: 1 })} 
          error={!!errors.trancheNumber}
          helperText={errors.trancheNumber?.message}
        />

        <TextField label="Tranche Amount" type="number" fullWidth margin="normal" 
          {...register("trancheAmount", { required: "Amount is required", min: 1 })} 
          error={!!errors.trancheAmount}
          helperText={errors.trancheAmount?.message}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Interest Type</InputLabel>
          <Select {...register("interestType", { required: "Select an Interest Type" })}>
            <MenuItem value="Fixed">Fixed</MenuItem>
            <MenuItem value="Floating">Floating</MenuItem>
          </Select>
        </FormControl>

        <TextField label="Interest Rate (%)" type="number" fullWidth margin="normal" 
          {...register("interestRate", { required: "Interest Rate is required", min: 0 })} 
          error={!!errors.interestRate}
          helperText={errors.interestRate?.message}
        />

        <TextField label="Tenure (Months)" type="number" fullWidth margin="normal" 
          {...register("tenure", { required: "Tenure is required", min: 1 })} 
          error={!!errors.tenure}
          helperText={errors.tenure?.message}
        />

        <TextField label="Principal Start Date" type="date" fullWidth margin="normal" 
          {...register("principalStartDate", { required: "Start Date is required" })} 
          error={!!errors.principalStartDate}
          helperText={errors.principalStartDate?.message}
          InputLabelProps={{ shrink: true }}
        />

        <TextField label="Interest Start Date" type="date" fullWidth margin="normal" 
          {...register("interestStartDate", { required: "Start Date is required" })} 
          error={!!errors.interestStartDate}
          helperText={errors.interestStartDate?.message}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Principal Payment Frequency</InputLabel>
          <Select {...register("principalPaymentFrequency", { required: "Select a frequency" })}>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Annually">Annually</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Interest Payment Frequency</InputLabel>
          <Select {...register("interestPaymentFrequency", { required: "Select a frequency" })}>
            <MenuItem value="Monthly">Monthly</MenuItem>
            <MenuItem value="Quarterly">Quarterly</MenuItem>
            <MenuItem value="Annually">Annually</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Applicable for Leap Year</InputLabel>
          <Select {...register("leapYearApplicable", { required: "Select an option" })}>
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Interest Calculation Days</InputLabel>
          <Select {...register("interestCalculationDay", { required: "Select an option" })}>
            <MenuItem value="360">360</MenuItem>
            <MenuItem value="365">365</MenuItem>
            <MenuItem value="366">366</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>Saved Tranche Details</Typography>
      
      <Paper sx={{ mt: 2, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tranche ID</TableCell>
              <TableCell>Sanction ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Interest Rate</TableCell>
              <TableCell>Tenure</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tranches.length > 0 ? (
              tranches.map((tranche, index) => (
                <TableRow key={index}>
                  <TableCell>{tranche.trancheId}</TableCell>
                  <TableCell>{tranche.sanctionId}</TableCell>
                  <TableCell>{tranche.trancheAmount}</TableCell>
                  <TableCell>{tranche.interestRate}%</TableCell>
                  <TableCell>{tranche.tenure} months</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">No tranche details available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Tranchedetails;
