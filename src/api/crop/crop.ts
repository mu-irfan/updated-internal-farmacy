import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get crop stats
export const getCropStats = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// create crop
export const createCrop = async (data: any, token: any) => {
  try {
    const res = await axios.post(`${baseUrl}/crop/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get crops
export const getAllCrops = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get crops list
export const getAllCropsList = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get crop
export const getCrop = async (name: any, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/?crop_name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update crop
export const updateCrop = async (data: any, name: any, token: string) => {
  try {
    const res = await axios.patch(`${baseUrl}/crop/?crop_name=${name}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete crop
export const deleteCrop = async (name: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/crop/?crop_name=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
