import React, { useState, useEffect } from "react";
import { Table, Spin, message, Button, Input, Select, Tag } from "antd";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const { Option } = Select;

const TrancheDetailsMain = ({ isDropped }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [trancheDetails, setTrancheDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("Approved");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrancheDetails = async () => {
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
        const response = await axios.get(`${API_URL}/tranche/fetchAll`);

        if (response.data.success) {
          const approvedTranches = response.data.mainData;
          setTrancheDetails(approvedTranches);
        } else {
          message.error("Failed to fetch Tranche details");
        }
      } catch (error) {
        console.error("Error fetching Tranche details:", error);
        message.error("Error fetching Tranche details");
      } finally {
        setLoading(false);
      }
    };

    fetchTrancheDetails();
  }, [API_URL]);

  const handleViewDetails = (tranche_id, lender_code, sanction_id, approval_status, updatedat) => {
    navigate(`/tranchemaker/${tranche_id}`, {
      state: { tranche_id, lender_code, sanction_id, approval_status, updatedat },
    });
  };

  const handleAddNewTranche = () => {
    navigate("/addtranche");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleStatusFilterChange = async (value) => {
    setApprovalFilter(value);
    setLoading(true);

    try {
      const response = await axios.get(`${API_URL}/tranche/fetchAll`);
      if (response.data.success) {
        let filteredTranches = [];

        if (value === "Approved") {
          filteredTranches = response.data.mainData; // Only approved tranches
        } else if (value) {
          filteredTranches = response.data.data.filter(
            (tranche) => tranche.approval_status === value
          );
        } else {
          // Show all tranches (both approved and others)
          filteredTranches = [...response.data.mainData, ...response.data.data];
        }

        setTrancheDetails(filteredTranches);
      } else {
        message.error("Failed to filter tranches");
      }
    } catch (error) {
      console.error("Error filtering tranches:", error);
      message.error("Error filtering tranches");
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    Approved: "green",
    Rejected: "red",
    "Approval Pending": "orange",
  };

  const filteredTranches = trancheDetails.filter((tranche) =>
    Object.values(tranche).some((field) =>
      field && field.toString().toLowerCase().includes(searchText)
    )).sort((a, b) => new Date(b.updatedat || b.createdat) - new Date(a.updatedat || a.createdat));

  const columns = [
    { title: "Lender Code", dataIndex: "lender_code" },
    { title: "Sanction ID", dataIndex: "sanction_id" },
    { title: "Tranche ID", dataIndex: "tranche_id" },
    { title: "Tranche Amount", dataIndex: "tranche_amount" },
    { title: "Interest Type", dataIndex: "interest_type" },
    { title: "Interest Rate", dataIndex: "interest_rate" },
    {
      title: "Approval Status",
      dataIndex: "approval_status",
      render: (status) => <Tag color={statusColors[status] || "blue"}>{status}</Tag>,
    },
    {
      title: "Details",
      dataIndex: "tranche_id",
      render: (id, record) => (
        <Button type="link" onClick={() => handleViewDetails(id, record.lender_code, record.sanction_id, record.approval_status, record.updatedat)}>
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
        marginLeft: isDropped ? "100px" : "280px",
        transition: "margin-left 0.3s ease-in-out",
        width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
        padding: 3,
      }}
    >
      <ToastContainer position="top-right" autoClose={5000} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Tranche Details</h2>
        <Input
          placeholder="Search tranche details..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: "300px", height: "40px" }}
        />
        <Select
          value={approvalFilter}
          onChange={handleStatusFilterChange}
          style={{ width: "200px", height: "40px" }}
          placeholder="Filter by status"
        >
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Approval Pending">Approval Pending</Option>
        </Select>
        <Button type="primary" style={{ height: "40px" }} onClick={handleAddNewTranche}>
          Add New Tranche
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div style={{ position: "relative" }}>
          <Table
            dataSource={filteredTranches}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 5 }}
          />
          {/* Total Records in bottom-left */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
            Total Records : {filteredTranches.length}
          </div>
        </div>
      )}
    </Box>
  );
};

export default TrancheDetailsMain;
