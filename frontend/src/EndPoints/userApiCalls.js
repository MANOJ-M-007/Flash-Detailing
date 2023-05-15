// import axios from '../utility/axios';
import { axiosInstance } from "../utility/axios";

const placeOrder = async (data) => {
    try {
        const response = await axiosInstance.post("/api/users/order/create", data);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const listOrders = async (userInfo) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axiosInstance.get("/api/users/order/list", config);
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const addComment = async (comment, provider, userInfo) => {
    try {
        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        const response = await axiosInstance.patch("/api/users/comments", { comment, provider }, config);
        return response
    } catch (error) {
        console.log(error.message);
    }
}

const userChats = async (id, receiverId) => {
    try {

        const response = await axiosInstance.get(`/api/chats/userChat/${id}/${receiverId}`,
        );
        return response
    } catch (error) {
        console.log(error.message);
    }
}

const getUsers = async (id) => {
    try {
        const response = await axiosInstance.get(`/api/chats/getUsers/${id}`,
        );
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const getMessages = async (chatId) => {
    try {
        const response = await axiosInstance.get(`/api/messages/getMessage/${chatId}`,
        );
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const addMessage = async (data) => {
    try {
        const response = await axiosInstance.post('/api/messages/addMessage', data,
        );
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const createChat = async (senderId, receiverId) => {
    try {
        const response = await axiosInstance.post('/api/chats/createChat', { senderId, receiverId },
        );
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const userApiCalls = {
    placeOrder,
    listOrders,
    addComment,
    userChats,
    getUsers,
    getMessages,
    addMessage,
    createChat
}
export default userApiCalls;