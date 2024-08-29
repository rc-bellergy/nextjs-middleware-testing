'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState('frontenduser');
    const [password, setPassword] = useState('password');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                // Handle successful login, e.g., redirect to home
                router.push('/');
                console.log('Login successful');
            } else {
                const data = await response.json();
                setError(data.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div className='flex flex-col gap-3'>
                <input type="text" name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />
                <input type="password" name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />
                <div>
                    <button type="submit">Login</button>
                </div>
            </div>
        </form>
    );
}
