import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "To-Do App",
  description: "To-Do app created using Next.js for Vim Pars company",
  authors: [
    {
      name: "Erfan Taheri",
      url: "https://portfolio-erufans-projects.vercel.app/",
    },
  ],
  keywords: ["To-Do App", "Next.js", "code challenge", "Vim Pars"],
};
export default function RootLayout({
  children,
  add,
}: {
  children: React.ReactNode;
  add: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          {add}
          {children}
        </AntdRegistry>
      </body>
    </html>
  );
}
