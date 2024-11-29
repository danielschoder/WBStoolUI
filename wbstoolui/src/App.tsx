import { useEffect, useMemo, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';
import { AuthService } from './hooks/AuthService';
import Drivers from './pages/Drivers';
import Home from './pages/Home';

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
                <Route path="/" element={<Home />} />
                <Route path="/drivers" element={<Drivers />} />
            </Routes>
        </Router>
    );
};

export default App;
