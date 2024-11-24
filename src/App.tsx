import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Version 1 Pages

/* 
  import HomePage from "./V1/Pages/HomePage"; 
  import SignUpPage from "./V1/Pages/SignUpPage";
  import SignInPage from "./V1/Pages/SignInPage";
  import TaskPage from "./V1/Pages/TaskPage";
*/




//Version 2 pages
import HomePage from "./V2/Pages/HomePage";
import SignUpPage from "./V2/Pages/SignUpPage";
import SignInPage from "./V2/Pages/SignInPage";
import Dashboard from "./V2/Pages/Dashboard";
import Tasks from "./V2/Pages/Tasks";
import CreateTask from "./V2/Pages/CreateTask";

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
          {/* <Route path="/tasks" element={<TaskPage />} /> */}
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/SignUp" element={<SignUpPage />} />
          <Route path="/Dashboard" element={<Dashboard />} >
            <Route path="" element={<Tasks />} />
            <Route path="newTask" element={<CreateTask />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;