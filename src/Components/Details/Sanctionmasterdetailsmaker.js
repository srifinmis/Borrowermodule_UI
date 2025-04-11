import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Grid, Typography, TextField, CircularProgress, Paper, Button, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import axios from "axios";

const fieldConfig = [
    { name: "lender_code", label: "Lender Code" },
    { name: "sanction_id", label: "Sanction Id" },
    { name: "loan_type", label: "Loan Type" },
    { name: "sanction_amount", label: "Sanction Amount" },
    { name: "sanction_date", label: "Sanction Date" },
    { name: "sanction_validity", label: "Sanction Validity" },
    { name: "interest_type", label: "Interest Type" },
    { name: "interest_rate_fixed", label: "Interest Rate (Fixed)" },
    { name: "benchmark_rate", label: "Benchmark Rate" },
    { name: "spread_floating", label: "Spread Floating" },
    { name: "interest_payment_term", label: "Interest Payment Term" },
    { name: "principal_repayment_term", label: "Principal Repayment Term" },
    { name: "processing_fee", label: "Processing Fee" },
    { name: "prepayment_charges", label: "Prepayment Charges" },
    { name: "penal_charges", label: "Penal Charges" },
    { name: "book_debt_margin", label: "Book Debt Margin" },
    { name: "cash_margin", label: "Cash Margin" },
    { name: "other_expenses", label: "Other Expenses" },
    { name: "corporate_guarantee", label: "Corporate Guarantee" },
    { name: "purpose_of_loan", label: "Purpose of Loan" },
    { name: "syndicated_by", label: "Syndicated By" },
    { name: "syndication_fee", label: "Syndication Fee" },
    { name: "tenure_months", label: "Tenure (Months)" },
    { name: "remarks", label: "Remarks" }
];

const loanTypes = ["Term Loan", "Demand Loan"];
const interestTypes = ["Fixed", "Floating"];
const repaymentTerms = ["Monthly", "Quarterly", "Half-Yearly", "Yearly", "Bullet"];
const benchmarkRates = ["LIBOR", "MIBOR", "Other"];

const SanctionDetailsmaker = ({ isDropped }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const location = useLocation();
    const { sanction_id, lender_code, approval_status, updatedat } = location.state;
    const [sanction, setSanction] = useState(null);
    const [lenderCodes, setLenderCodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchLenderCodes = async () => {
            try {
                const response = await axios.get(`${API_URL}/sanction/lendercodes`);
                setLenderCodes(response.data.data.map((item) => item.lender_code));
            } catch (error) {
                console.error("Error fetching lender codes:", error);
            }
        };
        fetchLenderCodes();
    }, [API_URL]);

    useEffect(() => {
        const fetchLenderDetails = async () => {
            try {
                // console.log("maker view: ", sanction_id, lender_code, approval_status, updatedat)
                const response = await axios.get(`${API_URL}/sanction/details`, {
                    params: { sanction_id, lender_code, approval_status, updatedat },
                });
                // console.log("sanction: ", response)
                if (response.status === 200) {
                    setSanction(response.data.sanction);
                }
            } catch (error) {
                console.error("Error fetching lender details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLenderDetails();
    }, [API_URL, sanction_id, approval_status, lender_code, updatedat]);

    const handleEdit = () => setIsEditing(true);

    const handleUpdate = async () => {
        try {

            const createdby = localStorage.getItem("token");  // Fallback to a default value
            const updatedby = localStorage.getItem("token");  // Fallback to a default value

            const sanctionData = {
                ...sanction,
                createdby,
                updatedby,
            };

            // console.log("Check lender: ", sanctionData);
            const response = await fetch(`${API_URL}/sanction/update/${sanction.sanction_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanctionData),
            });
            if (response.ok) {
                if (response.status === 201) {
                    alert("Sanction updated Sent to Approval!");
                } else {
                    alert("Sanction updated Sent to Approval Failed!");
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

    const handleBack = () => navigate("/DataCreation/SanctionDetails");

    const handleChange = (e) => setSanction({ ...sanction, [e.target.name]: e.target.value });

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, margin: "auto", marginTop: "70px", marginLeft: isDropped ? "100px" : "280px", transition: "margin-left 0.3s ease-in-out", width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)", padding: 3, border: "1px solid #ccc", borderRadius: 2, boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)" }}>
            <Typography sx={{ color: "#0056b3", fontWeight: "600", fontSize: "20px", marginBottom: "20px", textAlign: "center", textTransform: "uppercase", letterSpacing: "1px", borderBottom: "2px solid #0056b3", paddingBottom: "10px" }}>Sanction Details</Typography>
            {loading ? (
                <CircularProgress sx={{ display: "block", margin: "auto" }} />
            ) : sanction ? (
                <Paper elevation={0} sx={{ padding: 3 }}>
                    <Grid container spacing={2}>
                        {fieldConfig.map((field) => (
                            <Grid key={field.name} item xs={12} sm={6}>
                                {field.name === "lender_code" ||
                                    field.name === "loan_type" ||
                                    field.name === "interest_type" ||
                                    field.name === "interest_payment_term" ||
                                    field.name === "benchmark_rate" ||
                                    field.name === "principal_repayment_term" ? (
                                    <FormControl fullWidth variant="outlined"
                                        sx={{
                                            cursor: "default",
                                            backgroundColor: sanction.updated_fields?.includes(field.name) ? "#fcec03" : "#ebeced",
                                            "& .MuiInputBase-root": {
                                                // pointerEvents: "none"
                                            }
                                        }}
                                    >
                                        <InputLabel>{field.label}</InputLabel>
                                        <Select label={field.label} name={field.name} value={sanction?.[field.name] || ""} onChange={handleChange} disabled={!isEditing || field.name === "lender_code"}>
                                            {(field.name === "lender_code" ? lenderCodes : field.name === "loan_type" ? loanTypes : field.name === "interest_type" ? interestTypes : field.name === "interest_payment_term" || field.name === "principal_repayment_term" ? repaymentTerms : benchmarkRates).map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField label={field.label}
                                        name={field.name}
                                        value={sanction[field.name] || ""}
                                        fullWidth
                                        onChange={handleChange}
                                        InputProps={{
                                            readOnly: !isEditing || field.name === "sanction_id" || field.name === "lender_code",
                                            style: field.name === "sanction_id" || field.name === "lender_code"
                                                ? { pointerEvents: "none", cursor: "not-allowed", backgroundColor: "#ebeced" }
                                                : {},
                                        }}
                                        sx={{
                                            cursor: "default",
                                            backgroundColor: sanction.updated_fields?.includes(field.name) ? "#fcec03" : "#ebeced",
                                            "& .MuiInputBase-root": {
                                                // pointerEvents: "none"
                                            }
                                        }}
                                    />
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3, gap: 2 }}>
                        <Button variant="contained" color="warning" onClick={handleBack}>
                            Back
                        </Button>
                        {isEditing ?
                            <Button variant="contained" color="primary" onClick={handleUpdate}>update</Button>
                            :
                            <Button variant="contained" color="error" onClick={handleEdit}>Edit</Button>
                        }
                    </Box>
                </Paper>
            ) : (
                <Typography sx={{ textAlign: "center", marginTop: 2 }}>Sanction details not found</Typography>
            )}
        </Box>
    );
};

export default SanctionDetailsmaker;
