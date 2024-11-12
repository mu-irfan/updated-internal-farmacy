import { ThemeProvider } from "@/components/theme/ToggleTheme";
import { ContextProvider } from "@/context/Context";
import { FC, ReactNode } from "react";
import ProtectedRoutes from "./ProtectedRoutes";

export const metadata = {
  title: "Farmacie Dashboard",
  description: "Agronomics Farmacie Dashboard",
};

const Layout: FC<{ children: ReactNode }> = async ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ProtectedRoutes>
        <ContextProvider>
          <main>{children}</main>
        </ContextProvider>
      </ProtectedRoutes>
    </ThemeProvider>
  );
};

export default Layout;
