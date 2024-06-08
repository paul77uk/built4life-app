"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

const Toast = () => {
  const { theme } = useTheme();
  if (typeof theme === "string")
    return (
      <Toaster
        richColors
        theme={theme as "light" | "dark" | "system" | undefined}
      />
    );
};
export default Toast;
