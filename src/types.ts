type Link = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

interface ReduxProviderProps {
  children: React.ReactNode;
}

interface ExampleState {
  value: number;
}

type ReportCardProps = {
  title: string;
  value: number;
};

//table
interface DataTableProps<T extends object> {
  columns: Array<{
    Header: string;
    accessor: keyof T;
  }>;
  data: T[];
  paginate?: boolean;
}
//
interface Product {
  name: string;
  company_fk: string;
  category: string;
  sub_category: string;
  verified: boolean;
  activeIngredient: string;
  concentration: string;
  units: string;
  subscribed?: boolean;
  packageWeight: string;
  weightUnit: string;
  packagingType: string;
  areaCovered: string;
  disease: string;
  price: string;
  description: string;
  images: string[];
}

interface Seed {
  id: number;
  seed_variety_name: string;
  company_fk: string;
  crop_category: string;
  crop: string;
  in_simulator: boolean;
  subscribed?: boolean;
  seedWeight: string;
  trial_count: string;
  packageWeight: string;
  germination_percentage: string;
  maturity_percentage: string;
  minHarvestingDays: number;
  maxHavestingDays: number;
  suitable_region: string;
  package_type: string;
  price: string;
  description: string;
}

interface GlobalCompaniesList {
  company: string;
}

interface IngredientList {
  ingredient_name: string;
}

interface TrailData {
  id: number;
  stage: string;
  sub_stage: string;
  start_day: string;
  end_day: string;
  kc: string;
}

interface SeedTrails {
  id: number;
  seed_variety_name: string;
  sowing_date: string;
  tehsil: string;
  lat: string;
  lon: string;
  estimated_yield: string;
}

interface SeedTrailsStages {
  id: number;
  stage: string;
  sub_stage: string;
  bbch_scale: string;
  start_day: string;
  end_day: string;
  kc: string;
}

interface CropTrailsStages {
  id: number;
  crop_name: string;
  stage: string;
  sub_stage: string;
  bbch_scale: string;
  actions?: never;
}

interface Companies {
  uuid: number;
  company_name: string;
  email: string;
  franchiseName: string;
  contact: string;
  ntn: string;
  verified: boolean;
}

interface Suggestions {
  id: number;
  createdAt: string;
  first_query: string;
  responded: string;
  query_viewed: string;
}

interface Franchises {
  id: number;
  address: string;
  contact: string;
  tehsil: string;
  district: string;
  province: string;
  active: boolean;
}

interface Crop {
  id: number;
  crop_name: string;
  crop_category: string;
  stage_count: number;
  source: string;
  seed_sowing_depth: number;
  root_depth: number;
}

interface Variety {
  id: number;
  variety_eng: string;
  variety_urdu: string;
  crop_fk: string;
  in_farmacie: boolean;
}

interface Stages {
  id: number;
  stage: string;
  sub_stage: string;
  bbch_scale: string;
  start_gdd: string;
  end_gdd: string;
}

interface ProductTableRow extends Product {
  actions?: never;
}

interface SeedTableRow extends Seed {
  actions?: never;
}

interface GlobalCompaniesListTableRow extends GlobalCompaniesList {
  actions?: never;
}

interface ingredientListTableRow extends IngredientList {
  actions?: never;
}

interface FranchiseTableRow extends Franchises {
  actions?: never;
}

interface SeedTrailTableRow extends SeedTrails {
  actions?: never;
}

interface SuggestionsTableActionRow extends Suggestions {
  viewed?: never;
  actions?: never;
}

interface FranchiseTableRow extends Companies {
  actions?: never;
}

interface CropTableRow extends Crop {
  actions?: never;
}

interface CropStageTableRow extends CropTrailsStages {
  actions?: never;
}

interface VarietyTableRow extends Variety {
  actions?: never;
}

interface StagesTableRow extends Stages {
  actions?: never;
}

type ProductColumnAccessor = keyof Product | "actions";

type SeedColumnAccessor = keyof Seed | "actions";

type GlobalCompaniesListColumnAccessor = keyof GlobalCompaniesList | "actions";

type IngredientListColumnAccessor = keyof IngredientList | "actions";

type CropColumnAccessor = keyof Crop | "actions";

type CropStageColumnAccessor = keyof CropTrailsStages | "actions";

type VarietyColumnAccessor = keyof Variety | "actions";

type StagesColumnAccessor = keyof Stages | "actions";

type TrailDataColumnAccessor = keyof TrailData;

type CompaniesColumnAccessor = keyof Companies | "actions" | "verified";

type FranchisesColumnAccessor = keyof Franchises | "active";

type SuggestionsColumnAccessor =
  | keyof Suggestions
  | "actions"
  | "responded"
  | "query_viewed";

type AddProductModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "view" | "edit";
  productData?: any;
  subscribe?: boolean;
  currentFranchiseUuid?: string;
  loading?: boolean;
};

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

// Define types for context
interface ModeContextType {
  mode: "view" | "add" | "edit";
  setMode: (newMode: "view" | "add" | "edit") => void;
  token: string;
}

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  id: string;
}

interface RegisterCompanyPayload {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type ForgotPasswordFormValues =
  | { email: string }
  | { email: string; otp: string }
  | { email: string; newPassword: string; confirmPassword: string };

// chats types
interface Chat {
  uuid: string;
  message: string;
  is_query: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ActivateFranchisePaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  franchiseUUIDs: string[];
  amount: number;
  onClose: any;
}

type PakistanData = {
  provinces: { label: string; value: string }[];
  [key: string]: { label: string; value: string }[];
};

interface Option {
  value: string;
  label: string;
}

interface MultiSelectContextProps {
  value: string[];
  onValueChange: (value: any) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  ref: React.RefObject<HTMLInputElement>;
  handleSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

type AddCompanyGlobalListFormData = {
  companies: string[];
};

type AddIngredientFormData = {
  ingredients: string[];
};

type InputField = {
  id: string;
  ingredient: string;
  concentration: string;
  unit: string;
};
