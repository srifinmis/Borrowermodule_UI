// import React, { useState, useEffect, useMemo } from "react";
// import {
//     TextField,
//     Button,
//     Grid,
//     Box,
//     MenuItem,
//     Typography,
//     CircularProgress, // You were using this in the previous version, so I've kept it
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const UTRForm = ({ isDropped }) => {
//     const navigate = useNavigate();
//     const [lenderCodes, setLenderCodes] = useState([]);
//     const [sanctionData, setSanctionData] = useState([]);
//     const [trancheData, setTrancheData] = useState([]);
//     const [interestData, setInterestData] = useState([]); // Corrected typo
//     const [errors, setErrors] = useState({});
//     const [formData, setFormData] = useState({});
//     const [fileUrl, setFileUrl] = useState("");
//     const API_URL = process.env.REACT_APP_API_URL;
//     const [selectedFile, setSelectedFile] = useState([]); // For single file upload
//     const [isUploading, setIsUploading] = useState(false);

//     const fieldConfig = useMemo(() => [
//         { name: "lender_code", label: "Lender Code/Lender Name", required: true, type: "dropdown" }, // Removed options here
//         {
//             name: "sanction_id", label: "Sanction ID", required: true, type: "dropdown",
//         },
//         {
//             name: "tranche_id", label: "Tranche ID", required: true, type: "dropdown",
//         },
//         { name: "utr_no", label: "UTR NO.", required: true, type: "number" },
//         { name: "payment_date", label: "Payment Date", required: true, type: "date" },
//         { name: "due_date", label: "Actual Due-Date", required: true, type: "date" },
//         { name: "payment_amount", label: "Payment Amount", required: true, type: "number" },
//         // { name: "updatedby", label: "Updated By", required: true, type: "text", minLength: 6, maxLength: 100 },
//         // { name: "updatedat", label: "Updated Date", required: true, type: "date" },
//     ], []);
//     useEffect(() => {
//         const initialFormData = {};
//         fieldConfig.forEach((field) => {
//             initialFormData[field.name] = "";
//         });
//         setFormData(initialFormData);
//     }, [fieldConfig]);

//     useEffect(() => {
//         const fetchLenders = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/sanction/lendercodes`);
//                 if (response.data?.data) {
//                     setLenderCodes(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching lenders:", error);
//             }
//         };

//         const fetchSanctions = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/roc/sanctionid`);
//                 if (response.data?.data && Array.isArray(response.data.data)) {
//                     setSanctionData(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching sanction IDs:", error);
//             }
//         };

//         const fetchTranche = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/tranche/findTwo`);
//                 if (response.data?.data && Array.isArray(response.data.data)) {
//                     setTrancheData(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching tranche data:", error);
//             }
//         };
//         const fetchinterest = async () => {
//             try {
//                 const response = await axios.get(`${API_URL}/interest/findthree`);
//                 if (response.data?.data && Array.isArray(response.data.data)) {
//                     setInterestData(response.data.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching interest data:", error);
//             }
//         };

//         fetchLenders();
//         fetchSanctions();
//         fetchTranche();
//         fetchinterest();
//     }, [API_URL]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         let newFormData = { ...formData, [name]: value };
//         let newErrors = { ...errors };

//         if (name === "lender_code") {
//             newFormData.sanction_id = "";
//             newFormData.tranche_id = "";
//             newErrors.tranche_id = "";
//         }

//         if (name === "sanction_id") {
//             newFormData.tranche_id = "";
//             newErrors.tranche_id = "";
//         }

//         if (name === "tranche_id") {
//             const exists = interestData.some(
//                 (item) =>
//                     item.lender_code === newFormData.lender_code &&
//                     item.sanction_id === newFormData.sanction_id &&
//                     item.tranche_id === value
//             );
//             newErrors.tranche_id = exists ? "Tranche ID already exists for this Lender Code & Sanction ID!" : "";
//         }

//         setFormData(newFormData);
//         setErrors(newErrors);
//     };

//     const validateForm = () => {
//         const newErrors = {};
//         const validateField = (field) => {
//             const value = formData[field.name];
//             if (field.required && (!value || value.toString().trim() === "")) {
//                 newErrors[field.name] = `${field.label} is required`;
//                 return;
//             }
//             if (value && field.type === "number" && !/^\d+(\.\d+)?$/.test(value)) {
//                 newErrors[field.name] = `${field.label} must be 0 or positive number`;
//             }
//             if (value && field.minLength && value.length < field.minLength) {
//                 newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
//             }
//             if (value && field.maxLength && value.length > field.maxLength) {
//                 newErrors[field.name] = `${field.label} must be less than ${field.maxLength} characters`;
//             }
//             if (value && field.length && value.length !== field.length) {
//                 newErrors[field.name] = `${field.label} must be exactly ${field.length} digits`;
//             }
//         };
//         fieldConfig.forEach(validateField);
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         if (!fileUrl) {
//             alert("Please upload a file first before saving!");
//             return;
//         }

//         const createdby = localStorage.getItem("token");
//         const finalFormData = {
//             ...formData,
//             createdby,
//         };
//         try {
//             const response = await fetch(`${API_URL}/interest/create`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(finalFormData),
//             });
//             if (!response.ok) throw new Error(`Server Error: ${response.status}`);
//             localStorage.setItem("submissionMessage", "Interest Rate Change Sent for Approval!");
//             localStorage.setItem("messageType", "success");
//             navigate("/DataCreation/InterestRate");
//         } catch (error) {
//             console.error("Error submitting interest rate change:", error);
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
//         if (!allowedTypes.includes(file.type)) {
//             alert("Only PDF and Image files (PNG, JPG, JPEG) are allowed!");
//             return;
//         }

//         setSelectedFile(file);
//     };

//     const handleResetFiles = () => {
//         setSelectedFile([]);
//     };

//     // const handleUpload = async () => {
//     //     if (!selectedFile || selectedFile.length === 0) {
//     //         alert("Please select file(s) to upload!");
//     //         return;
//     //     }

//     //     setIsUploading(true);
//     //     const uploadFormData = new FormData();
//     //     uploadFormData.append("file", selectedFile);

//     //     try {
//     //         const response = await axios.post(`${API_URL}/UTR-upload-local`, uploadFormData, {
//     //             headers: {
//     //                 "Content-Type": "multipart/form-data",
//     //             },
//     //         });

//     //         if (response.status === 200 && response.data.filePath) {
//     //             setFileUrl(response.data.filePath);
//     //             alert("File uploaded successfully!");
//     //         } else {
//     //             alert("Upload failed. Please try again.");
//     //         }

//     //     } catch (error) {
//     //         console.error("Error uploading file(s):", error);
//     //         alert("Error uploading file(s).");
//     //     } finally {
//     //         setIsUploading(false);
//     //     }
//     // };
//     const handleUpload = async () => {
//         if (!selectedFile) {
//             alert("Please select a file before uploading!");
//             return;
//         }

//         const formData = new FormData();
//         formData.append("file", selectedFile);

//         setIsUploading(true);

//         try {
//             const response = await axios.post(`${API_URL}/UTR-upload-local`, formData);
//             if (response.status === 200 && response.data.filePath) {
//                 setFileUrl(response.data.filePath);
//                 alert("File uploaded successfully!");
//             } else {
//                 alert("Upload failed. Please try again.");
//             }
//         } catch (error) {
//             console.error("Upload error:", error);
//             alert("Error uploading file. Please check the server.");
//         } finally {
//             setIsUploading(false);
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 gap: 2,
//                 marginTop: "70px",
//                 marginLeft: isDropped ? "100px" : "280px",
//                 transition: "margin-left 0.3s ease",
//                 width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//                 padding: 3,
//                 border: "3px solid #ccc",
//                 borderRadius: 2,
//                 // boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
//             }}
//         >
//             <Typography
//                 sx={{
//                     color: "#0056b3",
//                     fontWeight: "600",
//                     fontSize: "20px",
//                     textAlign: "center",
//                     textTransform: "uppercase",
//                     borderBottom: "2px solid #0056b3",
//                     paddingBottom: "10px",
//                     mb: 3,
//                 }}
//             >
//                 UTR upload
//             </Typography>

//             <form onSubmit={handleSubmit}>
//                 <Grid container spacing={2}>
//                     {fieldConfig.map((field) => (
//                         <Grid item xs={12} sm={6} key={field.name}>
//                             {field.type === "dropdown" ? (
//                                 <TextField
//                                     select
//                                     label={field.label}
//                                     name={field.name}
//                                     value={formData[field.name] || ""}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     required={field.required}
//                                     error={!!errors[field.name]}
//                                     helperText={errors[field.name]}
//                                 >
//                                     {field.name === "lender_code" &&
//                                         lenderCodes.map((lender) => (
//                                             <MenuItem key={lender.lender_code} value={lender.lender_code}>
//                                                 {`${lender.lender_code} - ${lender.lender_name || lender.lender_code}`}
//                                             </MenuItem>
//                                         ))}

//                                     {field.name === "sanction_id" &&
//                                         sanctionData
//                                             .filter((sanction) => sanction.lender_code === formData.lender_code)
//                                             .map((sanction) => (
//                                                 <MenuItem key={sanction.sanction_id} value={sanction.sanction_id}>
//                                                     {sanction.sanction_id}
//                                                 </MenuItem>
//                                             ))}

//                                     {field.name === "tranche_id" &&
//                                         trancheData
//                                             .filter((tranche) => tranche.sanction_id === formData.sanction_id)
//                                             .map((tranche) => (
//                                                 <MenuItem key={tranche.tranche_id} value={tranche.tranche_id}>
//                                                     {tranche.tranche_id}
//                                                 </MenuItem>
//                                             ))}
//                                 </TextField>
//                             ) : (
//                                 <TextField
//                                     type={field.type}
//                                     label={field.label}
//                                     name={field.name}
//                                     value={formData[field.name] || ""}
//                                     onChange={handleChange}
//                                     fullWidth
//                                     required={field.required}
//                                     inputProps={field.maxLength ? { maxLength: field.maxLength } : {}}
//                                     error={!!errors[field.name]}
//                                     helperText={errors[field.name]}
//                                     InputLabelProps={field.type === "date" ? { shrink: true } : {}}
//                                 />
//                             )}
//                         </Grid>
//                     ))}
//                     <Grid container spacing={2} marginTop={1} alignItems="center">
//                         <Grid item>
//                             <Button variant="contained" component="label">
//                                 Choose Files
//                                 <input type="file" hidden onChange={handleFileChange} multiple />
//                             </Button>
//                         </Grid>


//                         <Grid item>
//                             {selectedFile.length > 0 && (
//                                 <Typography variant="body2" sx={{ textAlign: "left" }}>
//                                     Selected Files: {selectedFile.map(file => file.name).join(', ')}
//                                 </Typography>
//                             )}
//                         </Grid> 

//                         <Grid item>
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 onClick={handleUpload}
//                                 disabled={isUploading || selectedFile.length === 0}
//                             >
//                                 {isUploading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Upload Files"}
//                             </Button>
//                         </Grid>
//                         <Grid item>
//                             <Button
//                                 variant="outlined"
//                                 color="secondary"
//                                 onClick={handleResetFiles}
//                                 disabled={selectedFile.length === 0}
//                             >
//                                 Reset Files
//                             </Button>
//                         </Grid>
//                     </Grid>


//                     <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//                         <Button variant="contained" color="primary" type="submit">
//                             Save
//                         </Button>
//                     </Box>
//                 </Grid>

//             </form>
//         </Box >
//     );
// };

// export default UTRForm;

import React, { useState, useEffect, useMemo } from "react";
import {
    TextField,
    Button,
    Grid,
    Box,
    MenuItem,
    Typography,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UTRForm = ({ isDropped }) => {
    const navigate = useNavigate();
    const [lenderCodes, setLenderCodes] = useState([]);
    const [sanctionData, setSanctionData] = useState([]);
    const [trancheData, setTrancheData] = useState([]);
    const [interestData, setInterestData] = useState([]);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [fileUrls, setFileUrls] = useState([]);
    const API_URL = process.env.REACT_APP_API_URL;
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const fieldConfig = useMemo(() => [
        { name: "lender_code", label: "Lender Code/Lender Name", required: true, type: "dropdown" },
        {
            name: "sanction_id", label: "Sanction ID", required: true, type: "dropdown",
        },
        {
            name: "tranche_id", label: "Tranche ID", required: true, type: "dropdown",
        },
        { name: "utr_no", label: "UTR NO.", required: true, type: "number" },
        { name: "payment_date", label: "Payment Date", required: true, type: "date" },
        { name: "due_date", label: "Actual Due-Date", required: true, type: "date" },
        { name: "payment_amount", label: "Payment Amount", required: true, type: "number" },
    ], []);

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
                if (response.data?.data && Array.isArray(response.data.data)) {
                    setTrancheData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching tranche data:", error);
            }
        };
        const fetchinterest = async () => {
            try {
                const response = await axios.get(`${API_URL}/interest/findthree`);
                if (response.data?.data && Array.isArray(response.data.data)) {
                    setInterestData(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching interest data:", error);
            }
        };

        fetchLenders();
        fetchSanctions();
        fetchTranche();
        fetchinterest();
    }, [API_URL]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newFormData = { ...formData, [name]: value };
        let newErrors = { ...errors };

        if (name === "lender_code") {
            newFormData.sanction_id = "";
            newFormData.tranche_id = "";
            newErrors.tranche_id = "";
        }

        if (name === "sanction_id") {
            newFormData.tranche_id = "";
            newErrors.tranche_id = "";
        }

        if (name === "tranche_id") {
            const exists = interestData.some(
                (item) =>
                    item.lender_code === newFormData.lender_code &&
                    item.sanction_id === newFormData.sanction_id &&
                    item.tranche_id === value
            );
            newErrors.tranche_id = exists ? "Tranche ID already exists for this Lender Code & Sanction ID!" : "";
        }

        setFormData(newFormData);
        setErrors(newErrors);
    };

    const validateForm = () => {
        const newErrors = {};
        const validateField = (field) => {
            const value = formData[field.name];
            if (field.required && (!value || value.toString().trim() === "")) {
                newErrors[field.name] = `${field.label} is required`;
                return;
            }
            if (value && field.type === "number" && !/^\d+(\.\d+)?$/.test(value)) {
                newErrors[field.name] = `${field.label} must be 0 or positive number`;
            }
            if (value && field.minLength && value.length < field.minLength) {
                newErrors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
            }
            if (value && field.maxLength && value.length > field.maxLength) {
                newErrors[field.name] = `${field.label} must be less than ${field.maxLength} characters`;
            }
            if (value && field.length && value.length !== field.length) {
                newErrors[field.name] = `${field.label} must be exactly ${field.length} digits`;
            }
        };
        fieldConfig.forEach(validateField);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (fileUrls.length === 0) {
            alert("Please upload files before saving!");
            return;
        }

        const createdby = localStorage.getItem("token");
        const finalFormData = {
            ...formData,
            createdby,
            payment_upload_url: fileUrls,
        };
        try {
            const response = await fetch(`${API_URL}/interest/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(finalFormData),
            });
            if (!response.ok) throw new Error(`Server Error: ${response.status}`);
            localStorage.setItem("submissionMessage", "Interest Rate Change Sent for Approval!");
            localStorage.setItem("messageType", "success");
            navigate("/DataCreation/InterestRate");
        } catch (error) {
            console.error("Error submitting interest rate change:", error);
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const allowedTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg"];
        const validFiles = [];
        const invalidFiles = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (allowedTypes.includes(file.type)) {
                validFiles.push(file);
            } else {
                invalidFiles.push(file.name);
            }
        }

        if (invalidFiles.length > 0) {
            alert(`The following files are not allowed: ${invalidFiles.join(", ")}\nOnly PDF and Image files (PNG, JPG, JPEG) are allowed!`);
        }
        //  Fix: Keep previously selected files
        setSelectedFiles((prevSelectedFiles) => [...prevSelectedFiles, ...validFiles]);
    };


    const handleUpload = async () => {
        if (!selectedFiles || selectedFiles.length === 0) {
            alert("Please select files before uploading!");
            return;
        }

        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append("files", file);
        });

        setIsUploading(true);
        try {
            const response = await axios.post(`${API_URL}/UTR-upload-local`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            if (response.status === 200 && response.data.filePaths && Array.isArray(response.data.filePaths)) {
                setFileUrls(response.data.filePaths);
                alert("Files uploaded successfully!");
            } else {
                alert("Upload failed. Please try again.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Error uploading files. Please check the server.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleResetFiles = () => {
        setSelectedFiles([]);
        setFileUrls([]);
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
                border: "3px solid #ccc",
                borderRadius: 2,
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
                UTR upload
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {fieldConfig.map((field) => (
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
                                        lenderCodes.map((lender) => (
                                            <MenuItem key={lender.lender_code} value={lender.lender_code}>
                                                {`${lender.lender_code} - ${lender.lender_name || lender.lender_code}`}
                                            </MenuItem>
                                        ))}

                                    {field.name === "sanction_id" &&
                                        sanctionData
                                            .filter((sanction) => sanction.lender_code === formData.lender_code)
                                            .map((sanction) => (
                                                <MenuItem key={sanction.sanction_id} value={sanction.sanction_id}>
                                                    {sanction.sanction_id}
                                                </MenuItem>
                                            ))}

                                    {field.name === "tranche_id" &&
                                        trancheData
                                            .filter((tranche) => tranche.sanction_id === formData.sanction_id)
                                            .map((tranche) => (
                                                <MenuItem key={tranche.tranche_id} value={tranche.tranche_id}>
                                                    {tranche.tranche_id}
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
                    ))}
                    <Grid container spacing={2} marginTop={1} alignItems="center">
                        <Grid item>
                            <Button variant="contained" component="label">
                                Choose Files
                                <input type="file" hidden onChange={handleFileChange} multiple />
                            </Button>
                        </Grid>

                        <Grid item>
                            {selectedFiles.length > 0 && (
                                <Typography variant="body2" sx={{ textAlign: "left" }}>
                                    Selected Files: {selectedFiles.map(file => file.name).join(', ')}
                                </Typography>
                            )}
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleUpload}
                                disabled={isUploading || selectedFiles.length === 0}
                            >
                                {isUploading ? <CircularProgress size={20} sx={{ color: "#fff" }} /> : "Upload Files"}
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleResetFiles}
                                disabled={selectedFiles.length === 0}
                            >
                                Reset Files
                            </Button>
                        </Grid>
                    </Grid>
                    {/* {fileUrls.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="body2">
                                Uploaded Files:
                                {fileUrls.map((url, index) => (
                                    <div key={index}>
                                        <a href={url} target="_blank" rel="noopener noreferrer">
                                            {url.split('/').pop()}
                                        </a>
                                    </div>
                                ))}
                            </Typography>
                        </Grid>
                    )} */}

                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                    </Box>
                </Grid>

            </form>
        </Box >
    );
};

export default UTRForm;

