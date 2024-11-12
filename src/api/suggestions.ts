import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get suggestions stats
export const getSuggestionsStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/query/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create query
export const createQuery = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/query/ticket`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get all queries
export const getAllQueries = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/query/ticket/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get queries chats
export const getQueriesChats = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/query/ticket-chat?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create query
export const queryResponseViewed = async (uuid: any, token: any) => {
  try {
    const res = await axios.post(
      `${baseUrl}/query/response-viewed?uuid=${uuid}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

// create further chat
export const createFurtherQuery = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/query/further`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// delete query
export const deleteQuery = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/query/ticket?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
