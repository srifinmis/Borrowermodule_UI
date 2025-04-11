import React, { useState, useEffect } from "react";
import { Table, Spin, message, Button, Input, Select, Tag } from "antd";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const { Option } = Select;

const InterestRateChangeMain = ({ isDropped }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [interestRates, setInterestRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("Approved");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterestRates = async () => {
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
        const response = await axios.get(`${API_URL}/interest/fetchAll`);
        if (response.data.success) {
          setInterestRates([...response.data.mainData, ...response.data.data]);
        } else {
          message.error("Failed to fetch interest rate changes");
        }
      } catch (error) {
        console.error("Error fetching interest rate changes:", error);
        message.error("Error fetching interest rate changes");
      } finally {
        setLoading(false);
      }
    };
    fetchInterestRates();
  }, [API_URL]);

  const handleViewDetails = (sanction_id, lender_code, tranche_id, approval_status, createdat) => {
    navigate(`/interestratemaker/${sanction_id}`, {
      state: { sanction_id, lender_code, tranche_id, approval_status, createdat },
    });
  };

  const handleAddNewRateChange = () => {
    navigate("/add-interestrate");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const statusColors = {
    Approved: "green",
    Rejected: "red",
    "Approval Pending": "orange",
  };

  const displayedInterestRates = interestRates.filter(
    (rate) =>
      (!filterStatus || rate.approval_status === filterStatus) &&
      Object.values(rate).some((field) =>
        field && field.toString().toLowerCase().includes(searchText)
      )).sort((a, b) => new Date(b.updatedat || b.createdat) - new Date(a.updatedat || a.createdat));

  const columns = [
    { title: "Lender Code", dataIndex: "lender_code" },
    { title: "Sanction ID", dataIndex: "sanction_id" },
    { title: "Tranche ID", dataIndex: "tranche_id" },
    { title: "New Interest Rate (%)", dataIndex: "new_interest_rate" },
    { title: "Effective Date", dataIndex: "effective_date" },
    {
      title: "Approval Status",
      dataIndex: "approval_status",
      render: (status) => <Tag color={statusColors[status] || "blue"}>{status}</Tag>,
    },
    {
      title: "Details",
      dataIndex: "sanction_id",
      render: (id, record) => (
        <Button type="link" onClick={() => handleViewDetails(id, record.lender_code, record.tranche_id, record.approval_status, record.createdat)}>
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
        <h2>Interest Rate Change</h2>
        <Input
          placeholder="Search interest rate changes..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: "300px", height: "40px" }}
        />
        <Select
          value={filterStatus}
          onChange={setFilterStatus}
          style={{ width: "200px", height: "40px" }}
        >
          <Option value="Approved">Approved</Option>
          <Option value="Approval Pending">Approval Pending</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
        <Button type="primary" style={{ height: "40px" }} onClick={handleAddNewRateChange}>
          Add New Interest Rate
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div style={{ position: "relative" }}>
          <Table
            dataSource={displayedInterestRates}
            columns={columns}
            rowKey="change_id"
            pagination={{ pageSize: 5 }}
          />
          {/* Total Records in bottom-left */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
            Total Records : {displayedInterestRates.length}
          </div>
        </div>
      )}
    </Box>
  );
};

export default InterestRateChangeMain;
