import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddNotePage from './pages/AddNotePage';
import ViewNotesPage from './pages/ViewNotesPage';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EditNotePage from './pages/EditNotePage';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/add-note" element={<AddNotePage />} />
              <Route path="/view-notes" element={<ViewNotesPage />} />
              <Route path="/:id" element={<EditNotePage />} />
            </Routes>
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
