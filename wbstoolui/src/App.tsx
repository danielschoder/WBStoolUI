import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';
import { AuthService } from './hooks/AuthService';
import ProjectEdit from './pages/ProjectEdit';
import Projects from './pages/Projects';

const App: React.FC = () => {
    const authService = useMemo(() => new AuthService(), []);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());
    const [isLoginDialogOpen, setOpenLoginDialog] = useState(false);
    const [isRegisterDialogOpen, setOpenRegisterDialog] = useState(false);

    const handleLoginOpen = () => setOpenLoginDialog(true);
    const handleLoginSubmit = () => setIsAuthenticated(true);
    const handleLogout = () => {
        setIsAuthenticated(false);
        authService.logout();
    }
    const handleRegisterOpen = () => setOpenRegisterDialog(true);
    const handleRegisterSubmit = () => setIsAuthenticated(true);

    useEffect(() => {
        authService.logVisitor();
    }, [authService]);

    return (
        <Router>
            <AppBarComponent
                authService={authService}
                isAuthenticated={isAuthenticated}
                setDrawerOpen={setDrawerOpen}
                isLoginDialogOpen={isLoginDialogOpen}
                setOpenLoginDialog={setOpenLoginDialog}
                handleLoginOpen={handleLoginOpen}
                handleLoginSubmit={handleLoginSubmit}
                isRegisterDialogOpen={isRegisterDialogOpen}
                setOpenRegisterDialog={setOpenRegisterDialog}
                handleRegisterOpen={handleRegisterOpen}
                handleRegisterSubmit={handleRegisterSubmit}
            />
            <DrawerComponent
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                handleLogout={handleLogout}
            />
            <Routes>
                <Route path="/" element={<Navigate to="/projects/96b9faa7-a37b-4d4c-8b79-461979ed5080/edit" replace />} />
                <Route path="/projects/:projectId/edit" element={<ProjectEdit />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </Router>
    );
};

export default App;
