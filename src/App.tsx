import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import { User } from "@/utils/types";
import socket from "@/utils/constants/socket";
import { LoginPage } from "@/components/pages/LoginPage";
import { AuthContext } from "@/utils/contexts/AuthContext";
import { SocketContext } from "@/utils/contexts/SocketContext";
import { RegisterPage } from "@/components/pages/RegisterPage";
import ConversationPage from "@/components/pages/ConversationPage";
import { AuthenticatedRoute } from "@/components/AuthenticatedRoute";
import ConversationChannelPage from "@/components/pages/ConversationChannelPage";

function App() {
  const [user, setUser] = useState<User>();

  return (
    <>
      <SocketContext.Provider value={socket}>
        <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              path='conversations'
              element={
                <AuthenticatedRoute>
                  <ConversationPage />
                </AuthenticatedRoute>
              }
            >
              <Route path=':id' element={<ConversationChannelPage />} />
            </Route>
          </Routes>
        </AuthContext.Provider>
      </SocketContext.Provider>
    </>
  );
}

export default App;
