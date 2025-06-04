import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../helper/AlertProvider'; 
import AuthService from '../services/AuthService';
import "../css/Auth.css";
import Loading from '../component/Loading';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('email', email);
      debugger
      const response = await AuthService.ForgotPassword(formData)
      if (response.status) {
        showAlert(response.message, true);
        navigate('/giris-yap');
      } else {
        showAlert(response.message, false);
        navigate('/');
      }
    } catch (error) {
      showAlert("E-posta adresi ile ilgili bir sorun oluştu.", false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id='form' onSubmit={handleForgotPassword}>
      <h1>Şifremi Sıfırla</h1>
      <label className='label'>
        E-posta
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <button className="button" type="submit" disabled={loading}>
        {loading ? <Loading /> : "Şifre Sıfırlama Linki Gönder"}
      </button>
    </form>
  );
}

export default ForgotPassword;
