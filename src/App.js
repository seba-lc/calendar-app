import { Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import SetCalendarPage from "./pages/SetCalendarPage/SetCalendarPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/setcalendar" element={<SetCalendarPage />} />
      </Routes>
    </>
  );
}

export default App;
