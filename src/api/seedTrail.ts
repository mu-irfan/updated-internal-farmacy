import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create seed trail
export const createSeedTrail = async (data: any, token: string) => {
  try {
    const res = await axios.post(`${baseUrl}/seed/trial`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get seed trails
export const getAllSeedTrail = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/seed/trial/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get seed trail stages
export const getSeedTrailStages = async (uuid: any, token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/seed/trial/data/all?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get seed trail stages
export const getSeedTrailStagesFormFields = async (
  crop_name: any,
  token: string
) => {
  try {
    const res = await axios.get(
      `${baseUrl}/crop/stages/all?crop_name=${crop_name}`,
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

// update trail stages
export const updateSeedTrailStages = async (
  data: any,
  token: string,
  uuid: string
) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/seed/trial/data?uuid=${uuid}`,
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
