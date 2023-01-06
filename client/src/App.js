import Home from "./pages/home/Home";
import LogIn from "./pages/login/LogIn";
import List from "./pages/list/List";
import Driver from "./pages/driver/Driver";
import NewDriver from "./pages/NewDriver/NewDriver";
import { driverInputs } from "./formSource";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import authentication from "./firebase/authentication";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log(currentUser);
  }, []);

  return (
    <div className="App">
      <button
        onClick={() => {
          console.log(authentication.getCurrentUser());
        }}
      >
        signed in user
      </button>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<LogIn />} />
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
