import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Box, Grid } from '@mui/material';

const SanctionDetails = ({ isDropped }) => {
  const [formData, setFormData] = useState({
    sanctionId: '',
    lenderCode: '',
    loanType: '',
    loanPurpose: '',
    interestType: '',
    interestRateFixed: '',
    benchmarkRate: '',
    spread: '',
    tenureMonths: '',
    principalRepaymentTerm: '',
    interestPaymentTerm: '',
    sanctionValidity: '',
    sanctionAmount: '',
    processingFee: '',
    otherExpenses: '',
    bookDebtMargin: '',
    cashMargin: '',
    prepaymentCharges: '',
    corporateGuarantee: '',
    penalCharges: '',
    syndicationFee: '',
    syndicatedBy: '',
    sanctionDate: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved Data: ", formData);
    alert('Data saved successfully!');
  };

  const handleClear = () => {
    setFormData({
      sanctionId: '', lenderCode: '', loanType: '', loanPurpose: '', interestType: '', interestRateFixed: '', benchmarkRate: '', spread: '', tenureMonths: '',
      principalRepaymentTerm: '', interestPaymentTerm: '', sanctionValidity: '', sanctionAmount: '', processingFee: '', otherExpenses: '',
      bookDebtMargin: '', cashMargin: '', prepaymentCharges: '', corporateGuarantee: '', penalCharges: '', syndicationFee: '', syndicatedBy: '', sanctionDate: ''
    });
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
      <h2 style={{ textAlign: 'center', color: '#0056b3', fontWeight: 'bold', borderBottom: '2px solid #0056b3', paddingBottom: '10px' }}>Sanction Details </h2>
      <Grid container spacing={3}>
        <Grid item xs={4}><TextField label="Sanction ID" name="sanctionId" value={formData.sanctionId} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Lender Code" name="lenderCode" value={formData.lenderCode} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="loan-type-label">Loan Type</InputLabel>
            <Select
              labelId="loan-type-label"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              label="Loan Type" // Ensuring proper label association
            >
              <MenuItem value="Term Loan">Term Loan</MenuItem>
              <MenuItem value="Demand Loan">Demand Loan</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}><TextField label="Purpose of Loan" name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="interest-type-label">Interest Type</InputLabel>
            <Select
              labelId="interest-type-label" name="interestType" value={formData.interestType} onChange={handleChange} label="Interest Type"
            >
              <MenuItem value="Fixed">Fixed</MenuItem>
              <MenuItem value="Floating">Floating</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={4}><TextField label="Interest Rate (Fixed)" name="interestRateFixed" value={formData.interestRateFixed} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Benchmark Rate (Floating)" name="benchmarkRate" value={formData.benchmarkRate} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Spread (Floating) (%)" name="spread" value={formData.spread} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Tenure (Months)" name="tenureMonths" value={formData.tenureMonths} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Principal Repayment Term" name="principalRepaymentTerm" value={formData.principalRepaymentTerm} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Interest Payment Term" name="interestPaymentTerm" value={formData.interestPaymentTerm} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Sanction Validity" name="sanctionValidity" value={formData.sanctionValidity} onChange={handleChange} type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} /> </Grid>
        <Grid item xs={4}><TextField label="Sanction Amount" name="sanctionAmount" value={formData.sanctionAmount} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Processing Fee (%)" name="processingFee" value={formData.processingFee} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Other Expenses (%)" name="otherExpenses" value={formData.otherExpenses} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Book Debt Margin (%)" name="bookDebtMargin" value={formData.bookDebtMargin} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Cash Margin (%)" name="cashMargin" value={formData.cashMargin} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Prepayment Charges (%)" name="prepaymentCharges" value={formData.prepaymentCharges} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Corporate Guarantee (%)" name="corporateGuarantee" value={formData.corporateGuarantee} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Penal Charges (%)" name="penalCharges" value={formData.penalCharges} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Syndication Fee (%)" name="syndicationFee" value={formData.syndicationFee} onChange={handleChange} type="number" fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Syndicated By" name="syndicatedBy" value={formData.syndicatedBy} onChange={handleChange} fullWidth /></Grid>
        <Grid item xs={4}><TextField label="Sanction Date" name="sanctionDate" value={formData.sanctionDate} onChange={handleChange} type="date" fullWidth variant="outlined" InputLabelProps={{ shrink: true }} /></Grid>
      </Grid>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        <Button variant="outlined" color="secondary" onClick={handleClear}>Clear</Button>
      </Box>
    </Box>
  );
};

export default SanctionDetails;
