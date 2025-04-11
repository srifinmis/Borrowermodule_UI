// import React, { useState, useEffect } from "react";
// import { Table, Checkbox, message, Spin } from "antd";
// import { Typography, TextField, Button } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const RepaymentScheduleApprovalAll = ({ isDropped }) => {
//     const [selectedRows, setSelectedRows] = useState([]);
//     const [remarks, setRemarks] = useState("");
//     const [remarksError, setRemarksError] = useState(false);
//     const [lenders, setLenders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchLenders = async () => {
//             setLoading(true);
//             try {
//                 const response = await axios.get("http://localhost:5002/api/repayment/schedule/fetchAll");
//                 if (response.status === 201) {
//                     setLenders(response.data.data);
//                 } else {
//                     message.error("Failed to fetch lenders");
//                 }
//             } catch (error) {
//                 message.error("Error fetching lenders");
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchLenders();
//     }, []);

//     const handleSelect = (lender) => {
//         setSelectedRows((prev) => {
//             const isSelected = prev.some(
//                 (row) =>
//                     row.sanction_id === lender.sanction_id &&
//                     row.tranche_id === lender.tranche_id&&
//                 row.due_date === lender.due_date
//             );
//             return isSelected
//                 ? prev.filter(
//                     (row) =>
//                         row.sanction_id !== lender.sanction_id ||
//                         row.tranche_id !== lender.tranche_id ||
//                     row.due_date !== lender.due_date
//                 )
//                 : [...prev, lender];
//         });
//     };

//     const handleSelectAll = (e) => {
//         if (e.target.checked) {
//             const uniqueRows = [];
//             const seenKeys = new Set();
//             lenders.forEach((lender) => {
//                 const key = `${lender.sanction_id}-${lender.tranche_id}-${lender.due_date}`;
//                 // const key = `${lender.sanction_id}-${lender.tranche_id}`;
//                 if (!seenKeys.has(key)) {
//                     seenKeys.add(key);
//                     uniqueRows.push(lender);
//                 }
//             });
//             setSelectedRows(uniqueRows);
//         } else {
//             setSelectedRows([]);
//         }
//     };

//     const handleApprove = async () => {
//         if (selectedRows.length === 0) {
//             message.warning("No lenders selected.");
//             return;
//         }

//         try {
//             // Prepare payload with unique combination and approval status
//             const payload = selectedRows.map((lender) => ({
//                 // ...selectedRows,
//                 sanction_id: lender.sanction_id,
//                 tranche_id: lender.tranche_id,
//                 due_date: lender.due_date,
//                 createdat: lender.createdat,
//                 updatedat: lender.createdat,
//                 updatedby: lender.createdby,
//                 createdby: lender.createdby,
//                 interest_due: lender.interest_due,
//                 principal_due: lender.principal_due,
//                 total_due: lender.total_due,
//                 remarks: lender.remarks,
//                 approval_status: "Approved",
//             }));
//             console.log("Data: RS: ", selectedRows)
//             console.log("Payload RS: ", payload)
//             const response = await axios.post("http://localhost:5002/api/schedule/Approve", payload);
//             console.log("Approval RS: ", response)
//             if (response.status === 201) {
//                 toast.success("Lenders approved successfully!");

//                 // Remove lenders from UI based on unique key match
//                 setLenders((prev) =>
//                     prev.filter(
//                         (lender) =>
//                             !selectedRows.some(
//                                 (row) =>
//                                     row.sanction_id === lender.sanction_id &&
//                                     row.tranche_id === lender.tranche_id &&
//                                 row.due_date === lender.due_date
//                             )
//                     )
//                 );
//                 setSelectedRows([]);
//             } else {
//                 toast.error("Approval failed.");
//             }
//         } catch (error) {
//             message.error(`Error: ${error.response?.data?.message || "Approval failed."}`);
//         }
//     };

//     const handleReject = async () => {
//         if (selectedRows.length === 0) {
//             message.warning("No lenders selected.");
//             return;
//         }
//         if (!remarks.trim()) {
//             setRemarksError(true);
//             return;
//         }

//         try {
//             // Prepare payload with unique key and remarks
//             const payload = selectedRows.map((lender) => ({
//                 sanction_id: lender.sanction_id,
//                 tranche_id: lender.tranche_id,
//                 due_date: lender.due_date,
//                 remarks: remarks.trim(),
//             }));

