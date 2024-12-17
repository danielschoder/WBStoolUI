import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import DrawerComponent from './components/DrawerComponent';
import Persons from './pages/Persons';
import Projects from './pages/Projects';
import TaskList from './pages/TaskList';
import { CurrentProjectProvider } from './services/CurrentProjectProvider';
import { ServiceProvider } from './services/ServiceProvider';
import { BeforeUnloadListener } from './components/BeforeUnloadListener';
import LogVisitor from './components/LogVisitor';

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <ServiceProvider>
            <CurrentProjectProvider>
                <LogVisitor />
                <BeforeUnloadListener />
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
                        <Route path="/tasklist" element={<TaskList />} />
                        <Route path="/persons" element={<Persons />} />
                    </Routes>
                </Router>
            </CurrentProjectProvider>
        </ServiceProvider>
    );
};

export default App;
