import { Socket } from "socket.io-client";
import { Route, Routes } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { useState, PropsWithChildren } from "react";

import { store } from "@/store";
import { User } from "@/utils/types";
import socket from "@/utils/constants/socket";
import { LoginPage } from "@/components/pages/LoginPage";
import { AuthContext } from "@/utils/contexts/AuthContext";
import { SocketContext } from "@/utils/contexts/SocketContext";
import { RegisterPage } from "@/components/pages/RegisterPage";
import ConversationPage from "@/components/pages/ConversationPage";
import { AuthenticatedRoute } from "@/components/AuthenticatedRoute";
import ConversationChannelPage from "@/components/pages/ConversationChannelPage";

type Props = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  socket: Socket;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <ReduxProvider store={store}>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </AuthContext.Provider>
    </ReduxProvider>
  );
}

function App() {
  const [user, setUser] = useState<User>();

  return (
    <AppWithProviders user={user} setUser={setUser} socket={socket}>
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
    </AppWithProviders>
  );
}

export default App;
