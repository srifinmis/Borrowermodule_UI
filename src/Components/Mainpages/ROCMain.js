
// import React, { useState, useEffect } from "react";
// import { Table, Spin, message, Button, Input, Select, Tag } from "antd";
// import { Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

// const { Option } = Select;

// const RocFormMain = ({ isDropped }) => {
//   const [rocDetails, setRocDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState("");
//   const [filterStatus, setFilterStatus] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRocDetails = async () => {
//       setLoading(true);
//       const submissionMessage = localStorage.getItem("submissionMessage");
//       const messageType = localStorage.getItem("messageType");

//       if (submissionMessage) {
//         if (messageType === "success") {
//           toast.success(submissionMessage);
//         } else if (messageType === "error") {
//           toast.error(submissionMessage);
//         }
//         setTimeout(() => {
//           localStorage.removeItem("submissionMessage");
//           localStorage.removeItem("messageType");
//         }, 5000);
//       }

//       try {
//         const response = await axios.get("http://localhost:5002/api/roc/fetchAll");
//         console.log("roc main res: ",response)
//         if (response.data.success) {
//           const approvedRoc = response.data.mainData;
//           setRocDetails(approvedRoc);
//         } else {
//           message.error("Failed to fetch ROC details");
//         }
//       } catch (error) {
//         console.error("Error fetching ROC details:", error);
//         message.error("Error fetching ROC details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRocDetails();
//   }, []);

//   const handleViewDetails = (sanction_id, approval_status) => {
//     console.log("Both Roc: ", sanction_id, approval_status)
//     navigate(`/rocmaker/${sanction_id}`, {
//       state: { sanction_id, approval_status },
//     });
//   };

//   const handleAddNewRocForm = () => {
//     navigate("/addrocform");
//   };

//   const handleSearch = (e) => {
//     setSearchText(e.target.value.toLowerCase());
//   };

//   const handleFilterChange = async (value) => {
//     setFilterStatus(value);
//     setLoading(true);
//     try {
//       const response = await axios.get("http://localhost:5002/api/roc/fetchAll");
//       if (response.data.success) {
//         let filteredLenders = [];

//         if (value === "Approved") {
//           filteredLenders = response.data.mainData; // Only approved lenders
//         } else if (value) {
//           filteredLenders = response.data.data.filter(
//             (lender) => lender.approval_status === value
//           );
//         } else {
//           // Show all lenders (both approved and others)
//           filteredLenders = [...response.data.mainData, ...response.data.data];
//         }

//         setRocDetails(filteredLenders);
//       } else {
//         message.error("Failed to filter Roc");
//       }
//     } catch (error) {
//       console.error("Error filtering Roc:", error);
//       message.error("Error filtering Roc");
//     } finally {
//       setLoading(false);
//     }
//   };
//   const statusColors = {
//     Approved: "green",
//     "Approval Pending": "orange",
//     Rejected: "red",
//   };

//   const filteredLenders = rocDetails.filter((lender) =>
//     Object.values(lender).some((field) =>
//       field && field.toString().toLowerCase().includes(searchText)
//     )
//   );

//   // const displayedRocDetails =
//   //   filterStatus === "All"
//   //     ? filteredRocDetails
//   //     : filteredRocDetails.filter((roc) => roc.approval_status === filterStatus);

//   const columns = [
//     { title: "Sanction ID", dataIndex: "sanction_id" },
//     { title: "Approved By", dataIndex: "approved_by" },
//     { title: "Date of Approval", dataIndex: "date_of_approval" },
//     { title: "Document Executed Date", dataIndex: "document_executed_date" },
//     { title: "Due Date - Charge Creation", dataIndex: "due_date_charge_creation" },
//     {
//       title: "Approval Status",
//       dataIndex: "approval_status",
//       render: (status) => <Tag color={statusColors[status] || "blue"}>{status}</Tag>,
//     },
//     {
//       title: "Details",
//       dataIndex: "sanction_id",
//       render: (id, record) => (
//         <Button type="link" onClick={() => handleViewDetails(id, record.approval_status)}
//         >
//           View</Button>
//       ),
//     },
//   ];

//   return (
//     <Box
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         marginTop: "70px",
//         marginLeft: isDropped ? "100px" : "280px",
//         transition: "margin-left 0.3s ease-in-out",
//         width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//         padding: 3,
//       }}
//     >
//       <ToastContainer position="top-right" autoClose={5000} />
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2>ROC Form Details</h2>
//         <Input
//           placeholder="Search ROC details..."
//           value={searchText}
//           onChange={handleSearch}
//           style={{ width: "300px", height: "40px" }}
//         />
//         <Select
//           value={filterStatus}
//           onChange={handleFilterChange}
//           style={{ width: "200px", height: "40px", marginRight: "10px" }}
//         >
//           {/* <Option value="">All</Option> */}
//           <Option value="Approved">Approved</Option>
//           <Option value="Approval Pending">Pending</Option>
//           <Option value="Rejected">Rejected</Option>
//         </Select>
//         <Button type="primary" style={{ height: "40px" }} onClick={handleAddNewRocForm}>
//           Add New ROC Form
//         </Button>
//       </div>

