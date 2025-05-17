import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAlert } from '../helper/AlertProvider';
import AuthService from '../services/AuthService';
import Loading from '../component/Loading';

function ConfirmEmail() {
    const [params] = useSearchParams();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const email = params.get("email");
        const token = params.get("token");

        const verifyEmail = async () => {
            try {
                const response = await AuthService.ConfirmEmail(email, token);
                if (response.status) {
                    showAlert(response.message, true);
                    navigate('/giris-yap');
                } else {
                    showAlert(response.message, false);
                    navigate('/');
                }
            } catch (error) {
                showAlert("Doğrulama başarısız veya süresi dolmuş.", false);
                navigate('/kayit-ol');
            } finally {
                setLoading(false);
            }
        };
        verifyEmail();
    }, []);
    return <div>{loading ? <Loading /> : ""}</div>;
}

export default ConfirmEmail;
