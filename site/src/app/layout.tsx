import type { Metadata } from 'next';
import './globals.css';
import { Pied } from '@/components/Pied';

export const metadata: Metadata = {
  title: 'BankVi · Pass Plus',
  description: 'Active ton Pass Plus BankVi en toute transparence.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <div className="page-shell">
          <main className="main-content">{children}</main>
          <Pied />
        </div>
      </body>
    </html>
  );
}

