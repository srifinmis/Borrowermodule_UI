// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Drawer, Button, Box, Divider, IconButton } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot icon

// // Icon imports
// import SettingsIcon from "@mui/icons-material/Settings";
// import BusinessIcon from "@mui/icons-material/Business";
// import WorkIcon from "@mui/icons-material/Work";
// import HelpIcon from "@mui/icons-material/Help";
// import Logo from "../Images/SriFin_Logo.png";

// const Navbar = () => {
//   const [currentMenu, setCurrentMenu] = useState(null);
//   const [activeLink, setActiveLink] = useState(null);
//   const [collapsed, setCollapsed] = useState(false); // New: Control collapse state
//   const theme = useTheme();

//   const handleMenuClick = (menu) => {

//     setCurrentMenu(currentMenu === menu ? null : menu);
//   };

//   const handleLinkClick = (link) => {
//     setActiveLink(link);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       <div
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '50px',
//           backgroundColor: '#1f2937',
//           display: 'flex',
//           alignItems: 'center',
//           zIndex: 1000,
//           paddingLeft: '16px',
//         }}
//       >
//         {/* Image with white background */}
//         <div
//           style={{
//             width: '160px',
//             height: '40px',
//             backgroundColor: '#ffffff', // White background for the image
//             borderRadius: '8px', // Optional: rounded corners
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             marginRight: '70px', // space between the image and text
//           }}
//         >
//           <img
//             src={Logo} // Replace with your image path
//             alt="Logo"
//             style={{
//               width: '120px', // Adjust the size inside the white box
//               height: '30px',
//             }}
//           />

//         </div>

//         {/* Dynamic page name in the center */}
//         <h2
//           style={{
//             color: '#FFFFFF',
//             margin: 10,
//             fontWeight: 'normal',
//             fontSize: '22px',
//           }}
//         >

//         </h2>
//       </div>
//       {/* Sidebar */}
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: collapsed ? 80 : 260,
//           flexShrink: 0,
//           display: "flex",
//           flexDirection: "column",
//           transition: "width 0.3s ease-in-out",
//           "& .MuiDrawer-paper": {
//             width: collapsed ? 80 : 260,
//             marginTop: "50px",
//             boxSizing: "border-box",
//             backgroundColor: "#000957",
//             color: theme.palette.common.white,
//             overflowY: "auto",
//             transition: "width 0.3s ease-in-out",
//           },
//         }}
//       >
//         {/* Collapse/Expand Button */}
//         <IconButton
//           sx={{
//             color: "white",
//             alignSelf: "center",
//             margin: "8px",

//             transition: "transform 0.3s",
//             transform: collapsed ? "rotate(90deg)" : "rotate(90deg)",
//           }}
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           <MoreVertIcon />
//         </IconButton>

//         <Divider sx={{ backgroundColor: theme.palette.divider }} />
//         {/* Transactions Dropdown */}
//         <NavItem
//           sx={{
//             color: "white",
//             display: "flex",
//             justifyContent: "start",
//           }}
//           label="Data Creation"
//           icon={<WorkIcon />}
//           menu="DataCreation"
//           currentMenu={currentMenu}
//           handleMenuClick={handleMenuClick}
//           activeLink={activeLink}
//           handleLinkClick={handleLinkClick}

//           links={[
//             { to: "/DataCreation/LenderMaster", label: "LenderMaster" },
//             { to: "/DataCreation/SanctionDetails", label: "Sanction Details" },
//             { to: "/DataCreation/ROCForm", label: "ROC Form" },
//             { to: "/DataCreation/BankaccountRepayment", label: "Repayment Details" },
//             { to: "/DataCreation/ExecutedDocuments", label: "Executed Documents" },
//             { to: "/DataCreation/TrancheDetails", label: "Tranche Details" },
//             { to: "/DataCreation/InterestRate", label: "Interest Rate" },
//             { to: "/DataCreation/RepaymentSchedule", label: "Repayment Schedule" },
//           ]}
//           collapsed={collapsed}
//         />

