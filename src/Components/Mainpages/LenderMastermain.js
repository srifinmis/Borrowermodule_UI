import React, { useState, useEffect } from "react";
import { Table, Spin, message, Button, Input, Select, Tag } from "antd";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const { Option } = Select;

const LenderMastermain = ({ isDropped }) => {
  const API_URL = process.env.REACT_APP_API_URL;

  const [lenders, setLenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("Approved");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLenders = async () => {
      setLoading(true);
      const submissionMessage = localStorage.getItem("submissionMessage");
      const messageType = localStorage.getItem("messageType");

      if (submissionMessage) {
        messageType === "success" ? toast.success(submissionMessage) : toast.error(submissionMessage);
        setTimeout(() => {
          localStorage.removeItem("submissionMessage");
          localStorage.removeItem("messageType");
        }, 5000);
      }

      try {
        const response = await axios.get(`${API_URL}/lender/list`);

        if (response.data.success) {
          setLenders(response.data.mainData);
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
  }, [API_URL]);

  const handleViewDetails = (lender_code, approval_status, lender_name, updatedat) => {
    navigate(`/lendermaker/${lender_code}`,
      {
        state: { lender_code, approval_status, lender_name, updatedat }
      });
  };

  const handleAddNewLender = () => {
    navigate("/LenderMaster");
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleFilterChange = async (value) => {
    setFilterStatus(value);
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/lender/list`);
      if (response.data.success) {
        let filteredLenders = [];

        if (value === "Approved") {
          filteredLenders = response.data.mainData;
        } else if (value) {
          filteredLenders = response.data.data.filter((lender) => lender.approval_status === value);
        }
        setLenders(filteredLenders);
      } else {
        message.error("Failed to filter lenders");
      }
    } catch (error) {
      console.error("Error filtering lenders:", error);
      message.error("Error filtering lenders");
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
  };

  const statusColors = {
    Approved: "green",
    Rejected: "red",
    "Approval Pending": "orange",
  };

  const filteredLenders = lenders
    .filter((lender) =>
      Object.values(lender).some(
        (field) => field && field.toString().toLowerCase().includes(searchText)
      )
    )
    .sort((a, b) => new Date(b.updatedat || b.createdat) - new Date(a.updatedat || a.createdat));

  const columns = [
    { title: "Lender Code", dataIndex: "lender_code" },
    { title: "Lender Name", dataIndex: "lender_name" },
    { title: "Lender Type", dataIndex: "lender_type" },
    { title: "Lender Email", dataIndex: "lender_email_id_1" },
    {
      title: "Approval Status",
      dataIndex: "approval_status",
      render: (status) => <Tag color={statusColors[status] || "blue"}>{status}</Tag>,
    },
    {
      title: "Details",
      dataIndex: "lender_code",
      render: (code, record) => (
        <Button type="link" onClick={() => handleViewDetails(code, record.approval_status, record.lender_name, record.updatedat)}>
          View
        </Button>
      ),
    },
  ];

  return (
    <Box
      style={{
        display: "flex",
        height: "300px",
        flexDirection: "column",
        marginTop: "70px",
        marginLeft: isDropped ? "100px" : "280px",
        transition: "margin-left 0.3s ease-in-out",
        width: isDropped ? "calc(100% - 180px)" : "calc(100% - 350px)",
        padding: 3,
      }}>
      <ToastContainer position="top-right" autoClose={5000} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Lender Master Creation</h2>
        <Input
          placeholder="Search lenders..."
          value={searchText}
          onChange={handleSearch}
          style={{ width: "300px", height: "40px" }}
        />
        <Select
          value={filterStatus}
          onChange={handleFilterChange}
          style={{ width: "200px", height: "40px" }}
          placeholder="Filter by status">
          <Option value="Approved">Approved</Option>
          <Option value="Rejected">Rejected</Option>
          <Option value="Approval Pending">Approval Pending</Option>
        </Select>
        <Button type="primary" style={{ height: "40px" }} onClick={handleAddNewLender}>
          Add New Lender
        </Button>
      </div>

      {loading ? (
        <Spin size="large" style={{ display: "block", margin: "20px auto" }} />
      ) : (
        <div style={{ position: "relative" }}>
          <Table
            dataSource={filteredLenders}
            columns={columns}
            rowKey="id"
            pagination={{
              current: currentPage,
              pageSize: 5,
              total: filteredLenders.length,
              onChange: handleTableChange,
              showSizeChanger: false,
              position: ["bottomRight"], // Keeps pagination at bottom-right
            }}
          />
          {/* Total Records in bottom-left */}
          <div style={{ position: "absolute", bottom: "10px", left: "10px" }}>
            Total Records : {filteredLenders.length}
          </div>
        </div>

      )}
    </Box>
  );
};

export default LenderMastermain;