//             const response = await axios.post("http://localhost:5002/api/schedule/Reject", payload);

//             if (response.status === 201) {
//                 toast.success("Lenders rejected successfully!");

//                 // Remove lenders from UI based on unique key match
//                 setLenders((prev) =>
//                     prev.filter(
//                         (lender) =>
//                             !selectedRows.some(
//                                 (row) =>
//                                     row.sanction_id === lender.sanction_id &&
//                                     row.tranche_id === lender.tranche_id &&
//                                 row.due_date === lender.due_date
//                             )
//                     )
//                 );
//                 setSelectedRows([]);
//                 setRemarks("");
//                 setRemarksError(false);
//             } else {
//                 toast.error("Rejection failed.");
//             }
//         } catch (error) {
//             message.error(`Error: ${error.response?.data?.message || "Rejection failed."}`);
//         }
//     };



//     // 

//     const columns = [
//         {
//             title: <Checkbox onChange={handleSelectAll} checked={selectedRows.length === lenders.length} />,
//             dataIndex: "sanction_id",
//             render: (_, lender) => (
//                 <Checkbox
//                     checked={selectedRows.some(
//                         (row) =>
//                             row.sanction_id === lender.sanction_id &&
//                             row.tranche_id === lender.tranche_id &&
//                         row.due_date === lender.due_date
//                     )}
//                     onChange={() => handleSelect(lender)}
//                 />
//             ),
//         },
//         { title: "Sanction ID", dataIndex: "sanction_id" },
//         { title: "Tranche ID", dataIndex: "tranche_id" },
//         { title: "Due Date", dataIndex: "due_date" },
//         { title: "Principal Due", dataIndex: "principal_due" },
//         { title: "Interest Due", dataIndex: "interest_due" },
//         { title: "Total Due", dataIndex: "total_due" },
//         { title: "Remarks", dataIndex: "remarks" },
//     ];

//     return (
//         <div style={{
//             display: "flex",
//             justifyContent: "center",
//             flexDirection: "column",
//             gap: 2,
//             // width: "auto",
//             margin: "auto",
//             marginTop: "70px",
//             marginLeft: isDropped ? "100px" : "280px",
//             transition: "margin-left 0.3s ease-in-out",
//             width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
//             padding: 3,
//             border: "1px solid #ccc",
//             borderRadius: 10,
//             boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)"
//         }}>
//             <ToastContainer position="top-right" autoClose={5000} />
//             <Typography
//                 sx={{
//                     color: "#0056b3",
//                     fontWeight: "600",
//                     fontSize: "20px",
//                     marginTop: "20px",
//                     marginBottom: "20px",
//                     textAlign: "center",
//                     textTransform: "uppercase",
//                     letterSpacing: "1px",
//                     borderBottom: "2px solid #0056b3",
//                     paddingBottom: "10px",
//                 }}
//             >
//                 Repayment Schedule Approval
//             </Typography>

//             {loading ? (
//                 <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
//             ) : lenders.length === 0 ? (
//                 <p style={{ textAlign: "center" }}>No lenders available</p>
//             ) : (
//                 <Table dataSource={lenders} columns={columns} rowKey={(record) => `${record.sanction_id}-${record.tranche_id}-${record.due_date}`} pagination={false} />
//                 // <Table dataSource={lenders} columns={columns} rowKey={(record) => `${record.sanction_id}-${record.tranche_id}-${record.due_date}`} pagination={false} />
//             )}

//             <div style={{ marginTop: 20, display: "flex", justifyContent: "center", marginRight: "20px" }}>

//                 <TextField
//                     label="Remarks (Required for Rejection)"
//                     value={remarks}
//                     onChange={(e) => {
//                         setRemarks(e.target.value);
//                         if (e.target.value.trim()) setRemarksError(false); // Remove error when user types
//                     }}
//                     multilines
//                     rows={0} xs={12} sm={6}
//                     sx={{ marginTop: 2, width: "400px" }}
//                     required
//                     error={remarksError}
//                     helperText={remarksError ? "Remarks are required when rejecting." : ""}
//                 />
//             </div>

