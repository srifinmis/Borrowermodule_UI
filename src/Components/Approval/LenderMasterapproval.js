// import React, { useState } from "react";
// import { Table, Checkbox, Button, Input, message } from "antd";

// const LenderMasterApproval = () => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [remarks, setRemarks] = useState("");
//   const [isDropped, setIsDropped] = useState(false);
//   const [lenders, setLenders] = useState([
//     { id: 1, code: "L001", name: "ABC Bank", type: "Private", status: "Pending", email: "abc@bank.com" },
//     { id: 2, code: "L002", name: "XYZ Finance", type: "NBFC", status: "Pending", email: "xyz@finance.com" },
//     { id: 3, code: "L003", name: "PQR Loans", type: "Public", status: "Approved", email: "pqr@loans.com" }
//   ]);

//   const handleSelect = (id) => {
//     setSelectedRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     setSelectedRows(e.target.checked ? lenders.map(lender => lender.id) : []);
//   };

//   const handleReject = () => {
//     if (!remarks.trim()) {
//       message.error("Remarks are required to reject a lender.");
//       return;
//     }
//     const updatedLenders = lenders.filter(lender => !selectedRows.includes(lender.id));
//     setLenders(updatedLenders);
//     setSelectedRows([]);
//     setRemarks("");
//     message.success("Selected lenders have been rejected.");
//   };

//   const handleApprove = () => {
//     console.log("Approved Lenders:", selectedRows);
//   };

//   const columns = [
//     {
//       title: <Checkbox onChange={handleSelectAll} checked={selectedRows.length === lenders.length} />, 
//       dataIndex: "id",
//       render: (id) => <Checkbox checked={selectedRows.includes(id)} onChange={() => handleSelect(id)} />
//     },
//     { title: "Lender Code", dataIndex: "code" },
//     { title: "Lender Name", dataIndex: "name" },
//     { title: "Lender Type", dataIndex: "type" },
//     { title: "Status", dataIndex: "status" },
//     { title: "Lender Email", dataIndex: "email" },
//     {
//       title: "Details",
//       dataIndex: "id",
//       render: (id) => <Button type="link" onClick={() => console.log("View Details for", id)}>View</Button>
//     }
//   ];

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//         gap: 2,
//         width: "auto",
//         margin: "auto",
//         marginTop: "70px",
//         marginLeft: isDropped ? "100px" : "280px",
//         transition: "margin-left 0.3s ease-in-out",
//         width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//         padding: 3,
//         border: "1px solid #ccc",
//         borderRadius: 2,
//         boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//       }}
//     >
//       <h2>Lender Master Approval</h2>
//       <Table dataSource={lenders} columns={columns} rowKey="id" pagination={false} />

//       <div style={{ marginTop: 20 }}>
//         <Input.TextArea 
//           placeholder="Enter remarks..." 
//           value={remarks} 
//           onChange={(e) => setRemarks(e.target.value)}
//           rows={3}
//         />
//       </div>

//       <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10 }}>
//         <Button type="primary" onClick={handleApprove} disabled={selectedRows.length === 0}>Approve</Button>
//         {/* <Button type="danger" onClick={handleReject} disabled={selectedRows.length === 0}>Reject</Button> */}
//         <Button type="danger" onClick={handleReject} disabled={selectedRows.length === 0 || !remarks.trim()}>
//   Reject
// </Button>

//       </div>
//     </div>
//   );
// };

// export default LenderMasterApproval;

// import React, { useState } from "react";
// import { Table, Checkbox, Button, Input } from "antd";

// const LenderMasterApproval = () => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [remarks, setRemarks] = useState("");
//   const [isDropped, setIsDropped] = useState();

//   const lenders = [
//     { id: 1, code: "L001", name: "ABC Bank", type: "Private", status: "Pending", email: "abc@bank.com" },
//     { id: 2, code: "L002", name: "XYZ Finance", type: "NBFC", status: "Pending", email: "xyz@finance.com" },
//     { id: 3, code: "L003", name: "PQR Loans", type: "Public", status: "Approved", email: "pqr@loans.com" }
//   ];

