import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const InterestRateChangeForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [sanctionTrancheList, setSanctionTrancheList] = useState([]);
  const [rateChanges, setRateChanges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch Sanction/Tranche IDs
    axios.get("/api/sanction-tranche-list").then((response) => {
      setSanctionTrancheList(response.data);
    }).catch((error) => console.error("Error fetching list", error));
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/api/interest-rate-change", data);
      setRateChanges([...rateChanges, data]); // Update local state
      reset();
    } catch (error) {
      console.error("Error saving interest rate change", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 900, margin: "20px auto", p: 3, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", textAlign: "center", color: "#1976d2" }}>
        Interest Rate Change
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Sanction/Tranche ID */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Sanction/Tranche ID</InputLabel>
              <Select {...register("sanctionTrancheId", { required: "Required" })}>
                {sanctionTrancheList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.id}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* New Interest Rate */}
          <Grid item xs={12} sm={6}>
            <TextField type="number" fullWidth label="New Interest Rate (%)"
              {...register("newInterestRate", { required: "Required", min: { value: 0, message: "Must be positive" } })}
              error={!!errors.newInterestRate} helperText={errors.newInterestRate?.message}
            />
          </Grid>

          {/* Effective Date */}
          <Grid item xs={12} sm={6}>
            <TextField type="date" fullWidth label="Effective Date"
              {...register("effectiveDate", { required: "Required" })}
              error={!!errors.effectiveDate} helperText={errors.effectiveDate?.message}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Updated By */}
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Updated By"
              {...register("updatedBy", { required: "Required" })}
              error={!!errors.updatedBy} helperText={errors.updatedBy?.message}
            />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      {/* Rate Change History */}
      <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>Rate Change History</Typography>
      <Paper sx={{ mt: 2, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sanction/Tranche ID</TableCell>
              <TableCell>New Rate (%)</TableCell>
              <TableCell>Effective Date</TableCell>
              <TableCell>Updated By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rateChanges.length > 0 ? (
              rateChanges.map((rate, index) => (
                <TableRow key={index}>
                  <TableCell>{rate.sanctionTrancheId}</TableCell>
                  <TableCell>{rate.newInterestRate}%</TableCell>
                  <TableCell>{rate.effectiveDate}</TableCell>
                  <TableCell>{rate.updatedBy}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">No data available.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Paper>
  );
};

export default InterestRateChangeForm;
