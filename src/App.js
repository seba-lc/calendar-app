import { Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import SetUsersPage from "./pages/SetUsersPage/SetUsersPage";
import SetAreasPage from "./pages/SetAreasPage/SetAreasPage";
import ConfirmationEmailPage from "./pages/ConfirmationEmailPage/ConfirmationEmailPage";
import UserState from "./context/Users/UserState";
import BusinessState from "./context/Businesses/BusinessState";
import ConfirmationAreaEmailPage from "./pages/ConfirmationAreaEmailPage/ConfirmationAreaEmailPage";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <>
      <BusinessState>
        <UserState>
          <Routes>
            <Route path="/" element={<RegistrationPage />} />
            <Route path="/emailconfirmation/:user" element={<ConfirmationEmailPage />} />
            <Route path="/emailconfirmation/area/:user" element={<ConfirmationAreaEmailPage />} />
            <Route path="/setareas" element={<AdminRoute><SetAreasPage /></AdminRoute>} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/setusers" element={<AdminRoute><SetUsersPage /></AdminRoute>} />
          </Routes>
        </UserState>
      </BusinessState>
    </>
  );
}

export default App;

//ME FALTA POR ARREGLAR CALENDARPAGE Y SETUSERSPAGE.
//CON ESO YA ESTARIA TODAS LAS RUTAS PROBADAS. TODO EL CODIGO LIMPIO.