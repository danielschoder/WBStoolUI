//import { useEffect, useState } from 'react';
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';
//import { useServices } from './hooks/useServices';
import ProjectEdit from './pages/ProjectEdit';
import Projects from './pages/Projects';
import Persons from './pages/Persons';
import { CurrentProjectProvider } from './services/CurrentProjectProvider';
import { ServiceProvider } from './services/ServiceProvider';

const App: React.FC = () => {
    //const { authApiService } = useServices();
    const [drawerOpen, setDrawerOpen] = useState(false);

    //useEffect(() => {
    //    authApiService.logVisitor();
    //}, [authApiService]);

    return (
        <ServiceProvider>
            <CurrentProjectProvider>
                <Router>
                    <AppBarComponent
                        setDrawerOpen={setDrawerOpen}
                    />
                    <DrawerComponent
                        drawerOpen={drawerOpen}
                        setDrawerOpen={setDrawerOpen}
                    />
                    <Routes>
                        <Route path="/" element={<Navigate to="/projects" replace />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/tasklist" element={<ProjectEdit />} />
                        <Route path="/persons" element={<Persons />} />
                    </Routes>
                </Router>
            </CurrentProjectProvider>
        </ServiceProvider>
    );
};

export default App;
