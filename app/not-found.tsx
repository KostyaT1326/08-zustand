import type { Metadata } from 'next';

export const dynamic = "force-dynamic";

import css from './notFound.module.css';

export const metadata: Metadata = {
    title: "Page Not Found | NoteHub",
  description: "Sorry, this page does not exist.",
  openGraph: {
    title: "Page Not Found | NoteHub",
    description: "Sorry, this page does not exist.",
    url: "https://notehub.goit.global/not-found",
    siteName: "NoteHub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Page Not Found preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Page Not Found | NoteHub",
    description: "Sorry, this page does not exist.",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

const NotFound = () => {

  return (
    <div className={css.container}>
    <h1 className={css.title}>404 - Page not found</h1>
    <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound