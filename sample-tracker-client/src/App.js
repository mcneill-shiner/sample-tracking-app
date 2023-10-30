import React from "react";
import { AuthProvider } from "./components/AuthContext";
import AppContent from "./AppContent";

function App() {
  return (
    // wrap the AppContent component with AuthProvider to provide auth context
    <AuthProvider>
      <AppContent /> {/* this is where main app content will be rendered */}
    </AuthProvider>
  );
}

export default App;
