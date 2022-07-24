import { Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="signup" element={<SignUpForm />} />
      </Routes>
    </div>
  );
}

export default App;
