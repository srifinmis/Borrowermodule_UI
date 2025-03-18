// import React, { useState } from "react";
// import {
//   TextField,
//   Button,
//   Grid,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const lenderTypes = ["Public Sector Bank", "Private Sector Bank", "Cooperative Bank", "NBFC"];
// const statusOptions = ["Active", "Inactive"];

// const LenderMaster = ({ isDropped }) => {
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     lender_code: "",
//     lender_name: "",
//     lender_type: "",
//     lender_address_1: "",
//     lender_address_2: "",
//     lender_address_3: "",
//     lender_contact_1: "",
//     lender_contact_2: "",
//     lender_contact_3: "",
//     lender_email_id_1: "",
//     lender_email_id_2: "",
//     lender_email_id_3: "",
//     lender_spoc_name: "",
//     lender_spoc_contact: "",
//     lender_spoc_email: "",
//     lender_escalation_name: "",
//     lender_escalation_contact: "",
//     lender_escalation_email: "",
//     status: ""
//   });
//   const API_URL = process.env.REACT_APP_API_URL;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSelectChange = (name) => (event) => {
//     setFormData({ ...formData, [name]: event.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   console.log("LenderMaster Form submitted Data: ", formData);
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation check: Ensure required fields are filled
//     const requiredFields = [
//       "lender_code",
//       "lender_name",
//       "lender_type",
//       "status",
//       "lender_address_1",
//       "lender_contact_1",
//       "lender_email_id_1",
//       "lender_spoc_name",
//       "lender_spoc_contact",
//       "lender_spoc_email",
//       "lender_escalation_name",
//       "lender_escalation_contact",
//       "lender_escalation_email"
//     ];

//     for (let field of requiredFields) {
//       if (!formData[field]?.trim()) {
//         setMessage(`Error: ${field.replace(/_/g, " ")} is required ⚠️`);
//         return;
//       }
//     }

//     try {
//       const response = await axios.post(`${API_URL}/Lenderadd`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ formData }),
//       });
//       const data = await response.json();
//       console.log('data is: ', data)
//       if (response.ok) {
//         // localStorage.setItem("isLoggedIn", "true");
//         // localStorage.setItem("loginSuccess", "true");
//         setMessage("Login successful ✅");
//         console.log('success logged response ok')
//         navigate("/Navbar");
//       } else {
//         // toast.error("Login failed! Please check your credentials.");
//         setMessage(data.message || "Login failed ❌");
//       }
//     } catch (error) {
//       // toast.error("Error connecting to the server");
//       setMessage("Error connecting to the server ⚠️");
//     }


//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//         gap: 2,
//         width: "auto",
//         // maxWidth: "800px",
//         margin: "auto",
//         // marginLeft:"200px;"
//         marginTop: "70px",
//         marginLeft: isDropped ? "100px" : "280px",
//         transition: "margin-left 0.3s ease",
//         width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//         // marginLeft: `calc(${isDropped}px + 20px)`,
//         padding: 3,
//         border: "1px solid #ccc",
//         borderRadius: 2,
//         boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
//         transition: "margin-left 0.3s ease-in-out",
//       }}
//     >
//       <Typography
//         sx={{
//           color: "#0056b3",
//           fontWeight: "600",
//           fontSize: "20px",
//           marginBottom: "20px",
//           textAlign: "center",
//           textTransform: "uppercase",
//           letterSpacing: "1px",
//           borderBottom: "2px solid #0056b3",
//           paddingBottom: "10px",
//         }}
//       >
//         Lender Master
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Lender Code" name="lender_code" value={formData.lender_code} onChange={handleChange} fullWidth inputProps={{ maxLength: 10 }} required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Lender Name" name="lender_name" value={formData.lender_name} onChange={handleChange} fullWidth inputProps={{ maxLength: 100 }} required />
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth required variant="outlined"> {/* Added variant */}
//               <InputLabel id="lender-type-label">Lender Type</InputLabel>
//               <Select
//                 labelId="lender-type-label"
//                 name="lender_type"
//                 value={formData.lender_type}
//                 onChange={handleSelectChange("lender_type")}
//                 label="Lender Type"
//               >
//                 {lenderTypes.map((type) => (
//                   <MenuItem key={type} value={type}>
//                     {type}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12} sm={6}>
//             <FormControl fullWidth required variant="outlined">
//               <InputLabel id="status-label">Status</InputLabel>
//               <Select
//                 labelId="status-label"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleSelectChange("status")}
//                 label="Status"
//               >
//                 {statusOptions.map((status) => (
//                   <MenuItem key={status} value={status}>
//                     {status}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12}>
//             <TextField label="Address Line 1" name="lenderAddress1" value={formData.lenderAddress1} onChange={handleChange} fullWidth required inputProps={{ maxLength: 255 }} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField label="Address Line 2" name="lenderAddress2" value={formData.lenderAddress2} onChange={handleChange} fullWidth inputProps={{ maxLength: 255 }} />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField label="Address Line 3" name="lenderAddress3" value={formData.lenderAddress3} onChange={handleChange} fullWidth inputProps={{ maxLength: 255 }} />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Contact 1" name="lenderContact1" value={formData.lenderContact1} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Contact 2" name="lenderContact2" value={formData.lenderContact2} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Contact 3" name="lenderContact3" value={formData.lenderContact3} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Lender Email 1" name="lenderEmail1" value={formData.lenderEmail1} onChange={handleChange} fullWidth required type="email" />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Lender Email 2" name="lenderEmail2" value={formData.lenderEmail2} onChange={handleChange} fullWidth required type="email" />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label="Lender Email 3" name="lenderEmail3" value={formData.lenderEmail3} onChange={handleChange} fullWidth required type="email" />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label=" Lender SPOC Name" name="lenderSPOCName" value={formData.lenderSPOCName} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label=" Lender SPOC Contact" name="lenderSPOCContact" value={formData.lenderSPOCContact} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label=" Lender SPOC Email" name="lenderSPOCEmail" value={formData.lenderSPOCEmail} onChange={handleChange} fullWidth required type="email" />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label=" Lender EscalationName" name="lenderEscalationName" value={formData.lenderEscalationName} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label=" Lender EscalationContact" name="lenderEscalationContact" value={formData.lenderEscalationContact} onChange={handleChange} fullWidth required />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField label=" Lender EscalationEmail" name="lenderEscalationEmail" value={formData.lenderEscalationEmail} onChange={handleChange} fullWidth required />
//           </Grid>
//         </Grid>
//       </form>
//       <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
//         <Button variant="contained" color="secondary" type="reset">Cancel</Button>
//         <Button variant="contained" color="primary" type="submit">Save</Button>
//       </Box>
//     </Box>
//   );
// };

