import { useEffect } from 'react';
import { useServices } from '../hooks/useServices';

const LogVisitor: React.FC = () => {
    const { authApiService } = useServices();

    useEffect(() => {
        authApiService.logVisitor();
    }, [authApiService]);

    return null;
};

export default LogVisitor;