//         {/* Master Dropdown */}
//         <NavItem
//           label="Reports"
//           icon={<BusinessIcon />}
//           menu="reports"
//           currentMenu={currentMenu}
//           handleMenuClick={handleMenuClick}
//           activeLink={activeLink}
//           handleLinkClick={handleLinkClick}
//           links={[
//             { to: "/Reports/LenderMaster", label: "Lender Master" },
//             { to: "/Reports/SanctionDetails", label: "Sanction Details" },
//             { to: "/Reports/TrancheDetails", label: "Tranche Details" },
//             { to: "/Reports/RepaymentSchedule", label: "Repayment Schedule" },
//             { to: "/Reports/RepaymentStatement", label: "Repayment Statement" },
//             { to: "/Reports/DataWiseLoanRepayment", label: "DataWise Loan Repayment" },
//           ]}
//           collapsed={collapsed}
//         />
//         {/* Settings Dropdown */}
//         <NavItem
//           label="Settings"
//           icon={<SettingsIcon />}
//           menu="settings"
//           currentMenu={currentMenu}
//           handleMenuClick={handleMenuClick}
//           activeLink={activeLink}
//           handleLinkClick={handleLinkClick}
//           links={[
//             { to: "/Settings/UserCreation", label: "User Creation" },
//             { to: "/Settings/LoginRights", label: "Login Rights" },
//             { to: "/Settings/ChangePassword", label: "Change Password" },
//             { to: "/Settings/Login", label: "Login" },
//             { to: "/Settings/Exit", label: "Exit" },
//           ]}
//           collapsed={collapsed}
//         />

//         {/* Help Dropdown */}
//         <NavItem
//           label="Help"
//           icon={<HelpIcon />}
//           menu="help"
//           currentMenu={currentMenu}
//           handleMenuClick={handleMenuClick}
//           activeLink={activeLink}
//           handleLinkClick={handleLinkClick}
//           links={[{ to: "/Help/Support", label: "Support" }]}
//           collapsed={collapsed}
//         />
//       </Drawer>

//       {/* Main Content Area */}
//       <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", padding: "16px" }}>
//         {/* Your main content goes here */}
//       </Box>
//     </Box>
//   );
// };

// // NavItem Component for reusable dropdown structure
// const NavItem = ({
//   label,
//   icon,
//   menu,
//   currentMenu,
//   handleMenuClick,
//   activeLink,
//   handleLinkClick,
//   links,
//   collapsed,
// }) => (
//   <Box sx={{ marginBottom: "5px" }}>
//     <Button
//       color="inherit"
//       fullWidth
//       startIcon={icon}
//       onClick={() => handleMenuClick(menu)}
//       sx={{
//         justifyContent: collapsed ? "center" : "flex-start",
//         color: currentMenu === menu ? "#79D7BE" : "white",
//         "&:hover": { color: "#79D7BE" },
//       }}
//     >
//       {!collapsed && label}
//     </Button>
//     {currentMenu === menu && !collapsed && (
//       <Box sx={{ paddingLeft: "5px", paddingTop: "8px" }}>
//         {links.map((link, index) => (
//           <Link
//             key={index}
//             to={link.to}
//             onClick={() => handleLinkClick(link.to)}
//             style={{
//               display: "block",
//               padding: "8px 0",
//               color: "white",
//               textDecoration: "none",
//               marginLeft: "2px",
//               borderRadius: "4px",
//               transition: "background-color 0.3s, color 0.3s",
//               "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)", color: "#fff" },
//             }}
//           >
//             {link.label}
//             {activeLink === link.to && (
//               <span
//                 style={{
//                   width: "8px",
//                   height: "8px",
//                   borderRadius: "50%",
//                   backgroundColor: "#79D7BE",
//                   marginLeft: "8px",
//                   display: "inline-block",
//                 }}
//               />
//             )}
//           </Link>
//         ))}
//       </Box>
//     )}
//   </Box>
// );

// export default Navbar;





import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, IconButton, Divider, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LenderMaster from "../Transcations/Lendermaster.js";
import SanctionDetails from "../Transcations/SanctionDetails.js";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpIcon from "@mui/icons-material/Help";
import Logo from "../Images/SriFin_Logo.png";

