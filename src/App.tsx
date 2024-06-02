import { Outlet, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='conversations'
          element={
            <div>
              <div>Conversations</div>
              <Outlet />
            </div>
          }
        >
          <Route path=':id' element={<div>Conversation Id Page</div>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
