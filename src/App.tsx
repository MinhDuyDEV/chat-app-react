import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "@/components/pages/RegisterPage";
import { LoginPage } from "@/components/pages/LoginPage";
import ConversationPage from "./components/pages/ConversationPage";
import ConversationChannelPage from "./components/pages/ConversationChannelPage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='conversations' element={<ConversationPage />}>
          <Route path=':id' element={<ConversationChannelPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
