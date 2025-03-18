// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Button, Spin, Card, message } from "antd";
// import axios from "axios";

// const LenderDetails = () => {
//   const { lender_code } = useParams(); // Get lender_code from URL
//   const [lender, setLender] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLenderDetails = async () => {
//       try {
//         const response = await axios.get(`/api/lender/details/${lender_code}`);
//         if (response.data.success) {
//           setLender(response.data.data);
//         } else {
//           message.error("Failed to fetch lender details");
//         }
//       } catch (error) {
//         console.error("Error fetching lender details:", error);
//         message.error("Error fetching lender details");
//       }
//       setLoading(false);
//     };

//     fetchLenderDetails();
//   }, [lender_code]);

//   if (loading) return <Spin tip="Loading lender details..." />;

//   return (
//     <div style={{ width: "60%", margin: "auto", marginTop: "50px" }}>
//       <Button onClick={() => navigate(-1)}>⬅ Back</Button>
//       <Card title={`Lender Details - ${lender.lender_name}`} style={{ marginTop: 20 }}>
//         <p><strong>Lender Code:</strong> {lender.lender_code}</p>
//         <p><strong>Name:</strong> {lender.lender_name}</p>
//         <p><strong>Type:</strong> {lender.lender_type}</p>
//         <p><strong>Email:</strong> {lender.lender_email_id_1}</p>
//         <p><strong>Contact:</strong> {lender.lender_contact_1}</p>
//         <p><strong>Address:</strong> {lender.lender_address_1}</p>
//         <p><strong>Status:</strong> {lender.status}</p>
//       </Card>
//     </div>
//   );
// };

// export default LenderDetails;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin, message } from "antd";
import axios from "axios";

const LenderDetails = ({ isDropped }) => {
  const { lender_code } = useParams();
  const [lender, setLender] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLenderDetails = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5002/api/lender/details/${lender_code}`);
        console.log("Lender_code data: ",response);
        console.log("status",response.status)
        if (response.status === 200) {
          console.log("sucess to fetch lender details",response.data[0])
          setLender(response.data[0]);
          console.log("data: ",response);
        } else {
          message.error("Failed to fetch lender details");
        }
      } catch (error) {
        console.error("Error fetching lender details:", error);
        message.error("Error fetching lender details");
      } finally {
        setLoading(false);
      }
    };

    fetchLenderDetails();
  }, [lender_code]);

  return (
    <div       style={{
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      gap: 2,
      width: "auto",
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
      <h2>Lender Details</h2>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : lender ? (
        <Card title={`Lender: ${lender.lender_name}`} bordered>
          <p><strong>Lender Code:</strong> {lender.lender_code}</p>
          <p><strong>Type:</strong> {lender.lender_type}</p>
          <p><strong>Address 1:</strong> {lender.lender_address_1}</p>
          <p><strong>Address 2:</strong> {lender.lender_address_2}</p>
          <p><strong>Address 3:</strong> {lender.lender_address_3}</p>
          <p><strong>Contact 1:</strong> {lender.lender_contact_1}</p>
          <p><strong>Contact 2:</strong> {lender.lender_contact_2}</p>
          <p><strong>Contact 3:</strong> {lender.lender_contact_3}</p>
          <p><strong>Email 1:</strong> {lender.lender_email_id_1}</p>
          <p><strong>Email 2:</strong> {lender.lender_email_id_2}</p>
          <p><strong>Email 3:</strong> {lender.lender_email_id_3}</p>
          <h3>SPOC (Single Point of Contact)</h3>
          <p><strong>Name:</strong> {lender.lender_spoc_name}</p>
          <p><strong>Contact:</strong> {lender.lender_spoc_contact}</p>
          <p><strong>Email:</strong> {lender.lender_spoc_email}</p>
          <h3>Escalation Contact</h3>
          <p><strong>Name:</strong> {lender.lender_escalation_name}</p>
          <p><strong>Contact:</strong> {lender.lender_escalation_contact}</p>
          <p><strong>Email:</strong> {lender.lender_escalation_email}</p>
          <h3>Other Details</h3>
          <p><strong>Status:</strong> {lender.status}</p>
          <p><strong>Created At:</strong> {new Date(lender.createdat).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(lender.updatedat).toLocaleString()}</p>
          <p><strong>Created By:</strong> {lender.createdby}</p>
          <p><strong>Updated By:</strong> {lender.updatedby}</p>
          <p><strong>Remarks:</strong> {lender.remarks || "N/A"}</p>
        </Card>
      ) : (
        <p style={{ textAlign: "center", marginTop: 20 }}>Lender details not found</p>
      )}
    </div>
  );
};

export default LenderDetails;
