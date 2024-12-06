import { useContext } from "react";
import { ServiceContainer, ServiceContext } from "../services/ServiceContext";

export const useServices = () => {
    return useContext(ServiceContext) as ServiceContainer;
};
