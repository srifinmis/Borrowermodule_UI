
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Box, Grid, Typography, TextField, CircularProgress, Paper, Button } from "@mui/material";
// import axios from "axios";
// const fieldConfig = [
//     { name: "sanction_id", label: "Sanction Id" },
//     { name: "current_ac_no", label: "Current A/C No" },
//     { name: "bank_name", label: "Bank Name" },
//     { name: "bank_branch", label: "Bank Branch" },
//     { name: "location", label: "Location" },
//     { name: "ifsc_code", label: "IFSC Code" },
//     { name: "conf_acc_no", label: "Confirmed A/C No" },
//     { name: "createdat", label: "Created At" },
//     { name: "updatedat", label: "Updated At" },
//     { name: "createdby", label: "Created By" },
//     { name: "updatedby", label: "Updated By" },
//     { name: "remarks", label: "Remarks" },
// ];



// const Tranchemaker = ({ isDropped }) => {
//     const { tranche_id } = useParams();
//     const navigate = useNavigate();
//     const [sanction, setSanction] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isEditing, setIsEditing] = useState(false);

//     useEffect(() => {
//         const fetchLenderDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5002/api/tranche/details/${tranche_id}`);
//                 console.log('Response: ', response.data.data[0]);
//                 if (response.status === 201) {
//                     setSanction(response.data.data[0]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching tranche details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchLenderDetails();
//     }, [tranche_id]);

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleUpdate = async () => {
//         try {
//             console.log("update roc: ", sanction);
//             const response = await fetch(`http://localhost:5002/api/tranche/update/${sanction.tranche_id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 // body: JSON.stringify(`[ ${dataSend} ]`),
//                 body: JSON.stringify(sanction),
//             });
//             console.log("API hit data : ", response);
//             if (response.status === 201) {
//                 alert("Tranche updated successfully.");
//             } else {
//                 alert("Tranche Update failed.");
//             }
//             // await axios.patch(`http://localhost:5002/api/lender/update/${lender_code}`, lender);
//             // alert("Lender details updated successfully");
//             setIsEditing(false);
//         } catch (error) {
//             console.error("Error updating tranche details:", error);
//             alert("Failed to update tranche details");
//         }
//     };

//     const handleBack = () => {
//         navigate("/DataCreation/TrancheDetails"); // Adjust as per actual main page route
//     };

//     const handleChange = (e) => {
//         setSanction({ ...sanction, [e.target.name]: e.target.value });
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 gap: 2,
//                 margin: "auto",
//                 marginTop: "70px",
//                 marginLeft: isDropped ? "100px" : "280px",
//                 transition: "margin-left 0.3s ease-in-out",
//                 width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//                 padding: 3,
//                 border: "1px solid #ccc",
//                 borderRadius: 2,
//                 boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//             }}
//         >
//             <Typography
//                 sx={{
//                     color: "#0056b3",
//                     fontWeight: "600",
//                     fontSize: "20px",
//                     marginBottom: "20px",
//                     textAlign: "center",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     borderBottom: "2px solid #0056b3",
//                     paddingBottom: "10px",
//                 }}
//             >
//                 Bank Repayment
//             </Typography>

//             {loading ? (
//                 <CircularProgress sx={{ display: "block", margin: "auto" }} />
//             ) : sanction ? (
//                 <Paper elevation={0} sx={{ padding: 3 }}>
//                     <Grid container spacing={2}>
//                         {fieldConfig.map((field) => (
//                             <Grid key={field.name} item xs={12} sm={6}>
//                                 <TextField
//                                     label={field.label}
//                                     name={field.name}
//                                     value={sanction[field.name] || ""}
//                                     fullWidth
//                                     onChange={handleChange}
//                                     InputProps={{ readOnly: !isEditing }}
//                                     sx={{
//                                         backgroundColor: isEditing ? "#fff" : "#ebeced",
//                                     }}
//                                 />
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Box mt={3} sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
//                         <Button variant="contained" color="warning" onClick={handleBack}>
//                             Back
//                         </Button>
//                         {isEditing ? (
//                             <Button variant="contained" color="primary" onClick={handleUpdate}>
//                                 Update
//                             </Button>
//                         ) : (
//                             <Button variant="contained" color="error" onClick={handleEdit}>
//                                 Edit
//                             </Button>
//                         )}

//                     </Box>
//                 </Paper>
//             ) : (
//                 <Typography sx={{ textAlign: "center", marginTop: 2 }}>Bank Repayment details not found</Typography>
//             )}
//         </Box>
//     );
// };

// export default Tranchemaker;
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Box, Grid, Typography, TextField, CircularProgress, Paper, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import axios from "axios";

// const fieldConfig = [
//     { name: "sanction_id", label: "Sanction Id", type: "text" },
//     { name: "current_ac_no", label: "Current A/C No", type: "text" },
//     { name: "bank_name", label: "Bank Name", type: "text" },
//     { name: "bank_branch", label: "Bank Branch", type: "text" },
//     { name: "location", label: "Location", type: "text" },
//     { name: "ifsc_code", label: "IFSC Code", type: "text" },
//     { name: "conf_acc_no", label: "Confirmed A/C No", type: "text" },
//     { name: "createdat", label: "Created At", type: "text" },
//     { name: "updatedat", label: "Updated At", type: "text" },
//     { name: "createdby", label: "Created By", type: "text" },
//     { name: "updatedby", label: "Updated By", type: "text" },
//     { name: "remarks", label: "Remarks", type: "text" },
//     { name: "interest_type", label: "Interest Type", type: "select", options: ["Fixed", "Floating"] }, // Add a new type for select fields
// ];

// const Tranchemaker = ({ isDropped }) => {
//     const { tranche_id } = useParams();
//     const navigate = useNavigate();
//     const [sanction, setSanction] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [isEditing, setIsEditing] = useState(false);

//     useEffect(() => {
//         const fetchLenderDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5002/api/tranche/details/${tranche_id}`);
//                 console.log('Response: ', response.data.data[0]);
//                 if (response.status === 201) {
//                     setSanction(response.data.data[0]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching tranche details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchLenderDetails();
//     }, [tranche_id]);

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleUpdate = async () => {
//         try {
//             console.log("update roc: ", sanction);
//             const response = await fetch(`http://localhost:5002/api/tranche/update/${sanction.tranche_id}`, {
//                 method: "PATCH",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(sanction),
//             });
//             console.log("API hit data : ", response);
//             if (response.status === 201) {
//                 alert("Tranche updated successfully.");
//             } else {
//                 alert("Tranche Update failed.");
//             }
//             setIsEditing(false);
//         } catch (error) {
//             console.error("Error updating tranche details:", error);
//             alert("Failed to update tranche details");
//         }
//     };

//     const handleBack = () => {
//         navigate("/DataCreation/TrancheDetails"); // Adjust as per actual main page route
//     };

//     const handleChange = (e) => {
//         setSanction({ ...sanction, [e.target.name]: e.target.value });
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 gap: 2,
//                 margin: "auto",
//                 marginTop: "70px",
//                 marginLeft: isDropped ? "100px" : "280px",
//                 transition: "margin-left 0.3s ease-in-out",
//                 width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//                 padding: 3,
//                 border: "1px solid #ccc",
//                 borderRadius: 2,
//                 boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//             }}
//         >
//             <Typography
//                 sx={{
//                     color: "#0056b3",
//                     fontWeight: "600",
//                     fontSize: "20px",
//                     marginBottom: "20px",
//                     textAlign: "center",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     borderBottom: "2px solid #0056b3",
//                     paddingBottom: "10px",
//                 }}
//             >
//                 Bank Repayment
//             </Typography>

//             {loading ? (
//                 <CircularProgress sx={{ display: "block", margin: "auto" }} />
//             ) : sanction ? (
//                 <Paper elevation={0} sx={{ padding: 3 }}>
//                     <Grid container spacing={2}>
//                         {fieldConfig.map((field) => (
//                             <Grid key={field.name} item xs={12} sm={6}>
//                                 {field.type === "select" ? (
//                                     <FormControl fullWidth required>
//                                         <InputLabel>{field.label}</InputLabel>
//                                         <Select
//                                             name={field.name}
//                                             value={sanction[field.name] || ""}
//                                             onChange={handleChange}
//                                             disabled={!isEditing}
//                                         >
//                                             {field.options.map((option) => (
//                                                 <MenuItem key={option} value={option}>
//                                                     {option}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 ) : (
//                                     <TextField
//                                         label={field.label}
//                                         name={field.name}
//                                         value={sanction[field.name] || ""}
//                                         fullWidth
//                                         onChange={handleChange}
//                                         InputProps={{ readOnly: !isEditing }}
//                                         sx={{
//                                             backgroundColor: isEditing ? "#fff" : "#ebeced",
//                                         }}
//                                     />
//                                 )}
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Box mt={3} sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
//                         <Button variant="contained" color="warning" onClick={handleBack}>
//                             Back
//                         </Button>
//                         {isEditing ? (
//                             <Button variant="contained" color="primary" onClick={handleUpdate}>
//                                 Update
//                             </Button>
//                         ) : (
//                             <Button variant="contained" color="error" onClick={handleEdit}>
//                                 Edit
//                             </Button>
//                         )}
//                     </Box>
//                 </Paper>
//             ) : (
//                 <Typography sx={{ textAlign: "center", marginTop: 2 }}>Bank Repayment details not found</Typography>
//             )}
//         </Box>
//     );
// };

// export default Tranchemaker;
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Box, Grid, Typography, TextField, CircularProgress, Paper, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import axios from "axios";

// const fieldConfig = [
//     { name: "tranche_id", label: "Tranche Id", type: "text" },
//     { name: "sanction_id", label: "Sanction Id", type: "text" },
//     { name: "tranche_date", label: "Tranche Date", type: "date" },
//     { name: "tranche_number", label: "Tranche Number", type: "number" },
//     { name: "tranche_amount", label: "Tranche Amount", type: "number" },
//     { name: "interest_type", label: "Interest Type", type: "select", options: ["Fixed", "Floating"] },
//     { name: "interest_rate", label: "Interest Rate", type: "number" },
//     { name: "tenure_months", label: "Tenure Months", type: "number" },
//     { name: "principal_start_date", label: "Principle start Date", type: "text" },
//     { name: "interest_start_date", label: "Interest Start Date", type: "date" },
//     { name: "principal_payment_frequency", label: "Principal Payment Frequency", type: "text" },
//     { name: "interest_payment_frequency", label: "Interest Payment Frequency", type: "text" },
//     { name: "applicable_of_leap_year", label: "Applicable for Leap Year", type: "checkbox" },
//     { name: "interest_calculation_days", label: "Interest Calculation Days", type: "number" },
//     { name: "remarks", label: "Remarks", type: "text" },
// ];

// const Tranchemaker = ({ isDropped }) => {
//     // const { tranche_id } = useParams();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { tranche_id, approval_status } = location.state || {};
//     const [sanction, setSanction] = useState(null);
//     const [sanctionAmount, setSanctionAmount] = useState(0); // Store the sanction amount
//     const [totalTrancheAmount, setTotalTrancheAmount] = useState(0); // Store total tranche amount
//     const [loading, setLoading] = useState(true);
//     const [isEditing, setIsEditing] = useState(false);

//     useEffect(() => {
//         const fetchSanctionDetails = async () => {
//             try {
//                 console.log("trache 2 params: ", tranche_id, approval_status)
//                 const response = await axios.get(`http://localhost:5002/api/tranche/details`, {
//                     params: { tranche_id, approval_status },
//                 });
//                 if (response.status === 200) {
//                     const fetchedSanction = response.data.tranche;
//                     setSanction(fetchedSanction);
//                     console.log("tanche data: ", fetchedSanction);
//                     console.log("amount: ", fetchedSanction.tranche_amount);
//                     setSanctionAmount(fetchedSanction.tranche_amount); // Fetch sanction amount
//                 }
//             } catch (error) {
//                 console.error("Error fetching tranche details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         // const fetchSanctionAmount = async (sanctionId) => {
//         //     try {
//         //         const response = await axios.get(`http://localhost:5002/api/sanction/amount/${sanctionId}`);
//         //         if (response.data?.sanction_amount) {
//         //             setSanctionAmount(response.data.sanction_amount);
//         //         }
//         //     } catch (error) {
//         //         console.error("Error fetching sanction amount:", error);
//         //     }
//         // };

//         fetchSanctionDetails();
//     }, [tranche_id]);

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleUpdate = async () => {
//         if (totalTrancheAmount > sanctionAmount) {
//             alert("Total tranche amount exceeds the sanction amount!");
//             return;
//         }

//         try {
//             console.log("get to send api: ", sanction)
//             const updatedtranche = {
//                 ...sanction,
//                 createdby: localStorage.getItem("token"),  // Replace with user ID if decoded from JWT
//                 updatedby: localStorage.getItem("token")   // Replace with user ID if decoded from JWT
//             };
//             console.log("update send api: ", updatedtranche)
//             const response = await axios.patch(`http://localhost:5002/api/tranche/update/${sanction.tranche_id}`, {
//                 method: "PATCH",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedtranche),
//             });
//             console.log("update api response: ", response)
//             if (response.status === 201) {
//                 alert("Tranche updated successfully.");
//             } else {
//                 alert("Tranche Update failed.");
//             }
//             setIsEditing(false);
//         } catch (error) {
//             console.error("Error updating tranche details:", error);
//             alert("Failed to update tranche details");
//         }
//     };

//     const handleBack = () => {
//         navigate("/DataCreation/TrancheDetails");
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSanction({ ...sanction, [name]: value });

//         // Calculate total tranche amount (if applicable) based on changes
//         if (name === "tranche_amount") {
//             const newTotal = totalTrancheAmount + parseFloat(value || 0);
//             setTotalTrancheAmount(newTotal);
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 gap: 2,
//                 margin: "auto",
//                 marginTop: "70px",
//                 marginLeft: isDropped ? "100px" : "280px",
//                 transition: "margin-left 0.3s ease-in-out",
//                 width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//                 padding: 3,
//                 border: "1px solid #ccc",
//                 borderRadius: 2,
//                 boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//             }}
//         >
//             <Typography
//                 sx={{
//                     color: "#0056b3",
//                     fontWeight: "600",
//                     fontSize: "20px",
//                     marginBottom: "20px",
//                     textAlign: "center",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     borderBottom: "2px solid #0056b3",
//                     paddingBottom: "10px",
//                 }}
//             >
//                 Tranche Details
//             </Typography>

//             {loading ? (
//                 <CircularProgress sx={{ display: "block", margin: "auto" }} />
//             ) : sanction ? (
//                 <Paper elevation={0} sx={{ padding: 3 }}>
//                     <Grid container spacing={2}>
//                         {fieldConfig.map((field) => (
//                             <Grid key={field.name} item xs={12} sm={6}>
//                                 {field.type === "select" ? (
//                                     <FormControl fullWidth required>
//                                         <InputLabel>{field.label}</InputLabel>
//                                         <Select
//                                             name={field.name}
//                                             value={sanction[field.name] || ""}
//                                             onChange={handleChange}
//                                             disabled={!isEditing}
//                                         >
//                                             {field.options.map((option) => (
//                                                 <MenuItem key={option} value={option}>
//                                                     {option}
//                                                 </MenuItem>
//                                             ))}
//                                         </Select>
//                                     </FormControl>
//                                 ) : (
//                                     <TextField
//                                         label={field.label}
//                                         name={field.name}
//                                         value={sanction[field.name] || ""}
//                                         fullWidth
//                                         onChange={handleChange}
//                                         InputProps={{ readOnly: !isEditing }}
//                                         sx={{
//                                             backgroundColor: isEditing ? "#fff" : "#ebeced",
//                                         }}
//                                     />
//                                 )}
//                             </Grid>
//                         ))}
//                     </Grid>
//                     <Box mt={3} sx={{ display: "flex", justifyContent: "center", mt: 2, gap: 2 }}>
//                         <Button variant="contained" color="warning" onClick={handleBack}>
//                             Back
//                         </Button>
//                         {isEditing ? (
//                             <Button variant="contained" color="primary" onClick={handleUpdate}>
//                                 Update
//                             </Button>
//                         ) : (
//                             <Button variant="contained" color="error" onClick={handleEdit}>
//                                 Edit
//                             </Button>
//                         )}
//                     </Box>
//                 </Paper>
//             ) : (
//                 <Typography sx={{ textAlign: "center", marginTop: 2 }}>Bank Repayment details not found</Typography>
//             )}
//         </Box>
//     );
// };

// export default Tranchemaker;
// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Box, Grid, Typography, TextField, CircularProgress, Paper, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
// import axios from "axios";

// const fieldConfig = [
//     { name: "tranche_id", label: "Tranche Id", type: "text" },
//     { name: "sanction_id", label: "Sanction ID", required: true, type: "select", options: [] },
//     { name: "tranche_date", label: "Tranche Date", type: "date" },
//     { name: "tranche_number", label: "Tranche Number", type: "number" },
//     { name: "tranche_amount", label: "Tranche Amount", type: "number" },
//     { name: "interest_type", label: "Interest Type", type: "select", options: ["Fixed", "Floating"] },
//     { name: "interest_rate", label: "Interest Rate", type: "number" },
//     { name: "tenure_months", label: "Tenure Months", type: "number" },
//     { name: "principal_start_date", label: "Principle start Date", type: "text" },
//     { name: "interest_start_date", label: "Interest Start Date", type: "date" },
//     { name: "principal_payment_frequency", label: "Principal Payment Frequency", type: "select", options: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"] },
//     { name: "interest_payment_frequency", label: "Interest Payment Frequency", type: "select", options: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"] },
//     { name: "applicable_of_leap_year", label: "Applicable for Leap Year", type: "select", options: ["Yes", "No"] },
//     { name: "interest_calculation_days", label: "Interest Calculation Days", type: "select", options: ["360", "365", "366"] },
//     { name: "remarks", label: "Remarks", type: "text" },
// ];

// const Tranchemaker = ({ isDropped }) => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { tranche_id, approval_status } = location.state || {};
//     const [sanction, setSanction] = useState(null);
//     const [sanctionAmount, setSanctionAmount] = useState(0); // Store the sanction amount
//     const [totalTrancheAmount, setTotalTrancheAmount] = useState(0); // Store total tranche amount
//     const [loading, setLoading] = useState(true);
//     const [isEditing, setIsEditing] = useState(false);
//     const [sanctionIds, setSanctionIds] = useState([]); // State for sanction ids
//     useEffect(() => {
//         const fetchSanctionIds = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5002/api/roc/sanctionid`);
//                 console.log("roc sanctionids: ", response)
//                 if (response.data?.data) {
//                     setSanctionIds(response.data.data.map((item) => item.sanction_id));
//                 } else {
//                     setSanctionIds([]); // Clear sanction ids if no data returned
//                 }
//             } catch (error) {
//                 console.error("Error fetching sanction IDs:", error);
//             }
//         };
//         fetchSanctionIds();
//     }, []);
//     useEffect(() => {
//         const fetchSanctionDetails = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:5002/api/tranche/details`, {
//                     params: { tranche_id, approval_status },
//                 });
//                 if (response.status === 200) {
//                     const fetchedSanction = response.data.tranche;
//                     setSanction(fetchedSanction);
//                     setSanctionAmount(fetchedSanction.tranche_amount); // Fetch sanction amount
//                 }
//             } catch (error) {
//                 console.error("Error fetching tranche details:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSanctionDetails();
//     }, [tranche_id]);

//     const handleEdit = () => {
//         setIsEditing(true);
//     };

//     const handleUpdate = async () => {
//         if (totalTrancheAmount > sanctionAmount) {
//             alert("Total tranche amount exceeds the sanction amount!");
//             return;
//         }

//         try {
//             const updatedTranche = {
//                 ...sanction,
//                 createdby: localStorage.getItem("token"),
//                 updatedby: localStorage.getItem("token"),
//             };
//             const response = await axios.patch(`http://localhost:5002/api/tranche/update/${sanction.tranche_id}`, updatedTranche);
//             if (response.status === 201) {
//                 alert("Tranche Details updated successfully");
//             } else {
//                 alert("Tranche Details updated failed.");
//             }
//             setIsEditing(false);
//         } catch (error) {
//             console.error("Error updating tranche details:", error);
//             alert("Failed to update tranche details");
//         }
//     };

//     const handleBack = () => {
//         navigate("/DataCreation/TrancheDetails");
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setSanction({ ...sanction, [name]: value });

//         if (name === "tranche_amount") {
//             const newTotal = totalTrancheAmount + parseFloat(value || 0);
//             setTotalTrancheAmount(newTotal);
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 gap: 2,
//                 margin: "auto",
//                 marginTop: "70px",
//                 marginLeft: isDropped ? "100px" : "280px",
//                 transition: "margin-left 0.3s ease-in-out",
//                 width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//                 padding: 3,
//                 border: "1px solid #ccc",
//                 borderRadius: 2,
//                 boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//             }}
//         >
//             <Typography
//                 sx={{
//                     color: "#0056b3",
//                     fontWeight: "600",
//                     fontSize: "20px",
//                     marginBottom: "20px",
//                     textAlign: "center",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     borderBottom: "2px solid #0056b3",
//                     paddingBottom: "10px",
//                 }}
//             >
//                 Tranche Details
//             </Typography>

//             {loading ? (
//                 <CircularProgress sx={{ display: "block", margin: "auto" }} />
//             ) : sanction ? (
//                 <Paper elevation={0} sx={{ padding: 3 }}>
//                     <Grid container spacing={2}>
//                         {fieldConfig.map((field) => (
//                             <Grid key={field.name} item xs={12} sm={6}>
//                                 {isEditing && field.type === "select" ? (
//                                     <TextField
//                                         select
//                                         label={field.label}
//                                         name={field.name}
//                                         value={sanction[field.name] || ""}
//                                         fullWidth
//                                         onChange={handleChange}
//                                     >
//                                         {(field.name === "sanction_id" ? sanctionIds : field.options).map((option) => (
//                                             <MenuItem key={option} value={option}>{option}</MenuItem>
//                                         ))}
//                                     </TextField>
//                                 ) : (
//                                     <TextField
//                                         label={field.label}
//                                         name={field.name}
//                                         value={sanction[field.name] || ""}
//                                         fullWidth
//                                         onChange={handleChange}
//                                         InputProps={{ readOnly: !isEditing }}
//                                         sx={{
//                                             backgroundColor: isEditing ? "#fff" : "#ebeced",
//                                         }}
//                                     />
//                                 )}
//                             </Grid>
//                         ))}
//                         {/* Add sanctionId dropdown */}
//                         {/* <Grid item xs={12} sm={6}>
//                             <FormControl fullWidth required>
//                                 <InputLabel>Sanction ID</InputLabel>
//                                 <Select
//                                     name="sanctionId"
//                                     value={sanction.sanctionId || ""}
//                                     onChange={handleChange}
//                                     disabled={!isEditing}
//                                 >
//                                     {sanctionIds.map((id) => (
//                                         <MenuItem key={id} value={id}>
//                                             {id}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Grid> */}
//                     </Grid>
//                     <Box mt={3} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
//                         <Button variant="contained" color="warning" onClick={handleBack}>
//                             Back
//                         </Button>
//                         {isEditing ? (
//                             <Button variant="contained" color="primary" onClick={handleUpdate}>
//                                 Update
//                             </Button>
//                         ) : (
//                             <Button variant="contained" color="error" onClick={handleEdit}>
//                                 Edit
//                             </Button>
//                         )}
//                     </Box>
//                 </Paper>
//             ) : (
//                 <Typography sx={{ textAlign: "center", marginTop: 2 }}>Bank Repayment details not found</Typography>
//             )}
//         </Box>
//     );

// };

// export default Tranchemaker;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Grid, Typography, TextField, CircularProgress, Paper, Button, MenuItem } from "@mui/material";
import axios from "axios";

const fieldConfig = [
    { name: "lender_code", label: "Lender Code", type: "text", readOnly: true },
    { name: "tranche_id", label: "Tranche Id", type: "text", readOnly: true },
    { name: "sanction_id", label: "Sanction ID", required: true, type: "select", options: [] },
    { name: "tranche_date", label: "Tranche Date", type: "date" },
    { name: "tranche_number", label: "Tranche Number", type: "number" },
    { name: "tranche_amount", label: "Tranche Amount", type: "number" },
    { name: "interest_type", label: "Interest Type", type: "select", options: ["Fixed", "Floating"] },
    { name: "interest_rate", label: "Interest Rate", type: "number" },
    { name: "tenure_months", label: "Tenure Months", type: "number" },
    { name: "principal_start_date", label: "Principle Start Date", type: "text" },
    { name: "interest_start_date", label: "Interest Start Date", type: "date" },
    { name: "principal_payment_frequency", label: "Principal Payment Frequency", type: "select", options: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"] },
    { name: "interest_payment_frequency", label: "Interest Payment Frequency", type: "select", options: ["Monthly", "Quarterly", "Half-Yearly", "Yearly"] },
    { name: "applicable_of_leap_year", label: "Applicable for Leap Year", type: "select", options: ["Yes", "No"] },
    { name: "interest_calculation_days", label: "Interest Calculation Days", type: "select", options: ["360", "365", "366"] },
    { name: "current_ac_no", label: "Current A/C No", required: true, type: "text" },
    { name: "conf_acc_no", label: "Confirm A/C No", required: true, type: "text" },
    { name: "bank_name", label: "Name of the Bank", required: true, type: "text" },
    { name: "bank_branch", label: "Bank Branch", required: true, type: "text" },
    { name: "location", label: "Location", required: true, type: "text" },
    { name: "ifsc_code", label: "IFSC Code", required: true, type: "text" },
];

const Tranchemaker = ({ isDropped }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const location = useLocation();
    const { lender_code, sanction_id, tranche_id, approval_status, updatedat } = location.state || {};
    const [sanction, setSanction] = useState(null);
    const [sanctionamount, setSanctionamount] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [sanctionIds, setSanctionIds] = useState([]);

    useEffect(() => {
        const fetchSanctionIds = async () => {
            try {
                const response = await axios.get(`${API_URL}/roc/sanctionid`);
                // console.log("sanction api: ", response)
                if (response.data?.data) {
                    setSanctionIds(response.data.data.map((item) => item.sanction_id));
                    const sanctionMap = {};
                    response.data.data.forEach((item) => {
                        sanctionMap[item.sanction_id] = item.sanction_amount;
                    });
                    setSanctionamount(sanctionMap);

                }
            } catch (error) {
                console.error("Error fetching sanction IDs:", error);
            }
        };
        fetchSanctionIds();
    }, [API_URL]);

    useEffect(() => {
        const fetchSanctionDetails = async () => {
            try {
                // console.log("tranche params: ", lender_code, sanction_id, tranche_id, approval_status, updatedat)
                const response = await axios.get(`${API_URL}/tranche/details`, {
                    params: { lender_code, sanction_id, tranche_id, approval_status, updatedat },
                });
                // console.log("response details trhache maker: ", response)
                if (response.status === 200) {
                    setSanction(response.data.tranche);
                }
            } catch (error) {
                console.error("Error fetching tranche details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSanctionDetails();
    }, [API_URL, tranche_id, approval_status, lender_code, sanction_id, updatedat]);

    const handleEdit = () => setIsEditing(true);

    const handleUpdate = async () => {
        try {
            const createdby = localStorage.getItem("token");
            const updatedby = localStorage.getItem("token");

            const updatedTranche = {
                ...sanction,
                createdby,
                updatedby,
            };
            if (updatedTranche.current_ac_no !== updatedTranche.conf_acc_no) {
                alert("Current A/C No and Confirm A/C No must match.");
                return;
            }
            // console.log("Sanction all id: ", sanctionamount)
            const maxAmount = sanctionamount?.[updatedTranche.sanction_id];
            // console.log("Validate Tranche Amount", updatedTranche.tranche_amount, "Sanction Amount", maxAmount)
            if (Number(updatedTranche.tranche_amount) > Number(maxAmount)) {
                alert("Tranche Amount should not exceed the Sanction Amount.");
                return;
            }

            // console.log("updated sending: ", updatedTranche);
            const response = await fetch(`${API_URL}/tranche/update/${sanction.tranche_id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedTranche),
            });
            // console.log("tranche update:", response)
            // alert(response.status === 201 ? "Tranche Details updated Sent to Approval!" : "Tranche updated Sent to Approval failed.");
            if (response.ok) {
                if (response.status === 201) {
                    alert("Tranche Details updated Sent to Approval!");
                } else {
                    // const errorResponse = await response.json();
                    alert("Tranche Details updated Sent to Approval Failed!");
                }
            } else {
                const errorResponse = await response.json();
                alert(errorResponse.message);
            }
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating tranche details:", error);
            alert("Failed to update tranche details");
        }
    };

    const handleBack = () => navigate("/DataCreation/TrancheDetails");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSanction({ ...sanction, [name]: value });
    };

    return (
        <Box sx={{ margin: "auto", marginTop: "70px", marginLeft: isDropped ? "100px" : "280px", transition: "margin-left 0.3s", padding: 3, border: "1px solid #ccc", borderRadius: 2, boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)" }}>
            <Typography sx={{ color: "#0056b3", fontWeight: "600", fontSize: "20px", marginBottom: "20px", textAlign: "center", borderBottom: "2px solid #0056b3", paddingBottom: "10px" }}>Tranche Details</Typography>

            {loading ? <CircularProgress sx={{ display: "block", margin: "auto" }} /> : sanction ? (
                <Paper elevation={0} sx={{ padding: 3 }}>
                    <Grid container spacing={2}>
                        {fieldConfig.map((field) => (
                            <Grid key={field.name} item xs={12} sm={6}>
                                {field.name === "sanction_id" ? (
                                    <TextField
                                        select
                                        label={field.label}
                                        name={field.name}
                                        value={sanction[field.name] || ""}
                                        fullWidth
                                        disabled // This makes it readonly
                                        sx={{ backgroundColor: "#ebeced" }}
                                    >
                                        {sanctionIds.map((option) => (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        ))}
                                    </TextField>
                                ) : (
                                    <TextField
                                        label={field.label}
                                        name={field.name}
                                        value={sanction[field.name] || ""}
                                        fullWidth
                                        onChange={handleChange}
                                        select={isEditing && field.type === "select"}
                                        InputProps={{ readOnly: field.readOnly || !isEditing }}
                                        sx={{
                                            cursor: "default",
                                            backgroundColor: sanction.updated_fields?.includes(field.name) ? "#fcec03" : "#ebeced",
                                            "& .MuiInputBase-root": {
                                                // pointerEvents: "none"
                                            }
                                        }}                                    >
                                        {isEditing && field.type === "select" && field.options.map((option) => (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                    <Box mt={3} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                        <Button variant="contained" color="warning" onClick={handleBack}>Back</Button>
                        {isEditing ? <Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>
                            :
                            <Button variant="contained" color="error" onClick={handleEdit}>Edit</Button>}
                    </Box>
                </Paper>
            ) : <Typography sx={{ textAlign: "center", marginTop: 2 }}>Tranche details not found</Typography>}
        </Box>
    );
};

export default Tranchemaker;
