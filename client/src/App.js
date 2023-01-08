import Home from "./pages/home/Home";
import LogIn from "./pages/login/LogIn";
import List from "./pages/list/List";
import Driver from "./pages/driver/Driver";
import NewDriver from "./pages/NewDriver/NewDriver";
import { driverInputs } from "./formSource";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import NewAdmin from "./pages/newAdmin/NewAdmin";
import Profile from "./pages/profile/Profile";
import { AuthProvider } from "./contexts/userContext";
import Bugs from "./pages/bugs/Bugs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/">
              <Route path="login" element={<LogIn />} />
              <Route element={<PrivateRoutes />}>
                <Route index element={<Home />} />
                <Route path="drivers">
                  <Route index element={<List />}></Route>
                  <Route path=":id" element={<Driver />}></Route>
                  <Route
                    path="new"
                    element={<NewDriver inputs={driverInputs} />}
                  ></Route>
                </Route>
                <Route path="bugs">
                  <Route index element={<Bugs />}></Route>
                </Route>
                <Route path="new-admin" element={<NewAdmin />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
