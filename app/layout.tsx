import './globals.css';

export const metadata = {
  title: 'Dzulfikar Adam',
  description: 'Personal Curiculum Vitae',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-black text-neutral-100 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
