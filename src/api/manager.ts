import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get managers stats
export const getManagerStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/franchise/manager/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create manager
export const createManager = async (data: any, token: any) => {
  try {
    const res = await axios.post(`${baseUrl}/franchise/manager`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get managers
export const getAllManagers = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/franchise/manager/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update manager
export const updateManager = async (data: any, token: string) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/franchise/manager?uuid=${data.uuid}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete manager
export const deleteManager = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/franchise/manager?uuid=${uuid}`,
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
