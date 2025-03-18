// import React, { useState, useRef } from "react";
// import { Home, Settings, User, Menu, X, ChevronDown } from "lucide-react"; // Importing icons
// import "./Dashboard.css"; // Importing CSS

// const Sidebar = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
//   const homeRef = useRef(null);
//   const userName = "John Doe"; // Example username

//   // Toggle API popup beside "Home"
//   const togglePopup = () => {
//     if (homeRef.current) {
//       const rect = homeRef.current.getBoundingClientRect();
//       setPopupPosition({ top: rect.top, left: rect.right + 10 });
//     }
//     setIsPopupOpen(!isPopupOpen);
//   };

//   // Toggle User Dropdown
//   const toggleUserDropdown = () => {
//     setIsUserDropdownOpen(!isUserDropdownOpen);
//   };

//   const closePopup = () => setIsPopupOpen(false);
//   const handleLogout = () => alert("Logged out!"); // Logout action

//   return (
//     <div className="app-container">
//       {/* Top Navbar */}
//       <nav className="navbar">
//         <h2>Borrowing Management</h2>
//         <div className="user-section">
//           <button className="user-btn" onClick={toggleUserDropdown}>
//             <User size={24} /> <ChevronDown size={18} />
//           </button>
//           {isUserDropdownOpen && (
//             <div className="user-dropdown">
//               <p>{userName}</p>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </div>
//           )}
//         </div>
//       </nav>

//       <div className="content-container">
//         {/* Sidebar */}
//         <div className={`sidebar ${isCollapsed ? "sidebar-collapsed" : "sidebar-expanded"}`}>
//           <button className="toggle-btn" onClick={() => setIsCollapsed(!isCollapsed)}>
//             <Menu size={24} />
//           </button>
//           <nav className="nav-links">
//             <NavItem icon={<Home size={24} />} text="Home" isCollapsed={isCollapsed} onClick={togglePopup} ref={homeRef} />
//             <NavItem icon={<User size={24} />} text="Profile" isCollapsed={isCollapsed} />
//             <NavItem icon={<Settings size={24} />} text="Settings" isCollapsed={isCollapsed} />
//           </nav>
//         </div>

//         {/* Popup beside Home */}
//         {isPopupOpen && (
//           <div className="popup-box" style={{ top: `${popupPosition.top}px`, left: `${popupPosition.left}px` }}>
//             <button className="close-btn" onClick={closePopup}><X size={20} /></button>
//             <h3>More Options</h3>
//             <ul className="popup-links">
//               <li><a href="">Sub Option 1</a></li>
//               <li><a href="">Sub Option 2</a></li>
//               <li><a href="">Sub Option 3</a></li>
//             </ul>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="main-content">
//           <h1>Borrowing Management</h1>
//         </div>
//       </div>
//     </div>
//   );
// };

// const NavItem = React.forwardRef(({ icon, text, isCollapsed, onClick }, ref) => {
//   return (
//     <div ref={ref} className={`nav-item ${isCollapsed ? "centered" : ""}`} onClick={onClick}>
//       {icon}
//       {!isCollapsed && <span>{text}</span>}
//     </div>
//   );
// });

// export default Sidebar;




import React, { useState, useRef } from "react";
import { Home, Settings, User, Menu, ChevronDown, X } from "lucide-react";
import Logo from "../Images/SriFin_Logo.png";
import "./Dashboard.css";

import { Drawer, Button, Box, Divider, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Three-dot icon

// Icon imports
import SettingsIcon from "@mui/icons-material/Settings";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import HelpIcon from "@mui/icons-material/Help";

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const homeRef = useRef(null);
  const userName = "John Doe"; // Replace with dynamic data

  const [currentMenu, setCurrentMenu] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [collapsed, setCollapsed] = useState(false); // New: Control collapse state
  const theme = useTheme();

  const handleMenuClick = (menu) => {
    setCurrentMenu(currentMenu === menu ? null : menu);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const togglePopup = () => {
    if (homeRef.current) {
      const rect = homeRef.current.getBoundingClientRect();
      setPopupPosition({ top: rect.top, left: rect.right });
    }
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => setIsPopupOpen(false);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);
  const handleLogout = () => alert("Logged out!");

  return (
    <></>
  );
};

// const NavItem = React.forwardRef(({ icon, text, isCollapsed, onClick }, ref) => (
//   <div ref={ref} className={`nav-item ${isCollapsed ? "justify-center" : "gap-2"}`} onClick={onClick}>
//     {icon}
//     {!isCollapsed && <span>{text}</span>}
//   </div>
// ));

export default Dashboard;

