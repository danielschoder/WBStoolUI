//import { useEffect, useState } from 'react';
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';
//import { useServices } from './hooks/useServices';
import ProjectEdit from './pages/ProjectEdit';
import Projects from './pages/Projects';
import { ServiceProvider } from './services/ServiceProvider';

const App: React.FC = () => {
    //const { authApiService } = useServices();
    const [drawerOpen, setDrawerOpen] = useState(false);

    //useEffect(() => {
    //    authApiService.logVisitor();
    //}, [authApiService]);

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
