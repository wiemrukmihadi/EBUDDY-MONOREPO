"use client";

import { ThemeProvider } from "@mui/material/styles"; // ✅ Import from MUI
import theme from "@/theme/theme"; // Ensure correct path
import { CssBaseline } from "@mui/material"; // Optional: Resets default styles

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensures consistent baseline styles */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
