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
