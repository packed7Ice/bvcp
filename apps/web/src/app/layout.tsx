import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BVCP - Binary Version Control Platform",
  description: "バイナリファイル向けバージョン管理プラットフォーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
