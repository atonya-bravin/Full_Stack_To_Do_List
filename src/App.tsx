import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./V1/Pages/HomePage";
import TaskPage from "./V1/Pages/TaskPage";
import SignInPage from "./V1/Pages/SignInPage";
import SignUpPage from "./V1/Pages/SignUpPage";

const App = () => {
  return(
    <div className="w-full h-[100vh] bg-[#f4f0ec] bg-opacity-10 flex items-center justify-center">
      {/* 
        Configuration of the application endpoints that will be used to access different pages using 
        either the nav or implicit navigation. 
      */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;