//   const handleSelect = (id) => {
//     setSelectedRows(prev =>
//       prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSelectAll = (e) => {
//     setSelectedRows(e.target.checked ? lenders.map(lender => lender.id) : []);
//   };

//   const handleAction = (action) => {
//     console.log("Action:", action, "Selected Lenders:", selectedRows, "Remarks:", remarks);
//   };

//   const columns = [
//     {
//       title: <Checkbox onChange={handleSelectAll} checked={selectedRows.length === lenders.length} />, 
//       dataIndex: "id",
//       render: (id) => <Checkbox checked={selectedRows.includes(id)} onChange={() => handleSelect(id)} />
//     },
//     { title: "Lender Code", dataIndex: "code" },
//     { title: "Lender Name", dataIndex: "name" },
//     { title: "Lender Type", dataIndex: "type" },
//     { title: "Status", dataIndex: "status" },
//     { title: "Lender Email", dataIndex: "email" },
//     {
//       title: "Details",
//       dataIndex: "id",
//       render: (id) => <Button type="link" onClick={() => console.log("View Details for", id)}>View</Button>
//     }
//   ];

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//         gap: 2,
//         width: "auto",
//         margin: "auto",
//         marginTop: "70px",
//         marginLeft: isDropped ? "100px" : "280px",
//         transition: "margin-left 0.3s ease-in-out",
//         width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//         padding: 3,
//         border: "1px solid #ccc",
//         borderRadius: 2,
//         boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//       }}
//     >
//       <h2>Lender Master Approval</h2>
//       <Table dataSource={lenders} columns={columns} rowKey="id" pagination={false} />

//       <div style={{ marginTop: 20 }}>
//         <Input.TextArea 
//           placeholder="Enter remarks..." 
//           value={remarks} 
//           onChange={(e) => setRemarks(e.target.value)}
//           rows={3}
//         />
//       </div>

//       <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10 }}>
//         <Button type="primary" onClick={() => handleAction("Approve")} disabled={selectedRows.length === 0}>Approve</Button>
//         <Button type="danger" onClick={() => handleAction("Reject")} disabled={selectedRows.length === 0}>Reject</Button>
//       </div>
//     </div>
//   );
// };

// export default LenderMasterApproval;

// import React, { useState, useEffect } from "react";
// import { Table, Checkbox, Button, Input, message, Spin } from "antd";
// import axios from "axios";

// const LenderMasterApproval = ({ isDropped }) => {
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [remarks, setRemarks] = useState("");
//   const [lenders, setLenders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch Lender Data from Backend
//   useEffect(() => {
//     const fetchLenders = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get("http://localhost:5002/api/lender/list");
//         if (response.data.success) {
//           setLenders(response.data.data);
//         } else {
//           message.error("Failed to fetch lenders");
//         }
//       } catch (error) {
//         console.error("Error fetching lenders:", error);
//         message.error("Error fetching lenders");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLenders();
//   }, []);

//   const handleSelect = (lender_code) => {
//     setSelectedRows((prev) =>
//       prev.includes(lender_code) ? prev.filter((code) => code !== lender_code) : [...prev, lender_code]
//     );
//   };

//   const handleSelectAll = (e) => {
//     setSelectedRows(e.target.checked ? lenders.map((lender) => lender.lender_code) : []);
//   };

//   const columns = [
//     {
//       title: <Checkbox onChange={handleSelectAll} checked={selectedRows.length === lenders.length} />,
//       dataIndex: "lender_code",
//       render: (lender_code) => (
//         <Checkbox checked={selectedRows.includes(lender_code)} onChange={() => handleSelect(lender_code)} />
//       ),
//     },
//     { title: "Lender Code", dataIndex: "lender_code" },
//     { title: "Lender Name", dataIndex: "lender_name" },
//     { title: "Lender Type", dataIndex: "lender_type" },
//     { title: "Status", dataIndex: "status" },
//     { title: "Lender Email", dataIndex: "lender_email_id_1" },
//     {
//       title: "Details",
//       dataIndex: "lender_code",
//       render: (code) => <Button type="link" onClick={() => console.log("View Details for", code)}>View</Button>,
//     },
//   ];

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         flexDirection: "column",
//         gap: 2,
//         width: "auto",
//         margin: "auto",
//         marginTop: "70px",
//         marginLeft: isDropped ? "100px" : "280px",
//         transition: "margin-left 0.3s ease-in-out",
//         width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//         padding: 3,
//         border: "1px solid #ccc",
//         borderRadius: 2,
//         boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//       }}>
//        <h2>Lender Master Approval</h2>

