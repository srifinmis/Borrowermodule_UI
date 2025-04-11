// import React, { useState, useEffect } from "react";
// import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, MenuItem } from "@mui/material";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const LenderMasterReport = ({ isDropped }) => {
//   const [lenders, setLenders] = useState([]);
//   const [filteredLenders, setFilteredLenders] = useState([]);
//   const [lenderType, setLenderType] = useState("");
//   const [status, setStatus] = useState("");

//   useEffect(() => {
//     fetch("/api/lenders") // Replace with actual API endpoint
//       .then((res) => res.json())
//       .then((data) => {
//         setLenders(data);
//         setFilteredLenders(data);
//       });
//   }, []);

//   const handleFilter = () => {
//     let filtered = lenders;
//     if (lenderType) filtered = filtered.filter((l) => l.type === lenderType);
//     if (status) filtered = filtered.filter((l) => l.status === status);
//     setFilteredLenders(filtered);
//   };

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredLenders);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Lenders");
//     XLSX.writeFile(workbook, "LenderMaster.xlsx");
//   };

//   const exportToPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Lender Master Report", 20, 10);
//     doc.autoTable({
//       head: [["Lender Name", "Type", "Status"]],
//       body: filteredLenders.map((l) => [l.name, l.type, l.status]),
//     });
//     doc.save("LenderMaster.pdf");
//   };

//   return (
//     <div>
//       <h2>Lender Master Report</h2>
//       <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <TextField select label="Lender Type" value={lenderType} onChange={(e) => setLenderType(e.target.value)}>
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="Bank">Bank</MenuItem>
//           <MenuItem value="NBFC">NBFC</MenuItem>
//         </TextField>
//         <TextField select label="Status" value={status} onChange={(e) => setStatus(e.target.value)}>
//           <MenuItem value="">All</MenuItem>
//           <MenuItem value="Active">Active</MenuItem>
//           <MenuItem value="Inactive">Inactive</MenuItem>
//         </TextField>
//         <Button variant="contained" onClick={handleFilter}>Apply Filters</Button>
//       </div>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Lender Name</TableCell>
//             <TableCell>Type</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {filteredLenders.map((lender, index) => (
//             <TableRow key={index}>
//               <TableCell>{lender.name}</TableCell>
//               <TableCell>{lender.type}</TableCell>
//               <TableCell>{lender.status}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <div style={{ marginTop: "20px" }}>
//         <Button variant="contained" onClick={exportToExcel} style={{ marginRight: "10px" }}>
//           Export to Excel
//         </Button>
//         <Button variant="contained" onClick={exportToPDF}>
//           Export to PDF
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default LenderMasterReport;
import React, { useState } from 'react';
// import { APIURL } from '../configuration';
import {
  Box, Button, Grid, MenuItem, Select, InputLabel, FormControl,
  Typography, CircularProgress
} from '@mui/material';

const LenderMasterReport = ({ isDropped }) => {
  const [lenderType, setLenderType] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloadLink, setDownloadLink] = useState('');
  const [format, setFormat] = useState('Excel');

  const generateReport = async () => {
    setLoading(true);
    setDownloadLink('');

    const reportParams = { lenderType, status, format };

    try {
      const response = await fetch(`http://localhost:5002/generate-lender-master-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportParams),
      });

      if (!response.ok) throw new Error('Failed to generate report');

      const data = await response.json();
      setDownloadLink(data.downloadUrl);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating the report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: 2,
      // width: "auto",
      margin: "auto",
      marginTop: "70px",
      marginLeft: isDropped ? "100px" : "280px",
      transition: "margin-left 0.3s ease-in-out",
      width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
      padding: 3,
      border: "1px solid #ccc",
      borderRadius: 2,
      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
    }}>
      <Typography sx={{
        color: "#0056b3",
        fontWeight: "600",
        fontSize: "20px",
        marginBottom: "20px",
        textAlign: "center",
        textTransform: "uppercase",
        letterSpacing: "1px",
        borderBottom: "2px solid #0056b3",
        paddingBottom: "10px",
      }}>
        Lender Master Report
      </Typography>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Lender Type</InputLabel>
            <Select value={lenderType} onChange={(e) => setLenderType(e.target.value)}>
              <MenuItem value="Bank">Bank</MenuItem>
              <MenuItem value="NBFC">NBFC</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select value={status} onChange={(e) => setStatus(e.target.value)}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ marginTop: 2 }}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Output Format</InputLabel>
            <Select value={format} onChange={(e) => setFormat(e.target.value)}>
              <MenuItem value="Excel">Excel</MenuItem>
              <MenuItem value="PDF">PDF</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box sx={{ textAlign: 'center', marginTop: 3 }}>
        <Button variant="contained" onClick={generateReport} disabled={loading}>
          {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Generate Report'}
        </Button>
      </Box>

      {downloadLink && (
        <Typography variant="body2" sx={{ marginTop: '20px', textAlign: 'center' }}>
          Your report is ready! <a href={downloadLink} download>Click here to download</a>
        </Typography>
      )}
    </Box>
  );
};

export default LenderMasterReport;