const Navbar = ({ onToggle }) => {

  const [drop, setDrop] = useState(false);

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
    if (collapsed) setCollapsed(false);
    // const [collapsed, setCollapsed] = useState(false);

    setCurrentMenu(currentMenu === menu ? null : menu);
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
          paddingLeft: "16px",
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
            justifyContent: "center",
            marginRight: "70px",
          }}
        >
          <img src={Logo} alt="Logo" style={{ width: "120px", height: "30px" }} />
        </div>
      </div>
      {/* <Sidebar collapsed={collapsed} toggleSidebar={() => setCollapsed(!collapsed)} />s */}
      {/* <LenderMaster sidebarWidth={sidebarWidth} /> */}
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
            backgroundColor: "#000957",
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
          // onClick={() => {
          //   if (typeof handleToggle === "function") {
          //     handleToggle();
          //   }
          //   setDrop((prev) => !prev);
          //   setCollapsed(!collapsed);
          // }}
          onClick={() => { handleToggle(); setCollapsed(!collapsed); }}
        // onClick={() => setCollapsed(!collapsed)}
        >
          <MoreVertIcon />
        </IconButton>

        <Divider sx={{ backgroundColor: theme.palette.divider }} />

        {/* Sidebar Menu */}
        <nav>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "5px" }}>
            <NavItem label="Data Creation" icon={<WorkIcon />} menu="DataCreation" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/DataCreation/LenderMaster", label: "LenderMaster" },
              { to: "/DataCreation/SanctionDetails", label: "Sanction Details" },
              { to: "/DataCreation/ROCForm", label: "ROC Form" },
              { to: "/DataCreation/RepaymentDetails", label: "Repayment Details" },
              { to: "/DataCreation/ExecutedDocuments", label: "Executed Documents" },
              { to: "/DataCreation/TrancheDetails", label: "Tranche Details" },
              { to: "/DataCreation/InterestRate", label: "Interest Rate" },
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

            <NavItem label="Settings" icon={<SettingsIcon />} menu="Settings" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/Settings/UserCreation", label: "User Creation" },
              { to: "/Settings/LoginRights", label: "Login Rights" },
              { to: "/Settings/ChangePassword", label: "Change Password" },
              { to: "/Settings/Login", label: "Login" },
              { to: "/Settings/Exit", label: "Exit" },
            ]} collapsed={collapsed} />

            <NavItem label="Approval Pending" icon={<HelpIcon />} menu="Approve" currentMenu={currentMenu} handleMenuClick={handleMenuClick} activeLink={activeLink} setActiveLink={setActiveLink} links={[
              { to: "/Approve/LenderMaster", label: "LenderMaster" },
            ]} collapsed={collapsed} />
          </ul>
        </nav>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", padding: "16px" }}>
        {/* Page Content Goes Here */}
        <div style={{ flexGrow: 1, marginLeft: sidebarWidth - 200 }}>
          {/* <LenderMaster  sidebarWidth={sidebarWidth} /> */}
          {/* <SanctionDetails sidebarWidth={sidebarWidth} /> */}
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
      // <ul style={{ listStyle: "none", paddingLeft: "0px", marginTop: "0px" }}>
      //   {links.map((link, index) => (
      //     <li key={index}>
      //       <Link
      //         to={link.to}
      //         onClick={() => setActiveLink(link.to)}
      //         style={{
      //           display: "block",
      //           padding: "8px 0",
      //           justifyContent:"left",
      //           color: activeLink === link.to ? "#79D7BE" : "white",
      //           textDecoration: "none",
      //           transition: "color 0.3s",
      //         }}
      //       >
      //         {link.label}
      //       </Link>
      //     </li>
      //   ))}
      // </ul>

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



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Drawer, IconButton, Divider, Box } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import WorkIcon from "@mui/icons-material/Work";
// import BusinessIcon from "@mui/icons-material/Business";
// import SettingsIcon from "@mui/icons-material/Settings";
// import HelpIcon from "@mui/icons-material/Help";
// import Logo from "../Images/SriFin_Logo.png";

