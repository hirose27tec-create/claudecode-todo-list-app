import { M_PLUS_Rounded_1c } from "next/font/google";
import "./globals.css";

const mplusRounded = M_PLUS_Rounded_1c({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata = {
  title: "ToDo リスト",
  description: "シンプルで使いやすい、やさしい色合いのToDoリストアプリ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja" className={mplusRounded.variable}>
      <body>{children}</body>
    </html>
  );
}
