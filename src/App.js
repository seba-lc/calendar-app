import { Route, Routes } from "react-router-dom";
import CalendarPage from "./pages/CalendarPage/CalendarPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </>
  );
}

export default App;
