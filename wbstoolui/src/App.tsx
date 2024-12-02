import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';
import ProjectEdit from './pages/ProjectEdit';
import Projects from './pages/Projects';
import { AuthApiService } from './services/AuthApiService';
import { ServiceProvider } from './services/ServiceProvider';

const App: React.FC = () => {
    const authService = useMemo(() => new AuthApiService(), []);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {
        authService.logVisitor();
    }, [authService]);

    return (
        <ServiceProvider>
            <Router>
                <AppBarComponent
                    setDrawerOpen={setDrawerOpen}
                />
                <DrawerComponent
                    drawerOpen={drawerOpen}
                    setDrawerOpen={setDrawerOpen}
                />
                <Routes>
                    <Route path="/" element={<Navigate to="/projects/96b9faa7-a37b-4d4c-8b79-461979ed5080/edit" replace />} />
                    <Route path="/projects/:projectId/edit" element={<ProjectEdit />} />
                    <Route path="/projects" element={<Projects />} />
                </Routes>
            </Router>
        </ServiceProvider>
    );
};

export default App;
