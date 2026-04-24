import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Mini audit prive',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function PriveMiniAuditLayout({ children }: { children: ReactNode }) {
  return children;
}
