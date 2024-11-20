import { baseUrl } from "@/lib/utils";
import axios from "axios";

// franchises stats
export const getCompaniesFranchiseStats = async (
  company: string,
  token: string
) => {
  try {
    const res = await axios.get(
      `${baseUrl}/company/franchise/stats?company_fk=${company}`,
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

// get company franchises
export const getCompanyFranchises = async (company: string, token: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/company/franchise/all?company_fk=${company}`,
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
