import { Box, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AppBarComponent from './components/AppBarComponent';
import { BeforeUnloadListener } from './components/BeforeUnloadListener';
import DrawerComponent from './components/DrawerComponent';
import LogVisitor from './components/LogVisitor';
import Account from './pages/Account';
import Persons from './pages/Persons';
import Projects from './pages/Projects';
import TaskList from './pages/TaskList';
import { CurrentProjectProvider } from './services/CurrentProjectProvider';
import { ServiceProvider } from './services/ServiceProvider';
import ProjectSettings from './pages/ProjectSettings';

const App: React.FC = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <ServiceProvider>
            <CurrentProjectProvider>
                <LogVisitor />
                <BeforeUnloadListener />
                <Router>
                    <Box sx={{ display: 'flex' }}>
                        <CssBaseline />

                        <AppBarComponent setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />

                        <DrawerComponent
                            drawerOpen={drawerOpen}
                            setDrawerOpen={setDrawerOpen}
                        />

                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                transition: 'margin 0.3s ease-in-out',
                                marginTop: '64px'
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Navigate to="/projects" replace />} />
                                <Route path="/account" element={<Account />} />
                                <Route path="/project" element={<ProjectSettings />} />
                                <Route path="/projects" element={<Projects />} />
                                <Route path="/persons" element={<Persons />} />
                                <Route path="/tasklist" element={<TaskList />} />
                            </Routes>
                        </Box>
                    </Box>
                </Router>
             </CurrentProjectProvider>
        </ServiceProvider>
    );
};

export default App;
