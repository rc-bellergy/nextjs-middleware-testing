'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Logout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingOut(true);

    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push('/login');
        console.log('Logout successful');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <form onSubmit={handleLogout}>
      <button type="submit" disabled={isLoggingOut}>
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </form>
  );
}
