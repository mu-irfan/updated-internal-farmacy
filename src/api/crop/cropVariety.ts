import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create crop
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

// update crop
export const updateCropVariety = async (
  data: any,
  name: any,
  token: string
) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/crop/variety/?variety_eng${name}`,
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
