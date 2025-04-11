import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton, Divider, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
// import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
// import AlertIcon from '@mui/icons-material/Alert';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

import Logo from "../Images/SriFin_Logo.png";

const Navbar = ({ onToggle }) => {

  const [drop, setDrop] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setDrop(!drop);
    onToggle(!drop); // Notify parent about state change
  };
  const [currentMenu, setCurrentMenu] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const sidebarWidth = collapsed ? 100 : 100; // Dynamic width


  const handleMenuClick = (menu) => {
    // if (collapsed) setCollapsed(false);
    // const [collapsed, setCollapsed] = useState(false);

    setCurrentMenu(currentMenu === menu ? null : menu);
  };
  const handleLogout = () => {
    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('loginSuccess');
    // localStorage.removeItem('token');
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "60px",
          backgroundColor: "#1f2937",
          display: "flex",
          alignItems: "center",
          zIndex: 1000,
          justifyContent: "space-between", // This creates space between the logo and logout button
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: "160px",
            height: "40px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            marginLeft: "10px",
            justifyContent: "center",
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: "120px", height: "30px" }} />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout} // You can replace this with your actual logout function
          style={{
            backgroundColor: "#f87171", // Button color (can be changed)
            color: "#ffffff",
            padding: "10px 10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            display: "flex",
            marginRight: "10px",
            alignItems: "center",
            justifyContent: "center",  // This makes sure the text is centered inside the button
          }}
        >
          Logout
        </button>
      </div>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? 80 : 260,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          transition: "width 0.3s ease-in-out",
          "& .MuiDrawer-paper": {
            width: collapsed ? 80 : 260,
            marginTop: "60px",
            boxSizing: "border-box",
            backgroundColor: "#1f2937",
            color: theme.palette.common.white,
            overflowY: "auto",

            transition: "width 0.3s ease-in-out",
          },
        }}

      >
        {/* Collapse/Expand Button */}
        <div style={{ width: drop ? "60px" : "200px", transition: "width 0.3s ease" }}></div>
        <IconButton
          sx={{
            color: "white",
            alignSelf: "center",
            margin: "5px",
            transition: "transform 0.3s",
            transform: collapsed ? "rotate(90deg)" : "rotate(90deg)",
          }}
          onClick={() => { handleToggle(); setCollapsed(!collapsed); }}
        >
          <MoreVertIcon />
        </IconButton>

        <Divider sx={{ backgroundColor: theme.palette.divider }} />

        {/* Sidebar Menu */}
        <nav>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "5px" }}>
            <NavItem label="Data Creation" icon={<WorkIcon />} menu="DataCreation" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/DataCreation/LenderMaster", label: "Lender Master" },
              { to: "/DataCreation/SanctionDetails", label: "Sanction Details" },
              { to: "/DataCreation/ROCForm", label: "ROC Form" },
              // { to: "/DataCreation/RepaymentDetails", label: "Bank Repayment Details" },
              { to: "/DataCreation/ExecutedDocuments", label: "Executed Documents" },
              { to: "/DataCreation/TrancheDetails", label: "Tranche Details" },
              { to: "/DataCreation/InterestRate", label: "Interest Rate Change" },
              { to: "/DataCreation/RepaymentSchedule", label: "Repayment Schedule" },
            ]} collapsed={collapsed} />

            <NavItem label="Reports" icon={<BusinessIcon />} menu="Reports" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/Reports/LenderMaster", label: "Lender Master" },
              { to: "/Reports/SanctionDetails", label: "Sanction Details" },
              { to: "/Reports/TrancheDetails", label: "Tranche Details" },
              { to: "/Reports/RepaymentSchedule", label: "Repayment Schedule" },
              { to: "/Reports/RepaymentStatement", label: "Repayment Statement" },
              { to: "/Reports/DataWiseLoanRepayment", label: "DataWise Loan Repayment" },
            ]} collapsed={collapsed} />

            {/* <NavItem label="Settings" icon={<SettingsIcon />} menu="Settings" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/Settings/UserCreation", label: "User Creation" },
              { to: "/Settings/LoginRights", label: "Login Rights" },
              { to: "/Settings/ChangePassword", label: "Change Password" },
              { to: "/Settings/Login", label: "Login" },
              { to: "/Settings/Exit", label: "Exit" },
            ]} collapsed={collapsed} /> */}

            <NavItem label="Approval Pending" icon={<HelpIcon />} menu="Approve" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/Approve/LenderMaster", label: "Lenders Pending Approvals" },
              { to: "/Approve/SanctionDetails", label: "SanctionDetails Pending Approvals" },
              { to: "/Approve/ROCForm", label: "ROC Forms Pending Approvals" },
              // { to: "/Approve/BankRepayment", label: "Bank Repayment Pending Approvals" },
              { to: "/Approve/Executeddocumentsupload", label: "Executed documents Pending Approvals" },
              { to: "/Approve/Tranchedetails", label: "Tranche details Pending Approvals" },
              { to: "/Approve/Interestrate", label: "interestrate details Pending Approvals" },
              { to: "/Approve/RepaymentSchedule", label: "Repayment Schedule Pending Approvals" },
            ]} collapsed={collapsed} />

            <NavItem label="Alerts " icon={<WarningAmberIcon />} menu="WarningAmberIcon" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/Alerts/Alertmain", label: "Alerts" },
            ]} collapsed={collapsed} />
          </ul>
        </nav>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", padding: "16px" }}>
        {/* Page Content Goes Here */}
        <div style={{ flexGrow: 1, marginLeft: sidebarWidth - 200 }}>
        </div>
      </Box>
    </Box>
  );
};

const NavItem = ({ label, icon, menu, currentMenu, handleMenuClick, activeLink, setActiveLink, links, collapsed }) => (
  <li style={{ marginBottom: "5px" }}>
    <div
      onClick={() => handleMenuClick(menu)}
      style={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        color: currentMenu === menu ? "#79D7BE" : "white",
        transition: "background 0.3s",
      }}
    >
      {icon}
      {!collapsed && <span style={{ marginLeft: "10px" }}>{label}</span>}
    </div>

    {currentMenu === menu && !collapsed && (
      <ul style={{
        listStyle: "none",
        paddingLeft: "10px", // Adjust for left alignment
        marginTop: "0px"
      }}>
        {links.map((link, index) => (
          <li key={index} style={{ textAlign: "left", marginLeft: "20px", marginTop: "10px" }}> {/* Align items to the left */}
            <Link
              to={link.to}
              onClick={() => setActiveLink(link.to)}
              style={{
                display: "block",
                padding: "2px 0",
                color: activeLink === link.to ? "#79D7BE" : "white",
                textDecoration: "none",
                transition: "color 0.3s",
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

    )}
  </li>
);

export default Navbar;