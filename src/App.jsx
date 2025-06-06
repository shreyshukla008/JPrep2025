// App.jsx

import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "./context/ThemeContext";
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light-background text-light-text dark:bg-dark-background dark:text-dark-text">
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
