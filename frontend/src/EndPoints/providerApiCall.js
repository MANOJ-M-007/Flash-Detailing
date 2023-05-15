// import axios from '../utility/axios';
import { axiosInstance } from "../utility/axios";


const listOrders = async (userInfo) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axiosInstance.get("/api/provider/order/list", config);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const orderComplete = async (userInfo, Oid) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axiosInstance.patch("/api/provider/order/complete", { Oid }, config);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const graphData = async (userInfo) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axiosInstance.get("/api/provider/orders/graph",
            config
        );
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const providerApiCalls = {
    listOrders,
    orderComplete,
    graphData
}
export default providerApiCalls;