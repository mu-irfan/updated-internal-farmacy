import * as z from "zod";

const createAccountFormSchema = z
  .object({
    name: z.string().nonempty({
      message: "Name is required.",
    }),
    email: z
      .string()
      .nonempty({
        message: "Email is required.",
      })
      .email({
        message: "Invalid email.",
      }),
    password: z
      .string()
      .nonempty({
        message: "Password is required.",
      })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one numeric digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .nonempty({
        message: "Confirm Password is required.",
      })
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginAccountFormSchema = z.object({
  email: z.string().nonempty({
    message: "Email is required.",
  }),
  password: z
    .string()
    .nonempty({
      message: "Password is required.",
    })
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one numeric digit")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required." })
    .email({ message: "Invalid email." }),
});

const otpSchema = z.object({
  email: z.string(),
  otp: z
    .string()
    .nonempty({ message: "OTP is required." })
    .length(6, "OTP must be exactly 6 digits"),
});

const resetPasswordSchema = z
  .object({
    email: z.string(),
    newPassword: z
      .string()
      .nonempty({ message: "Please enter your new password" })
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one numeric digit")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .nonempty({ message: "Please confirm your new password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const addProductFormSchema = z.object({
  name: z.string().nonempty({ message: "Product Name is required." }),
  company_fk: z.string().nonempty({ message: "Brand Name is required." }),
  category: z.string().nonempty({ message: "Category is required." }),
  sub_category: z.string().nonempty({ message: "Subcategory is required." }),
  type: z.string().nonempty({ message: "ActiveIngredient is required." }),
  package_weight: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Package weight is required.",
    }),
  weight_unit: z.string().nonempty({ message: "Weight Unit is required." }),
  package_type: z.string().nonempty({ message: "Packaging Type is required." }),
  area_covered: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Area covered is required.",
    }),
  disease_purpose: z.string().nonempty({ message: "Disease is required." }),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Price is required.",
    }),
  description: z.string().nonempty({ message: "Packaging Type is required." }),
});

const filterProductsFormSchema = z.object({
  category: z.string().optional(),
  sub_category: z.string().optional(),
  company_fk: z.string().optional(),
});

//seed
const addSeedFormSchema = z.object({
  seed_variety_name: z
    .string()
    .nonempty({ message: "Variety Name is required." }),
  company_fk: z.string().nonempty({ message: "Brand Name is required." }),
  crop_category: z.string().nonempty({ message: "Category is required." }),
  crop: z.string().nonempty({ message: "Crop is required." }),
  seed_weight: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Seed weight is required.",
    }),
  package_weight: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Package weight is required.",
    }),
  germination_percentage: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Germination Percentage is required.",
    }),
  maturity_percentage: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Maturity Percentage is required.",
    }),
  min_harvesting_days: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Min Harvesting Days is required.",
    }),
  max_harvesting_days: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Max Harvesting Days is required.",
    }),
  suitable_region: z
    .string()
    .nonempty({ message: "Suitable Region is required." }),
  package_type: z.string().nonempty({ message: "Packaging Type is required." }),
  height_class: z.string().nonempty({ message: "Height Class is required." }),
  nutrient_content: z.array(z.string()).optional(),
  common_disease_tolerance: z.array(z.string()).optional(),
  env_resilience_fators: z.array(z.string()).optional(),
  unique_features: z.array(z.string()).optional(),
  price: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", { message: "Price is required." }),
  description: z.string().nonempty({ message: "Description is required." }),
});

// filter seed
const filterSeedFormSchema = z.object({
  crop_category: z.string().optional(),
  crop: z.string().optional(),
  in_simulator: z.boolean().optional(),
  have_trail_data: z.boolean().optional(),
});

const filterVarietyFormSchema = z.object({
  crop_fk: z.string().optional(),
  in_farmacie: z.boolean().optional(),
});

// add seed trial data
const AddCropToSimulatorFormSchema = z.object({
  crop_name: z.string().nonempty({
    message: "Crop is required.",
  }),
  crop_category: z.string().nonempty({
    message: "Category is required.",
  }),
  source: z.string().nonempty({
    message: "Source is required.",
  }),
  seed_sowing_depth_m: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Sowing Depth is required.",
    }),
  root_depth_max_m: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Root Depth is required.",
    }),
});

