import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get seeds stats
export const getSeedsStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/seed/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create seed
export const createSeed = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/seed`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get all seeds
export const getAllSeeds = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/seed/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get seed
export const getSeed = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/seed/?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// delete seed
export const deleteSeedImage = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/seed/image?imgUid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update seed
export const updateSeed = async (data: any, uuid: any, token: string) => {
  try {
    const res = await axios.patch(`${baseUrl}/seed?uuid=${uuid}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete seed
export const deleteSeed = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/seed?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
