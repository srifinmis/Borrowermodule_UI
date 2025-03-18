// // import logo from './logo.svg';
// import './App.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from './Components/Login/Login.js';
// import Dashboard from './Components/DashBoard/Dashboard.js';
// import Navbar from './Components/NavBar/Navbar.js';
// import Lendermaster from './Components/Transcations/Lendermaster.js';

// function App() {
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
//           <Route path="/Navbar" element={<Navbar />} />
//           {/* <Route path="/DataCreation/LenderMaster" element={<><Lendermaster />,<Navbar /></>} /> */}
//         </Routes>
//       </BrowserRouter>

//     </div>
//   );
// }

// export default App;



import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login.js";
import Dashboard from "./Components/DashBoard/Dashboard.js";
import Navbar from "./Components/NavBar/Navbar.js";
import LenderMaster from "./Components/Transcations/Lendermaster.js";
import SanctionDetails from "./Components/Transcations/SanctionDetails.js";
import BankAccount from "./Components/Transcations/RepaymentDetails.js";
import Rocform from "./Components/Transcations/Rocform.js";
import Documentsupload from "./Components/Transcations/Executeddocuments.js"
import LenderMasterApproval from "./Components/Approval/LenderMasterapproval.js"
import Lendermasterdetails from "./Components/Details/Lendermasterdetails.js"
function App() {
  const [drop, setDrop] = useState(false);
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        {/* Persistent Navbar */}


        {/* Main Content Area */}
        <main style={{ flexGrow: 1, padding: "2px", marginLeft: "0px" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<><Dashboard />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/LenderMaster" element={<><LenderMaster isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/SanctionDetails" element={<><SanctionDetails isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/RepaymentDetails" element={<><BankAccount isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/ROCForm" element={<><Rocform isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/ExecutedDocuments" element={<><Documentsupload isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/LenderMaster" element={<><LenderMasterApproval isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/lender/:lender_code" element={<><Lendermasterdetails isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
