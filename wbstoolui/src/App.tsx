import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';
import { AuthService } from './hooks/AuthService';
import Drivers from './pages/Drivers';
import ProjectEdit from './pages/ProjectEdit';

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoginDialogOpen, setOpenLoginDialog] = useState(false);
    const [isRegisterDialogOpen, setOpenRegisterDialog] = useState(false);
    const authService = useMemo(() => new AuthService(), []);

    const handleLoginOpen = () => setOpenLoginDialog(true);
    const handleLoginSubmit = () => setIsAuthenticated(true);
    const handleLogout = () => setIsAuthenticated(false);
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
                handleLogout={handleLogout}
            />
            <DrawerComponent
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
            />
            <Routes>
                <Route path="/" element={<Navigate to="/projects/96b9faa7-a37b-4d4c-8b79-461979ed5080/edit" />} />
                <Route path="/projects/:projectId/edit" element={<ProjectEdit />} />
                <Route path="/projects" element={<Drivers />} />
            </Routes>
        </Router>
    );
};

export default App;