// export default LenderMaster;



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
import axios from "axios";
import { useNavigate } from "react-router-dom";

const lenderTypes = ["Public Sector Bank", "Private Sector Bank", "Cooperative Bank", "NBFC"];
const statusOptions = ["Active", "Inactive"];

const fieldConfig = [
  { name: "lender_code", label: "Lender Code", required: true, type: "text", maxLength: 10 },
  { name: "lender_name", label: "Lender Name", required: true, type: "text", maxLength: 100 },
  { name: "lender_address_1", label: "Address Line 1", required: true, type: "text" },
  { name: "lender_address_2", label: "Address Line 2", required: false, type: "text" },
  { name: "lender_address_3", label: "Address Line 3", required: false, type: "text" },
  { name: "lender_contact_1", label: "Contact 1", required: true, type: "text" },
  { name: "lender_contact_2", label: "Contact 2", required: false, type: "text" },
  { name: "lender_contact_3", label: "Contact 3", required: false, type: "text" },
  { name: "lender_email_id_1", label: "Lender Email 1", required: true, type: "email" },
  { name: "lender_email_id_2", label: "Lender Email 2", required: false, type: "email" },
  { name: "lender_email_id_3", label: "Lender Email 3", required: false, type: "email" },
  { name: "lender_spoc_name", label: "SPOC Name", required: true, type: "text" },
  { name: "lender_spoc_contact", label: "SPOC Contact", required: true, type: "text" },
  { name: "lender_spoc_email", label: "SPOC Email", required: true, type: "email" },
  { name: "lender_escalation_name", label: "Escalation Name", required: true, type: "text" },
  { name: "lender_escalation_contact", label: "Escalation Contact", required: true, type: "text" },
  { name: "lender_escalation_email", label: "Escalation Email", required: true, type: "email" },
];

const LenderMaster = ({ isDropped }) => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState(
    fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {
      lender_type: "",
      status: "",
    })
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: Ensure all required fields are filled
    for (let field of fieldConfig) {
      if (field.required && !formData[field.name]?.trim()) {
        setMessage(`Error: ${field.label} is required ⚠️`);
        return;
      }
    }
    if (!formData.lender_type) {
      setMessage("Error: Lender Type is required ⚠️");
      return;
    }
    if (!formData.status) {
      setMessage("Error: Status is required ...⚠️");
      return;
    }

    console.log("Form Data:  ", formData);

    try {
      const response = await fetch("http://localhost:5002/api/Lenderadd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log("Response Data sent: ", data);
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server responded with error:", errorData);
        throw new Error(`Server Error: ${response.status}`);
      }

      setMessage("Lender added successfully ✅");
      console.log("Response Data sent to api: ", response);
      // Reset form data after successful submission
      setFormData(
        fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {
          lender_type: "",
          status: "",
        })
      );

      // navigate("/Navbar"); // If you want to navigate, otherwise remove this line

    } catch (error) {
      setMessage("Error connecting to the server ⚠️");
      console.log("Error: connecting to the server ⚠️");
    }
  };


  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 2,
        width: "auto",
        margin: "auto",
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
          marginBottom: "20px",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "1px",
          borderBottom: "2px solid #0056b3",
          paddingBottom: "10px",
        }}
      >
        Lender Master
      </Typography>
      {message && (
        <Typography color="error" sx={{ textAlign: "center", fontWeight: "bold" }}>
          {message}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {fieldConfig.map((field) => (
            <Grid key={field.name} item xs={12} sm={6}>
              <TextField
                label={field.label}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                fullWidth
                required={field.required}
                type={field.type}
                inputProps={{ maxLength: field.maxLength }}
              />
            </Grid>
          ))}

          {/* Lender Type Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Lender Type</InputLabel>
              <Select name="lender_type" value={formData.lender_type} onChange={handleSelectChange("lender_type")}>
                {lenderTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Status Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Status</InputLabel>
              <Select name="status" value={formData.status} onChange={handleSelectChange("status")}>
                {statusOptions.map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 2 }}>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            onClick={() => setFormData(fieldConfig.reduce((acc, field) => ({ ...acc, [field.name]: "" }), { lender_type: "", status: "" }))}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Save
          </Button>
        </Box>
      </form>



    </Box>
  );
};

export default LenderMaster;
