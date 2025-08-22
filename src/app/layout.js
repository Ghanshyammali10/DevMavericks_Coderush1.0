import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Solarflux - CME Detection & Solar Weather Analysis",
  description:
    "Real-time Coronal Mass Ejection detection and solar weather forecasting platform powered by Aditya-L1 data",
  keywords:
    "CME, solar weather, space weather, Aditya-L1, coronal mass ejection, solar flares",
  authors: [{ name: "Solarflux Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Solarflux - CME Detection & Solar Weather Analysis",
    description:
      "Real-time Coronal Mass Ejection detection and solar weather forecasting platform",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
