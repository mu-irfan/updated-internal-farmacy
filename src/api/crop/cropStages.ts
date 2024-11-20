import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create crop stage
export const createCropStage = async (data: any, token: any) => {
  try {
    const res = await axios.post(
      `${baseUrl}/crop/stages?crop_name=${data.crop_name}`,
      data,
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

// get all crop stages
export const getAllCropStages = async (
  token: string,
  filters: { crop?: string; variety_eng?: string }
) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.crop) queryParams.append("crop", filters.crop);
    if (filters.variety_eng)
      queryParams.append("variety_eng", filters.variety_eng);
    const res = await axios.get(
      `${baseUrl}/crop/variety/stage/all?${queryParams.toString()}`,
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

// get crop stage
export const getCropStage = async (name: any, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/crop/stages/all?crop_name=${name}`,
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

// update crop stage
export const updateCropStage = async (data: any, uuid: any, token: string) => {
  try {
    const res = await axios.patch(`${baseUrl}/crop/stages?uuid=${uuid}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

// delete crop stage
export const deleteCropStage = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/crop/stages?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
