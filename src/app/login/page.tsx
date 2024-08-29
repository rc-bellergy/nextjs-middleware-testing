"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {

	const [username, setUsername] = useState('frontenduser');
	const [password, setPassword] = useState('password');
	const [error, setError] = useState('');
	const router = useRouter();

	const onSubmit = async (e: React.FormEvent) => {
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
		<div>
			<form onSubmit={onSubmit}>
				<input type="text" name="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)} />
				<input type="password" name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)} />
				<button type="submit">Login</button>
			</form>
		</div>
	)
}