import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get suggestions stats
export const getCompanyProfile = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// update company profile
export const updateCompanyProfile = async (data: any, token: string) => {
  try {
    const res = await axios.patch(`${baseUrl}/auth/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
