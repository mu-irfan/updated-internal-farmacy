import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create crop variety
export const createCropVariety = async (data: any, token: any) => {
  try {
    const res = await axios.post(`${baseUrl}/crop/variety`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get all varaities
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

// get all varaities list
export const getAllCropVarietyList = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/crop/variety/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update crop variety
export const updateCropVariety = async (
  data: any,
  name: any,
  token: string
) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/crop/variety/?variety_eng=${name}`,
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

// already crop variety in simulator
export const alreadyInSimulatorCropVariety = async (
  data: any,
  name: any,
  token: string
) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/crop/variety/already-on-farmacie?variety_eng=${name}`,
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
