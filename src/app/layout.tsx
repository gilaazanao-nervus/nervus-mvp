import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Nervus MVP",
  description: "Nervus team insights"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
          <header className="mb-10">
            <h1 className="text-3xl font-semibold tracking-tight">Nervus</h1>
            <p className="mt-2 text-sm text-slate-300">
              MVP workspace for engineering health signals.
            </p>
          </header>
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
