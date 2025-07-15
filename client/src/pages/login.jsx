import React, { useState } from 'react';

function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const url = `http://localhost:5000/api/auth/${isRegister ? 'register' : 'login'}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        sessionStorage.setItem('token', data.token); // Optional: store token directly
        onLogin(data.token);
        setError('');
      } else {
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80")'
      }}
    >
      <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg w-80 backdrop-blur-md">
        <h2 className="text-xl font-bold text-center mb-4">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <input
          className="w-full border p-2 mb-3 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border p-2 mb-3 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-medium"
          onClick={handleSubmit}
        >
          {isRegister ? 'Register' : 'Login'}
        </button>

        <button
          className="text-sm text-green-800 mt-3 underline"
          onClick={() => {
            setError('');
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? 'Already have an account? Login' : 'Need an account? Register'}
        </button>
      </div>
    </div>
  );
}

export default Login;
