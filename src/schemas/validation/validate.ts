import parsePhoneNumberFromString, {
  isValidPhoneNumber,
} from "libphonenumber-js";
import * as z from "zod";

export function validatePhoneNo(schema: z.ZodString) {
  return schema
    .refine((value) => {
      const phoneNumber = parsePhoneNumberFromString(value, "PK");
      return phoneNumber && isValidPhoneNumber(phoneNumber.number);
    }, "Please specify a valid phone number (include the international prefix if necessary).")
    .transform((value) => {
      const phoneNumber = parsePhoneNumberFromString(value, "PK");
      return phoneNumber ? Number(phoneNumber.number) : Number(value);
    });
}
