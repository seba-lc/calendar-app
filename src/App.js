import { Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import SetCalendarPage from "./pages/SetCalendarPage/SetCalendarPage";
import SetUsersPage from "./pages/SetUsersPage/SetUsersPage";
import SetAreasPage from "./pages/SetAreasPage/SetAreasPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/setareas" element={<SetAreasPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/setcalendar" element={<SetCalendarPage />} />
        <Route path="/setusers" element={<SetUsersPage />} />
      </Routes>
    </>
  );
}

export default App;
