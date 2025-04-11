
import React, { useState } from "react";
import { Route, Routes, Navigate,useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login/Login.js";
import Dashboard from "./Components/DashBoard/Dashboard.js";
import Navbar from "./Components/NavBar/Navbar.js";
import BackButton from "./Components/NavBar/Backbutton.js"

import LenderMaster from "./Components/Transcations/Lendermaster.js";
import SanctionDetails from "./Components/Transcations/SanctionDetails.js";
import BankAccount from "./Components/Transcations/RepaymentDetails.js";
import Rocform from "./Components/Transcations/Rocform.js";
import Documentsupload from "./Components/Transcations/Executeddocuments.js";
import LenderMasterApproval from "./Components/Approval/LenderMasterapproval.js";
import SanctionDetailsApproval from "./Components/Approval/SanctionDetailsapproval.js";
import RocFormApproval from "./Components/Approval/RocFormapproval.js"
import BankRepaymentApprovalAll from "./Components/Approval/BankRepaymentapproval.js"
import ExecutedDocumentsApprovalAll from "./Components/Approval/ExecutedDocumentsapproval.js"
import RepaymentScheduleApprovalAll from "./Components/Approval/repaymentSheduleapproval.js"
import Interestviewapprove from "./Components/Details/interestrateviewapprove.js"
import SanctionDetailsapprove from "./Components/Details/Sanctionmasterdetailapproval.js"
import ROCFormsapprove from "./Components/Details/Rocformsdetailapproval.js";
import BankRepaymentapprove from "./Components/Details/Bankrepaymentinnerapprove.js"
import Executedapprove from "./Components/Details/Executedinnerapprove.js"
import Trancheapprove from "./Components/Details/Tranchedetailapproval.js"
import LenderDetailsapprove from "./Components/Details/Lendermasterdetailsapprove.js";
import LenderMastermain from "./Components/Mainpages/LenderMastermain.js";
import LenderDetailsmaker from "./Components/Details/Lendermasterdetailsmaker.js";
import SanctionDetailsmaker from "./Components/Details/Sanctionmasterdetailsmaker.js"
import RocDetailmaker from "./Components/Details/Rocformdetailmaker.js"
import BankRepaymentmaker from "./Components/Details/Bankrepaymentdetailmaker.js"
import Executedmaker from "./Components/Details/Executedviewmaker.js"
import Tranchemaker from "./Components/Details/Tranchemaker.js"
import Interestratemaker from "./Components/Details/InterestRatemaker.js"
import AlertsPage from "./Components/Alerts/Alertmain.js";
import Addalert from "./Components/Alerts/AddAlert.js";
import SanctionDetailsMain from "./Components/Mainpages/Sanctiondetailsmain.js";
import RocFormMain from "./Components/Mainpages/ROCMain.js";
import BankAccountsMain from "./Components/Mainpages/Repaymentdetailsmain.js";
import ExecutedDocumentsMain from "./Components/Mainpages/Executeddocumentsmain.js";

import TrancheDetailsMain from "./Components/Mainpages/Tranchedetailsmain.js";
import Tranchedetails from "./Components/Transcations/Tranchedetails.js";

import InterestRateChangeMain from "./Components/Mainpages/Interestchangemain.js";
import InterestRateChangeForm from "./Components/Transcations/Intrestchange.js";
import ExcelUpload from "./Components/Transcations/Repaymentscheduleupload.js";
import DateWiseLoanRepaymentReport from "./Components/Reports/Datewiserepaymentwisereport.js";
import ExecutedDocumentApproval from "./Components/Approval/ExecutedDocumentsapproval.js";
import TrancheDetailsApproval from "./Components/Approval/Tranchedetailsmainapproval.js";
import InterestRateChangeApproval from "./Components/Approval/interstrateapproval.js";

//reports
import LenderMasterReport from "./Components/Reports/Lendermasterreport.js"
import SessionTimeout from "./Components/SessionTimeOut/sessionTimeOut.js"
import SessionExpired from "./Components/SessionTimeOut/sessionExpired.js"

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? element : <Navigate to="/" />;
}
function App() {
  const [drop, setDrop] = useState(false);
  const location = useLocation();
  const hideBackButtonRoutes = ["/", "/dashboard", "/session-expired"];

  return (

      <div style={{ display: "flex" }}>
        {/* Persistent Navbar */}

        {/* Main Content Area */}
        <main style={{ flexGrow: 1, padding: "2px", marginLeft: "0px" }}>
          <SessionTimeout />
          {!hideBackButtonRoutes.includes(location.pathname.toLowerCase()) && (
            <BackButton isDropped={drop} />
          )}
          {/* {window.location.pathname !== "/" && <BackButton isDropped={drop} />} */}
          {/* <backButton /> */}
          <Routes>

            <Route path="/" element={<Login />} />
            {/* <ProtectedRoute> */}
            <Route path="/dashboard" element={<><ProtectedRoute /><Dashboard isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/LenderMaster" element={<><ProtectedRoute /><LenderMaster isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/LenderMaster" element={<><ProtectedRoute /><LenderMastermain isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/SanctionDetails" element={<><ProtectedRoute /><SanctionDetailsMain isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/RepaymentDetails" element={<><ProtectedRoute /><BankAccountsMain isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/ROCForm" element={<><ProtectedRoute /><RocFormMain isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/ExecutedDocuments" element={<><ProtectedRoute /><ExecutedDocumentsMain isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/TrancheDetails" element={<><ProtectedRoute /><TrancheDetailsMain isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/DataCreation/InterestRate" element={<><ProtectedRoute /><InterestRateChangeMain isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            {<Route path="/DataCreation/RepaymentSchedule" element={<><ProtectedRoute /><ExcelUpload isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />}

            <Route path="/Approve/LenderMaster" element={<><ProtectedRoute /><LenderMasterApproval isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/SanctionDetails" element={<><ProtectedRoute /><SanctionDetailsApproval isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/ROCForm" element={<><ProtectedRoute /><RocFormApproval isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/BankRepayment" element={<><ProtectedRoute /><BankRepaymentApprovalAll isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/ExecutedDocuments" element={<><ProtectedRoute /><ExecutedDocumentsApprovalAll isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/RepaymentSchedule" element={<><ProtectedRoute /><RepaymentScheduleApprovalAll isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/Executeddocumentsupload" element={<><ProtectedRoute /><ExecutedDocumentApproval isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/Tranchedetails" element={<><ProtectedRoute /><TrancheDetailsApproval isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Approve/Interestrate" element={<><ProtectedRoute /><InterestRateChangeApproval isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />

            {/* Approver */}
            <Route path="/lenderapprove/:lender_code" element={<><ProtectedRoute /><LenderDetailsapprove isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/sanctionapprove/:sanction_id" element={<><ProtectedRoute /><SanctionDetailsapprove isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/rocapprove/:sanction_id" element={<><ProtectedRoute /><ROCFormsapprove isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/bankrepaymentapprove/:sanction_id" element={<><ProtectedRoute /><BankRepaymentapprove isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/executedapprove/:sanction_id" element={<><ProtectedRoute /><Executedapprove isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/trancheapprove/:tranche_id" element={<><ProtectedRoute /><Trancheapprove isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/interestrateapprove/:sanction_id" element={<><ProtectedRoute /><Interestviewapprove isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />


            {/* Maker */}
            <Route path="/lendermaker/:lender_code" element={<><ProtectedRoute /><LenderDetailsmaker isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/sanctionmaker/:sanction_id" element={<><ProtectedRoute /><SanctionDetailsmaker isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/rocmaker/:sanction_id" element={<><ProtectedRoute /><RocDetailmaker isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/bankrepaymentmaker/:sanction_id" element={<><ProtectedRoute /><BankRepaymentmaker isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/executedmaker/:sanction_id" element={<><ProtectedRoute /><Executedmaker isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/tranchemaker/:tranche_id" element={<><ProtectedRoute /><Tranchemaker isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />
            <Route path="/interestratemaker/:sanction_id" element={<><ProtectedRoute /><Interestratemaker isDropped={drop} />, <Navbar onToggle={setDrop} /> </>} />

            <Route path="/Alerts/Alertmain" element={<><ProtectedRoute /><AlertsPage isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/SanctionDetails" element={<><ProtectedRoute /><SanctionDetails isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/AddAlert" element={<><ProtectedRoute /><Addalert isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/addrocform" element={<><ProtectedRoute /><Rocform isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/addbankaccount" element={<><ProtectedRoute /><BankAccount isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/addexecuteddocument" element={<><ProtectedRoute /><Documentsupload isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/addtranche" element={<><ProtectedRoute /><Tranchedetails isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/add-interestrate" element={<><ProtectedRoute /><InterestRateChangeForm isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />

            {/* reports */}
            <Route path="/Reports/LenderMaster" element={<><ProtectedRoute /><LenderMasterReport isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Reports/SanctionDetails" element={<><ProtectedRoute /><LenderMasterReport isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Reports/TrancheDetails" element={<><ProtectedRoute /><LenderMasterReport isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Reports/RepaymentSchedule" element={<><ProtectedRoute /><LenderMasterReport isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Reports/RepaymentStatement" element={<><ProtectedRoute /><LenderMasterReport isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            <Route path="/Reports/DataWiseLoanRepayment" element={<><ProtectedRoute /><DateWiseLoanRepaymentReport isDropped={drop} />, <Navbar onToggle={setDrop} /></>} />
            {/* </ProtectedRoute> */}
            <Route path="/session-expired" element={<SessionExpired />} />
          </Routes>

        </main>
      </div>

  );
}

export default App;
