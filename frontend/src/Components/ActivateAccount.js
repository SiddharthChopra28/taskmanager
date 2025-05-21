import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ActivateAccount() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    const activateAccount = async () => {
      try {
        await axios.post('/auth/users/activate/', {
          uid,
          token,
        });
        setStatus('success');
        setTimeout(() => navigate('/chat'), 3000); 
      } catch (err) {
        console.error(err);
        setStatus('error');
        setTimeout(() => navigate('/login'), 5000);
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-center p-4">
      {status === 'loading' && <p>Activating your account...</p>}
      {status === 'success' && <p className="text-green-600">Account activated! Redirecting to login...</p>}
      {status === 'error' && <p className="text-red-600">Activation failed. Invalid or expired link.</p>}
    </div>
  );
}
