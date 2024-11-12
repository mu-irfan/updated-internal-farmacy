import { baseUrl } from "@/lib/utils";
import axios from "axios";

// create bulk payment
export const createBulkPayment = async (data: any, token: string) => {
  try {
    const res = await axios.post(
      `${baseUrl}/payment/jazzcash/mwallet/bulk`,
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

// create bulk payment
export const inquiryPayment = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/payment/jazzcash/inquiry`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    return error;
  }
};
