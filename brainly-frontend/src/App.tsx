import Dashboard from "./pages/Dashborad";
import { Signup } from "./pages/Signup";
import {BrowserRouter , Routes , Route } from "react-router-dom"
import { Signin } from "./pages/Signin";

const App:React.FC = ()=>{
  return <BrowserRouter >
    <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
}

export default App