//             <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 10, width: "100%" }}>
//                 <Button variant="contained" color="success" style={{ marginBottom: "20px", marginRight: "20px" }} onClick={handleApprove} disabled={selectedRows.length === 0 || loading}>
//                     Approve
//                 </Button>
//                 <Button variant="contained" color="error" style={{ marginBottom: "20px", marginRight: "20px" }} onClick={handleReject} disabled={selectedRows.length === 0 || !remarks.trim() || loading}>
//                     Reject
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default RepaymentScheduleApprovalAll;

import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Spin, message, Checkbox, Input, Form } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const RepaymentScheduleApprovalAll = ({ isDropped }) => {
    const API_URL = process.env.REACT_APP_API_URL;

    const [lenders, setLenders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [remarks, setRemarks] = useState("");
    const [remarksError, setRemarksError] = useState(false);

    useEffect(() => {
        const fetchLenders = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${API_URL}/repayment/schedule/fetchAll`);
                // console.log("get: ", response)
                if (response.status === 201) {
                    setLenders(response.data.data);
                } else {
                    message.error("Failed to fetch lenders");
                }
            } catch (error) {
                message.error("Error fetching lenders");
            } finally {
                setLoading(false);
            }
        };
        fetchLenders();
    }, [API_URL]);

    const groupedLenders = lenders.reduce((groups, lender) => {
        const key = `${lender.sanction_id}-${lender.tranche_id}`;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(lender);
        return groups;
    }, {});

    const handleView = (key) => {
        setSelectedGroup(groupedLenders[key]);
        setModalVisible(true);
    };

    const handleSelectAllChange = (e) => {
        setSelectAll(e.target.checked);
        if (e.target.checked) {
            setSelectedRows(Object.keys(groupedLenders).map((key) => key));
        } else {
            setSelectedRows([]);
        }
    };

    const handleSelectRow = (e, key) => {
        if (e.target.checked) {
            setSelectedRows([...selectedRows, key]);
        } else {
            setSelectedRows(selectedRows.filter((id) => id !== key));
        }
    };

    const handleApprove = async () => {
        if (selectedRows.length === 0) {
            message.warning("No lenders selected.");
            return;
        }

        try {
            // Prepare payload with the detailed data of selected rows
            const payload = selectedRows.map((key) => {
                const lendersDetails = groupedLenders[key];
                return lendersDetails.map((lender) => ({
                    sanction_id: lender.sanction_id,
                    tranche_id: lender.tranche_id,
                    due_date: lender.due_date,
                    createdat: lender.createdat,
                    updatedat: lender.createdat,
                    updatedby: lender.createdby,
                    createdby: lender.createdby,
                    interest_due: lender.interest_due,
                    principal_due: lender.principal_due,
                    total_due: lender.total_due,
                    remarks: lender.remarks,
                    approval_status: "Approved",
                }));
            }).flat();

            const response = await axios.post(`${API_URL}/schedule/Approve`, payload);
            if (response.status === 201) {
                toast.success("Lenders approved successfully!");

                setLenders((prev) =>
                    prev.filter(
                        (lender) =>
                            !selectedRows.some(
                                (row) =>
                                    row.sanction_id === lender.sanction_id &&
                                    row.tranche_id === lender.tranche_id &&
                                    row.due_date === lender.due_date
                            )
                    )
                );
                setSelectedRows([]);
            } else {
                toast.error("Approval failed.");
            }
        } catch (error) {
            message.error(`Error: ${error.response?.data?.message || "Approval failed."}`);
        }
    };

    const handleReject = async () => {
        if (selectedRows.length === 0) {
            message.warning("No lenders selected.");
            return;
        }
        if (!remarks.trim()) {
            setRemarksError(true);
            return;
        }

        try {
            const payload = selectedRows.map((key) => {
                const lendersDetails = groupedLenders[key];
                return lendersDetails.map((lender) => ({
                    sanction_id: lender.sanction_id,
                    tranche_id: lender.tranche_id,
                    due_date: lender.due_date,
                    remarks: remarks.trim(),
                }));
            }).flat();

            const response = await axios.post(`${API_URL}/schedule/Reject`, payload);

            if (response.status === 201) {
                toast.success("Lenders rejected successfully!");
                setLenders((prev) =>
                    prev.filter(
                        (lender) =>
                            !selectedRows.some(
                                (row) =>
                                    row.sanction_id === lender.sanction_id &&
                                    row.tranche_id === lender.tranche_id &&
                                    row.due_date === lender.due_date
                            )
                    )
                );
                setSelectedRows([]);
                setRemarks("");
                setRemarksError(false);
            } else {
                toast.error("Rejection failed.");
            }
        } catch (error) {
            message.error(`Error: ${error.response?.data?.message || "Rejection failed."}`);
        }
    };

    const columns = [
        {
            title: (
                <Checkbox
                    indeterminate={selectedRows.length > 0 && selectedRows.length < Object.keys(groupedLenders).length}
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                />
            ),
            key: "selectAll",
            render: (_, record) => (
                <Checkbox
                    checked={selectedRows.includes(record.key)}
                    onChange={(e) => handleSelectRow(e, record.key)}
                />
            ),
        },
        { title: "Sanction ID", dataIndex: "sanction_id", key: "sanction_id" },
        { title: "Tranche ID", dataIndex: "tranche_id", key: "tranche_id" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Button type="primary" onClick={() => handleView(`${record.sanction_id}-${record.tranche_id}`)}>
                    View
                </Button>
            ),
        },
    ];

    const detailColumns = [
        { title: "Sanction ID", dataIndex: "sanction_id", key: "sanction_id" },
        { title: "Tranche ID", dataIndex: "tranche_id", key: "tranche_id" },
        { title: "Due Date", dataIndex: "due_date", key: "due_date" },
        { title: "Principal Due", dataIndex: "principal_due", key: "principal_due" },
        { title: "Interest Due", dataIndex: "interest_due", key: "interest_due" },
        { title: "Total Due", dataIndex: "total_due", key: "total_due" },
        // { title: "Remarks", dataIndex: "remarks", key: "remarks" },
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                margin: "auto",
                marginTop: "70px",
                marginLeft: isDropped ? "100px" : "280px",
                transition: "margin-left 0.3s ease",
                width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
                padding: "24px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.3)",
            }}
        >
            <h2 style={{ textAlign: "center", borderBottom: "2px solid #0056b3", paddingBottom: 10 }}>
                Repayment Schedule Approval
            </h2>
            {loading ? (
                <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
            ) : Object.keys(groupedLenders).length === 0 ? (
                <p style={{ textAlign: "center" }}>No Repayment Schedule's available</p>
            ) : (
                <Table
                    dataSource={Object.keys(groupedLenders).map((key) => {
                        const [sanction_id, tranche_id] = key.split("-");
                        return { key, sanction_id, tranche_id };
                    })}
                    columns={columns}
                    pagination={false}
                    rowKey="key"
                />
            )}

            <Modal
                title="Repayment Schedule Details"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
                width={750}
            >
                {selectedGroup && (
                    <Table
                        dataSource={selectedGroup}
                        columns={detailColumns}
                        rowKey={(record) => record.repayment_id}
                        pagination={false}
                    />
                )}
            </Modal>

            {/* Remarks and Buttons */}
            <div style={{ marginTop: 20, display: "flex", justifyContent: "center", marginRight: "20px" }}>
                <Form.Item
                    label="Remarks (Required for Rejection)"
                    validateStatus={remarksError ? "error" : ""}
                    help={remarksError ? "Remarks are required when rejecting." : ""}
                    style={{ width: "400px" }}
                >
                    <Input.TextArea
                        value={remarks}
                        onChange={(e) => {
                            setRemarks(e.target.value);
                            if (e.target.value.trim()) setRemarksError(false); // Remove error when user types
                        }}
                        rows={4}
                    />
                </Form.Item>
            </div>

            <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 10, width: "100%" }}>
                <Button
                    type="primary"
                    style={{ marginBottom: "20px", marginRight: "20px" }}
                    onClick={handleApprove}
                    disabled={selectedRows.length === 0 || loading}
                >
                    Approve
                </Button>
                <Button
                    type="danger"
                    style={{ marginBottom: "20px", marginRight: "20px" }}
                    onClick={handleReject}
                    disabled={selectedRows.length === 0 || !remarks.trim() || loading}
                >
                    Reject
                </Button>
            </div>
        </div>
    );
};

export default RepaymentScheduleApprovalAll;


