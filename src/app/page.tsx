import { redirect } from 'next/navigation';

/**
 * Home page component
 * @returns The home page component
 */
export default function HomePage() {
  redirect('/home');
}
