import Home from "./pages/home/Home";
import LogIn from "./pages/login/LogIn";
import List from "./pages/list/List";
import Driver from "./pages/driver/Driver";
import NewDriver from "./pages/NewDriver/NewDriver";
import { driverInputs } from "./formSource";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
                  element={
                    <NewDriver inputs={driverInputs} title={"ADD DRIVER"} />
                  }
                ></Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