//       {loading ? (
//         <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
//       ) : lenders.length === 0 ? (
//         <p style={{ textAlign: "center", marginTop: 20 }}>No lenders available</p>
//       ) : (
//         <Table dataSource={lenders} columns={columns} rowKey="lender_code" pagination={false} />
//       )}

//       <div style={{ marginTop: 20 }}>
//         <Input.TextArea
//           placeholder="Enter remarks..."
//           value={remarks}
//           onChange={(e) => setRemarks(e.target.value)}
//           rows={3}
//           disabled={loading}
//         />
//       </div>

//       <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10 }}>
//         <Button type="primary" disabled={selectedRows.length === 0 || loading}>Approve</Button>
//         <Button type="danger" disabled={selectedRows.length === 0 || !remarks.trim() || loading}>Reject</Button>
//       </div>
//     </div>
//   );
// };

// export default LenderMasterApproval;


import React, { useState, useEffect } from "react";
import { Table, Checkbox, Button, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LenderMasterApproval = ({ isDropped }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [lenders, setLenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Lender Data from Backend
  useEffect(() => {
    const fetchLenders = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5002/api/lender/list");
        if (response.data.success) {
          setLenders(response.data.data);
        } else {
          message.error("Failed to fetch lenders");
        }
      } catch (error) {
        console.error("Error fetching lenders:", error);
        message.error("Error fetching lenders");
      } finally {
        setLoading(false);
      }
    };

    fetchLenders();
  }, []);

  const handleSelect = (lender_code) => {
    setSelectedRows((prev) =>
      prev.includes(lender_code) ? prev.filter((code) => code !== lender_code) : [...prev, lender_code]
    );
  };

  const handleSelectAll = (e) => {
    setSelectedRows(e.target.checked ? lenders.map((lender) => lender.lender_code) : []);
  };

  const handleViewDetails = (lender_code) => {
    console.log("Navigating to:", `/lender/${lender_code}`);
    navigate(`/lender/${lender_code}`);

  };
  
  const columns = [
    {
      title: <Checkbox onChange={handleSelectAll} checked={selectedRows.length === lenders.length} />,
      dataIndex: "lender_code",
      render: (lender_code) => (
        <Checkbox checked={selectedRows.includes(lender_code)} onChange={() => handleSelect(lender_code)} />
      ),
    },
    { title: "Lender Code", dataIndex: "lender_code" },
    { title: "Lender Name", dataIndex: "lender_name" },
    { title: "Lender Type", dataIndex: "lender_type" },
    { title: "Status", dataIndex: "status" },
    { title: "Lender Email", dataIndex: "lender_email_id_1" },
    {
      title: "Details",
      dataIndex: "lender_code",
      render: (code) => (
        <Button type="link" onClick={() => handleViewDetails(code)}>View</Button>
      ),
    },
  ];  

  return (
    <div
      style={{
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
      <h2>Lender Master Approval</h2>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : lenders.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: 20 }}>No lenders available</p>
      ) : (
        <Table dataSource={lenders} columns={columns} rowKey="lender_code" pagination={false} />
      )}

      <div style={{ marginTop: 20 }}>
        <Input.TextArea
          placeholder="Enter remarks..."
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          rows={3}
          disabled={loading}
        />
      </div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Button type="primary" disabled={selectedRows.length === 0 || loading}>Approve</Button>
        <Button type="danger" disabled={selectedRows.length === 0 || !remarks.trim() || loading}>Reject</Button>
      </div>
    </div>
  );
};

export default LenderMasterApproval;