//       {loading ? (
//         <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
//       ) : (
//         <Table
//           dataSource={filteredLenders}
//           columns={columns}
//           rowKey="sanction_id"
//           pagination={{ pageSize: 5 }}
//         />
//       )}
//     </Box>
//   );
// };

// export default RocFormMain;
import React, { useState, useEffect } from "react";
import { Table, Spin, message, Button, Input, Select, Tag } from "antd";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const { Option } = Select;

const RocFormMain = ({ isDropped }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [rocDetails, setRocDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("Approved");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRocDetails = async () => {
      setLoading(true);
      const submissionMessage = localStorage.getItem("submissionMessage");
      const messageType = localStorage.getItem("messageType");

      if (submissionMessage) {
        if (messageType === "success") {
          toast.success(submissionMessage);
        } else if (messageType === "error") {
          toast.error(submissionMessage);
        }
        setTimeout(() => {
          localStorage.removeItem("submissionMessage");
          localStorage.removeItem("messageType");
        }, 5000);
      }

      try {
        const response = await axios.get(`${API_URL}/roc/fetchAll`);
        // console.log("roc fetchAll: ", response)
        if (response.data.success) {
          setRocDetails(response.data.mainData);
        } else {
          message.error("Failed to fetch ROC details");
        }
      } catch (error) {
        console.error("Error fetching ROC details:", error);
        message.error("Error fetching ROC details");
      } finally {
        setLoading(false);
      }
    };
    fetchRocDetails();
  }, [API_URL]);

  const handleViewDetails = (sanction_id, lender_code, approval_status, updatedat) => {
    navigate(`/rocmaker/${sanction_id}`, {
      state: { sanction_id, lender_code, approval_status, updatedat },
    });
  };

  const handleAddNewRocForm = () => {
    navigate("/addrocform");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleFilterChange = async (value) => {
    setFilterStatus(value);
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/roc/fetchAll`);
      // console.log("roc fetch:", response)
      if (response.data.success) {
        let filteredRoc = [];
        if (value === "Approved") {
          filteredRoc = response.data.mainData;
        } else if (value) {
          filteredRoc = response.data.data.filter((roc) => roc.approval_status === value);
        }
        setRocDetails(filteredRoc);
      } else {
        message.error("Failed to filter ROC");
      }
    } catch (error) {
      console.error("Error filtering ROC:", error);
      message.error("Error filtering ROC");
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    Approved: "green",
    "Approval Pending": "orange",
    Rejected: "red",
  };

  const filteredRocDetails = rocDetails.filter((roc) =>
    Object.values(roc).some((field) =>
      field && field.toString().toLowerCase().includes(searchText)
    )).sort((a, b) => new Date(b.updatedat || b.createdat) - new Date(a.updatedat || a.createdat));


  const columns = [
    { title: "Lender Code", dataIndex: "lender_code" },
    { title: "Sanction ID", dataIndex: "sanction_id" },
    { title: "Approved By", dataIndex: "approved_by" },
    { title: "Date of Approval", dataIndex: "date_of_approval" },
    { title: "Document Executed Date", dataIndex: "document_executed_date" },
    { title: "Due Date - Charge Creation", dataIndex: "due_date_charge_creation" },
    {
      title: "Approval Status",
      dataIndex: "approval_status",
      render: (status) => <Tag color={statusColors[status] || "blue"}>{status}</Tag>,
    },
    {
      title: "Details",
      dataIndex: "sanction_id",
      render: (code, record) => (
        <Button type="link" onClick={() => handleViewDetails(code, record.lender_code, record.approval_status, record.updatedat)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: "70px",
        height: "300px",
        marginLeft: isDropped ? "100px" : "280px",
        transition: "margin-left 0.3s ease-in-out",
        width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
        padding: 3,
      }}>
      <ToastContainer position="top-right" autoClose={5000} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>ROC Form Details</h2>
        <Input
          placeholder="Search ROC details..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: "300px", height: "40px" }}
        />
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          style={{ width: "200px", height: "40px", marginRight: "10px" }}>
          <Option value="Approved">Approved</Option>
          <Option value="Approval Pending">Approval Pending</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
        <Button type="primary" style={{ height: "40px" }} onClick={handleAddNewRocForm}>
          Add New ROC Form
        </Button>
      </div>
      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div style={{ position: "relative" }}>
          <Table
            dataSource={filteredRocDetails}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 4 }}
          />
          {/* Total Records in bottom-left */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
            Total Records : {filteredRocDetails.length}
          </div>
        </div>
      )}
    </Box>
  );
};

export default RocFormMain;
