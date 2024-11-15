import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create crop
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

// get varaities
export const getAllCropVarieties = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/variety/all`, {
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
      `${baseUrl}crop/variety?variety_eng=${variety_eng}`,
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

// get crop variety
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

// delete crop variety
export const deleteCropVariety = async (name: any, token: string) => {
  try {
    const res = await axios.delete(
      `${baseUrl}/crop/variety/?variety_eng=${name}`,
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

// delete crop stage
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
