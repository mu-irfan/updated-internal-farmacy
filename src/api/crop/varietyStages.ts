import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create variety stage
export const createVarietyStage = async (data: any, token: any) => {
  try {
    const res = await axios.post(`${baseUrl}/crop/variety/stage`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get crop variety
export const getCropVariety = async (variety_eng: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/crop/variety?variety_eng=${variety_eng}`,
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

// get crop variety stage
export const getVarietyStage = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/variety/stage?uid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update crop variety stage
export const updateVarietyStage = async (
  data: any,
  uid: any,
  token: string
) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/crop/variety/stage?uid=${uid}`,
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

// delete crop variety stage
export const deleteVarietyStage = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/crop/variety/stage?uid=${uuid}`,
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
