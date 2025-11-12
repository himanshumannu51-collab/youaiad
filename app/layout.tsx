import './globals.css';

export const metadata = {
  title: 'YouAI Ad Tool',
  description: 'Generate 5 high-ROAS ads instantly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-bg-light text-text-dark antialiased">{children}</body>
    </html>
  );
}
