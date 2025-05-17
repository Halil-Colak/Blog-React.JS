import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../helper/AlertProvider';
import AuthService from '../services/AuthService';
import Loading from '../component/Loading';
import "../css/Auth.css";

function ResetPassword() {
  const [params] = useSearchParams();
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const email = params.get('email');
  const token = params.get('token');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      debugger
      const formData = new FormData();
      formData.append('email', email);
      formData.append('token', token);
      formData.append('newPassword', newPassword);
      const response = await AuthService.ResetPassword(formData);
      if (response.status) {
        showAlert(response.message, true);
        navigate('/giris-yap');
      } else {
        showAlert(response.message, false);
        navigate('/');
      }
    } catch (error) {
      showAlert("Şifre sıfırlama sırasında bir hata oluştu.", false);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };
  return (
    <form id='form' onSubmit={handleResetPassword}>
      <h1>Yeni Şifre Belirleyin</h1>
      <label className='label'>
        Yeni Şifre
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
      </label>
      <button className='button' type="submit" disabled={loading}>
        {loading ? <Loading /> : "Şifreyi Sıfırla"}
      </button>
    </form>
  );
}

export default ResetPassword;
