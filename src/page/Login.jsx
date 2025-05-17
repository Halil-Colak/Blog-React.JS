import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Auth.css";
import Loading from '../component/Loading';
import { useAlert } from '../helper/AlertProvider';
import { useAuth } from '../helper/AuthContext';
import AuthService from '../services/AuthService';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [pass, setPass] = useState(null);
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlert();
    const { login } = useAuth();

    const handleRegisterClick = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', pass);

            const Retrieve = async () => {
                const response = await AuthService.Login(formData)
                if (response.data == null) {
                    showAlert(response.message, false);
                } else {
                    login(response.data);
                    showAlert("Giriş başarılı", true);
                    navigate('/');
                }
            }
            Retrieve()
        } catch (error) {
            console.error('Login API Hatası:', error);
            showAlert("Bilgiler yanlış", false);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (loading) {
            return <Loading />
        }
    }, [loading])
    return (
        <form id="form" onSubmit={handleRegisterClick}>
            <h1>Giriş Yap</h1>
            <p>Yeni başlangıçlar seni bekliyor. Kendi hikayenin kahramanı ol, şimdi kaydol ve keşfetmeye başla!</p>
            <label className='label'>
                Email
                <input type="email" required onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label className='label'>
                Şifre
                <input type="password" required onChange={(e) => setPass(e.target.value)} />
                <small>
                    <Link to={"/sifremi-unuttum"}>
                        Şifremi unuttum</Link>
                </small>
            </label>
            <button className="button" type="submit" disabled={loading}>
                {loading ? "Yükleniyor..." : 'Giriş yap'}
            </button>
            <p><span></span><b>Hesabın yok mu?</b></p>
            <Link to="/kayit-ol" className="button">Kayıt ol</Link>
        </form>
    );
}

export default Login;