// add seed trial data
const AddStageToSimulatorFormSchema = z
  .object({
    crop_variety_fk: z.string().nonempty({
      message: "Variety is required.",
    }),
    stage: z.string().nonempty({
      message: "Stage is required.",
    }),
    sub_stage: z.string().nonempty({
      message: "Sub Stage is required.",
    }),
    bbch_scale: z
      .union([z.string(), z.number()])
      .transform((val) => String(val))
      .refine((val) => val.trim() !== "", {
        message: "bbch scale is required.",
      }),

    kc: z
      .union([z.string(), z.number()])
      .transform((val) => String(val))
      .refine((val) => val.trim() !== "", {
        message: "kc is required.",
      }),
    start_gdd: z
      .union([z.string(), z.number()])
      .transform((val) => String(val))
      .refine((val) => val.trim() !== "", {
        message: "Start GDD is required.",
      }),
    end_gdd: z
      .union([z.string(), z.number()])
      .transform((val) => String(val))
      .refine((val) => val.trim() !== "", {
        message: "End GDD is required.",
      }),
    base_temp: z
      .union([z.string(), z.number()])
      .transform((val) => String(val))
      .refine((val) => val.trim() !== "", {
        message: "Base Temp is required.",
      }),
    min_temp: z
      .union([z.string(), z.number()])
      .transform((val) => String(val))
      .refine((val) => val.trim() !== "", {
        message: "Min Temp is required.",
      }),
    max_temp: z
      .union([z.string(), z.number()])
      .transform((val) => String(val))
      .refine((val) => val.trim() !== "", {
        message: "Max Temp is required.",
      }),
  })
  .refine((data) => data.end_gdd > data.start_gdd, {
    message: "End GDD must be greater than Start GDD.",
    path: ["end_gdd"],
  })
  .refine((data) => data.max_temp > data.min_temp, {
    message: "Max Temp must be greater than Min Temp.",
    path: ["max_temp"],
  });

const addVarietyDataFormSchema = z.object({
  variety_eng: z
    .string()
    .nonempty({ message: "Variety Name (English) is required." }),
  variety_urdu: z
    .string()
    .nonempty({ message: "Variety Name (Urdu) is required." }),
  variety_type: z.string().nonempty({ message: "Variety Type is required." }),
  company: z.string().nonempty({ message: "Company is required." }),
  crop_fk: z.string().nonempty({ message: "Crop is required." }),
  crop_season: z.string().nonempty({ message: "Crop Season is required." }),
  season: z.string().nonempty({ message: "Season is required." }),
  seed_weight_mg: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Seed weight is required.",
    }),
  irrigation_source: z
    .string()
    .nonempty({ message: "Irrigation Source is required." }),
  germination_percentage: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Germination Percentage is required.",
    }),
  maturity_percentage: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Maturity Percentage is required.",
    }),
  crop_min_days: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Min Harvesting Days are required.",
    }),
  crop_max_days: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Max Harvesting Days are required.",
    }),
  mad_percentage: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "MAD Percentage is required.",
    }),
  cwr_min_mm: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Minimum Water Requirement is required.",
    }),
  cwr_max_mm: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "Maximum Water Requirement is required.",
    }),
  height_class: z.string().nonempty({ message: "Height Class is required." }),
  nutrient_content: z.array(z.string()).optional(),
  common_disease_tolerance: z.array(z.string()).optional(),
  env_resilience_fators: z.array(z.string()).optional(),
  unique_features: z.array(z.string()).optional(),
  sand: z.boolean().optional(),
  loamy_sand: z.boolean().optional(),
  sandy_loam: z.boolean().optional(),
  loam: z.boolean().optional(),
  sandy_clay_loam: z.boolean().optional(),
  clay_loam: z.boolean().optional(),
  silt_loam: z.boolean().optional(),
  silt: z.boolean().optional(),
  silty_clay_loam: z.boolean().optional(),
  silty_clay: z.boolean().optional(),
  clay: z.boolean().optional(),
  sandy_clay: z.boolean().optional(),
});

const addCropStageFormSchema = z.object({
  crop_fk: z.string().nonempty({ message: "Crop Name is required." }),
  stage: z.string().nonempty({ message: "Stage is required." }),
  sub_stage: z.string().nonempty({ message: "Sub Stage is required." }),
  bbch_scale: z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => val.trim() !== "", {
      message: "BBCH Scale is required.",
    }),
});

const addCompanyToGlobalListFormSchema = z.object({
  companies: z.array(z.string()).nonempty("One company is required."),
});

const addIngredientListFormSchema = z.object({
  ingredients: z.array(z.string().min(1, "Ingredient name is required")),
});

// crops
const filterCropVarietyFormSchema = z.object({
  crop: z.string().optional(),
  variety_eng: z.string().optional(),
});

const addQueryFormSchema = z.object({
  company: z.string().nonempty({
    message: "Select Company",
  }),
  query: z.string().nonempty({
    message: "Please enter query",
  }),
});

const queryResponseSchema = z.object({
  response: z.string().optional(),
});

const verifyCompanyFormSchema = z.object({
  name: z.string().nonempty({
    message: "Select Company",
  }),
});

//user
const profileFormSchema = z.object({
  name: z.string(),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

export {
  createAccountFormSchema,
  loginAccountFormSchema,
  emailSchema,
  otpSchema,
  resetPasswordSchema,
  addProductFormSchema,
  filterProductsFormSchema,
  addSeedFormSchema,
  addCompanyToGlobalListFormSchema,
  filterSeedFormSchema,
  addIngredientListFormSchema,
  addQueryFormSchema,
  queryResponseSchema,
  verifyCompanyFormSchema,
  profileFormSchema,
  AddCropToSimulatorFormSchema,
  AddStageToSimulatorFormSchema,
  addCropStageFormSchema,
  filterCropVarietyFormSchema,
  filterVarietyFormSchema,
  addVarietyDataFormSchema,
};
