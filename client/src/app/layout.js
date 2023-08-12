import "./globals.css";
import { Inter } from "next/font/google";
import background from "../../public/background.png";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }) => {
  const bodyStyles = {
    backgroundImage: `url(${background.src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <html lang="en">
      <body style={bodyStyles}>{children}</body>
    </html>
  );
};

export default RootLayout;
