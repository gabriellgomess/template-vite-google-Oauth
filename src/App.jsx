import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Routes, Route, useNavigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';

const App = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Função para verificar se há um usuário armazenado no sessionStorage
  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    // set in sessionStorage
    console.log(decoded);
    sessionStorage.setItem('user', JSON.stringify(decoded));
  };

  const handleLogout = () => {
    setUser(null); // Limpa os dados do usuário ao fazer logout
    // remove from sessionStorage
    sessionStorage.removeItem('user');
    // Navigate to home page after logout
    navigate('/');
  };

  const handleLoginFailure = () => {
    console.log('Login Failed');
  };
  return (
    <>
      {!user ? (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      ) : (
        <div>          
          <div style={{ width: '80%', margin: '20px auto 0 auto' }}>
            <Routes>
              <Route path="/" element={<Home user={user} />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  )
}

export default App;
