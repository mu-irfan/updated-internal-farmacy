import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get managers
export const getAllCompaniesList = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/company/global-list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
