import { baseUrl } from "@/lib/utils";
import axios from "axios";

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
