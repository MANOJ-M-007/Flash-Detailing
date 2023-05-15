// import axios from '../utility/axios';
import { axiosInstance } from "../utility/axios";

const graphData = async () => {
    try {
        const response = await axiosInstance.get("/api/admin/orders/graph",
        );
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const servicesGraphData = async () => {
    try {
        const response = await axiosInstance.get("/api/admin/services/graph",
        );
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const adminApiCalls = {
    graphData,
    servicesGraphData
}
export default adminApiCalls;