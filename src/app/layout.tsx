import type { Metadata } from "next";
import { Toaster } from 'sonner';
import "./globals.css";
import { InitializePermission } from "@/store/permission-store";


export const metadata: Metadata = {
  title: "Flickstar-Admin-Panel",
  description: "Flickstar Admin Panel",
  icons : {
    icon : "./favicon.ico",
  }
};




export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={`antialiased`}>
        <InitializePermission/>
          {children}
        <Toaster richColors position="top-right" />
      </body>
      
    </html >
  );
}
