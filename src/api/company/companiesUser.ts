import { baseUrl } from "@/lib/utils";
import axios from "axios";

// get companies users list
export const getAllCompaniesUserList = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/company/user/list`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// get registered compananies list
export const getRegisterCompaniesList = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/company/user/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// verify company
export const verifyCompany = async (data: any, token: any) => {
  try {
    const res = await axios.post(`${baseUrl}/company/user/verify`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};

// delete register company
export const deleteRegisterCompany = async (uuid: any, token: string) => {
  try {
    const res = await axios.delete(`${baseUrl}/company/user?uuid=${uuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
