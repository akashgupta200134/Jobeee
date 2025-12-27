import type { Metadata } from "next";
import "./globals.css";
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google";
import ProviderRedux from "./providerredux"; // Uses the updated file above
import UserMessage from "./userMessage";

// Font configurations
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "HireNova", // Updated title
  description: "Job Portal Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${spaceGrotesk.variable}`}
    >
      <body className={inter.className} suppressHydrationWarning={true} >
        {/* The Provider now handles the getUser() logic automatically */}
        <ProviderRedux>
          {children}
          <UserMessage />
        </ProviderRedux>
      </body>
    </html>
  );
}