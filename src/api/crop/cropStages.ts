import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get crop
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