// const Navbar = () => {
//   const [currentMenu, setCurrentMenu] = useState(null);
//   const [collapsed, setCollapsed] = useState(false);
//   const theme = useTheme();

//   const handleMenuClick = (menu) => {
//     setCurrentMenu(currentMenu === menu ? null : menu);
//   };

//   return (
//     <Box sx={{ display: "flex" }}>
//       {/* Top Bar */}
//       <div
//         style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "60px",
//           backgroundColor: "#1f2937",
//           display: "flex",
//           alignItems: "center",
//           zIndex: 1000,
//           paddingLeft: "16px",
//         }}
//       >
//         {/* Logo */}
//         <div
//           style={{
//             width: "160px",
//             height: "40px",
//             backgroundColor: "#ffffff",
//             borderRadius: "8px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             marginRight: "70px",
//           }}
//         >
//           <img src={Logo} alt="Logo" style={{ width: "120px", height: "30px" }} />
//         </div>
//       </div>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: collapsed ? 80 : 260,
//           flexShrink: 0,
//           "& .MuiDrawer-paper": {
//             width: collapsed ? 80 : 260,
//             marginTop: "60px",
//             backgroundColor: "#000957",
//             color: theme.palette.common.white,
//             transition: "width 0.3s ease-in-out",
//           },
//         }}
//       >
//         {/* Collapse Button */}
//         <IconButton
//           sx={{
//             color: "white", alignSelf: "center", margin: "5px",
//             transition: "transform 0.3s",
//             transform: collapsed ? "rotate(90deg)" : "rotate(90deg)",
//           }}
//           onClick={() => setCollapsed(!collapsed)}
//         >
//           <MoreVertIcon />
//         </IconButton>

//         <Divider sx={{ backgroundColor: theme.palette.divider }} />

//         {/* Sidebar Menu */}
//         <nav>
//           <ul style={{ listStyle: "none", padding: 0 }}>
//             <NavItem label="Data Creation" icon={<WorkIcon />} menu="DataCreation" currentMenu={currentMenu} handleMenuClick={handleMenuClick} links={[
//               { to: "/DataCreation/LenderMaster", label: "Lender Master" },
//               { to: "/DataCreation/SanctionDetails", label: "Sanction Details" },
//             ]} collapsed={collapsed} />

//             <NavItem label="Reports" icon={<BusinessIcon />} menu="Reports" currentMenu={currentMenu} handleMenuClick={handleMenuClick} links={[
//               { to: "/Reports/LenderMaster", label: "Lender Master" },
//               { to: "/Reports/SanctionDetails", label: "Sanction Details" },
//             ]} collapsed={collapsed} />

//             <NavItem label="Settings" icon={<SettingsIcon />} menu="Settings" currentMenu={currentMenu} handleMenuClick={handleMenuClick} links={[
//               { to: "/Settings/UserCreation", label: "User Creation" },
//               { to: "/Settings/ChangePassword", label: "Change Password" },
//             ]} collapsed={collapsed} />

//             <NavItem label="Help" icon={<HelpIcon />} menu="Help" currentMenu={currentMenu} handleMenuClick={handleMenuClick} links={[
//               { to: "/Help/Support", label: "Support" },
//             ]} collapsed={collapsed} />
//           </ul>
//         </nav>
//       </Drawer>
//     </Box>
//   );
// };

// const NavItem = ({ label, icon, menu, currentMenu, handleMenuClick, links, collapsed }) => (
//   <li>
//     <div
//       onClick={() => handleMenuClick(menu)}
//       style={{
//         cursor: "pointer",
//         display: "flex",
//         alignItems: "center",
//         padding: "10px",
//         color: currentMenu === menu ? "#79D7BE" : "white",
//       }}
//     >
//       {icon}
//       {!collapsed && <span style={{ marginLeft: "10px" }}>{label}</span>}
//     </div>
//     {currentMenu === menu && !collapsed && (
//       <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
//         {links.map((link, index) => (
//           <li key={index}>
//             <Link to={link.to} style={{ textDecoration: "none", color: "white" }}>
//               {link.label}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     )}
//   </li>
// );

// export default Navbar;