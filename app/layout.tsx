import "./globals.css";

export const metadata = {
  title: "YouAIAd — AI Ad Generator",
  description: "Create high-performing Facebook and Instagram ads instantly with AI",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
