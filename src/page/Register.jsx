import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/Auth.css"
import api from '../config/api';
import Loading from '../component/Loading';
import { useAlert } from '../helper/AlertProvider';
import AuthService from '../services/AuthService';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('surName', surname);
      formData.append('email', email);
      formData.append('password', pass);


      const Retrieve = async () => {
        const response = await AuthService.Register(formData)
        if (!response.status) {
          showAlert(response.message, false);
          setLoading(false);
        } else {
          navigate('/giris-yap');
          setLoading(false);
          showAlert("Kayıt başarılı! Lütfen e-posta adresini doğrula.", true);
        }
      }
      Retrieve();
    } catch (error) {
      console.error('Kayıt API Hatası:', error);
      setLoading(false)
      showAlert("Beklenmedik hata", false);
    }
  };

  return (
    <form id="form" onSubmit={handleRegisterClick}>
      <h1>Kayıt Ol</h1>
      <p>
        Yeni başlangıçlar seni bekliyor. Kendi hikayenin kahramanı ol, şimdi kaydol ve keşfetmeye başla!
      </p>
      <label className='label'>
        Ad
        <input type="text" required onChange={(e) => setName(e.target.value)} />
      </label>
      <label className='label'>
        Soyad
        <input type="text" required onChange={(e) => setSurname(e.target.value)} />
      </label>
      <label className='label'>
        Email
        <input type="email" required onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className='label'>
        Şifre
        <input type="password" required onChange={(e) => setPass(e.target.value)} />
      </label>
      <button className="button" type="submit" disabled={loading}>
        {loading ? (
          <div className="flex items-center gap-2">
            <Loading />
          </div>
        ) : (
          'Kayıt Ol'
        )}
      </button>

      <p>
        <span></span>
        <b>
          Hesabın var mı?
        </b>
      </p>
      <Link to="/giris-yap" className="button">Giriş yap</Link>
    </form>
  )
}

export default Register