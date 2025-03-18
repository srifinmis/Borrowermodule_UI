// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Box } from "@mui/material";

// const Documentsupload = ({ isDropped }) => {
//   const { register, handleSubmit, reset } = useForm();
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const response = await axios.get("/api/sanction-documents");
//       setDocuments(response.data);
//     } catch (error) {
//       console.error("Error fetching documents", error);
//     }
//   };

//   const onSubmit = async (data) => {
//     const formData = new FormData();
//     formData.append("sanctionId", data.sanctionId);
//     formData.append("documentType", data.documentType);
//     formData.append("fileName", data.fileName);
//     formData.append("file", data.file[0]);
//     formData.append("uploadedDate", new Date().toISOString());

//     setLoading(true);
//     try {
//       await axios.post("/api/sanction-documents", formData);
//       fetchDocuments();
//       reset();
//     } catch (error) {
//       console.error("Error uploading file", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box     sx={{
//       display: "flex",
//       justifyContent: "center",
//       flexDirection: "column",
//       gap: 2,
//       width: "auto",
//       // maxWidth: "800px",
//       margin: "auto",
//       // marginLeft:"200px;"
//       marginTop: "70px",
//       marginLeft: isDropped ? "100px" : "280px",
//       transition: "margin-left 0.3s ease",
//       width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//       // marginLeft: `calc(${isDropped}px + 20px)`,
//       padding: 3,
//       border: "1px solid #ccc",
//       borderRadius: 2,
//       boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
//       transition: "margin-left 0.3s ease-in-out",
//     }}>
//       <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#1976d2" }}>
//         Documents repository
//       </Typography>

//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField label="Sanction ID" fullWidth margin="normal" {...register("sanctionId", { required: true })} />
        
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Document Type</InputLabel>
//           <Select {...register("documentType", { required: true })}>
//             <MenuItem value="Sanction Letter">Sanction Letter</MenuItem>
//             <MenuItem value="Agreement">Agreement</MenuItem>
//           </Select>
//         </FormControl>

//         <TextField label="File Name" fullWidth margin="normal" {...register("fileName", { required: true })} />
        
//         <Button variant="contained" component="label" fullWidth sx={{ mt: 2 }}>
//           Upload File
//           <input type="file" hidden {...register("file", { required: true })} />
//         </Button>

//         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
//           {loading ? "Uploading..." : "Upload"}
//         </Button>
//       </form>

//       <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>Uploaded Documents</Typography>
      
//       <Paper sx={{ mt: 2, overflow: "auto" }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Sanction ID</TableCell>
//               <TableCell>Document Type</TableCell>
//               <TableCell>File Name</TableCell>
//               <TableCell>Uploaded Date</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {documents.length > 0 ? (
//               documents.map((doc) => (
//                 <TableRow key={doc.id}>
//                   <TableCell>{doc.sanctionId}</TableCell>
//                   <TableCell>{doc.documentType}</TableCell>
//                   <TableCell sx={{width:"100px"}}>
//                     <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
//                       {doc.fileName}
//                     </a>
//                   </TableCell>
//                   <TableCell>{new Date(doc.uploadedDate).toLocaleDateString()}</TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No documents uploaded yet.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </Paper>
//     </Box>
//   );
// };

// export default Documentsupload;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography, Box } from "@mui/material";

const Documentsupload = ({ isDropped }) => {
  const { register, handleSubmit, reset } = useForm();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("/api/sanction-documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents", error);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("sanctionId", data.sanctionId);
    formData.append("documentType", data.documentType);
    formData.append("fileName", data.fileName);
    formData.append("file", data.file[0]);
    formData.append("uploadedDate", data.uploadedDate);

    setLoading(true);
    try {
      await axios.post("/api/sanction-documents", formData);
      fetchDocuments();
      reset();
    } catch (error) {
      console.error("Error uploading file", error);
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
      margin: "auto",
      marginTop: "70px",
      marginLeft: isDropped ? "100px" : "280px",
      transition: "margin-left 0.3s ease",
      width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
      padding: 3,
      border: "1px solid #ccc",
      borderRadius: 2,
      boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
    }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center", color: "#1976d2" }}>
        Documents Repository
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Sanction ID" fullWidth margin="normal" {...register("sanctionId", { required: true })} />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Document Type</InputLabel>
          <Select {...register("documentType", { required: true })}>
            <MenuItem value="Sanction Letter">Sanction Letter</MenuItem>
            <MenuItem value="Agreement">Agreement</MenuItem>
          </Select>
        </FormControl>

        <TextField label="File Name" fullWidth margin="normal" {...register("fileName", { required: true })} />
        
        <TextField 
          label="Uploaded Date" 
          type="date" 
          fullWidth 
          margin="normal" 
          InputLabelProps={{ shrink: true }}
          {...register("uploadedDate", { required: true })} 
        />

        <Button variant="contained" component="label"  sx={{ mt: 2, fontSize: "0.75rem", padding: "10px 10px" }}>
          Upload File
          <input type="file" hidden {...register("file", { required: true })} />
        </Button>

        <Button type="submit" variant="contained" color="primary"  sx={{ mt: 2, fontSize: "0.75rem", padding: "10px 20px",ml:"20px" }} disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>

      <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold" }}>Uploaded Documents</Typography>
      
      <Paper sx={{ mt: 2, overflow: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Sanction ID</TableCell>
              <TableCell>Document Type</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Uploaded Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.sanctionId}</TableCell>
                  <TableCell>{doc.documentType}</TableCell>
                  <TableCell>
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                      {doc.fileName}
                    </a>
                  </TableCell>
                  <TableCell>{new Date(doc.uploadedDate).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No documents uploaded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Documentsupload;
