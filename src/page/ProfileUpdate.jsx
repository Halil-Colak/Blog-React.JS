import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../helper/AuthContext';
import CustomerService from '../services/CustomerService';
import { useAlert } from '../helper/AlertProvider';
import Loading from '../component/Loading';
import DefauptPP from "../assets/default.png"
import "../css/ProfileUpdate.css"
import { FaPen } from "react-icons/fa";

function ProfileUpdate() {
    const { isAuthenticated, logout, user } = useAuth();
    const { customerSlug } = useParams();
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    // State tanımlamaları
    const [name, setName] = useState();
    const [surName, setSurName] = useState();
    const [email, setEmail] = useState();
    const [photo, setPhoto] = useState(null);
    const [oldPhoto, setOldPhoto] = useState(null);
    const [loading, setLoading] = useState(false);



    // Form submit işlemi
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name); // Name input değeri
        formData.append('surName', surName); // SurName input değeri
        formData.append('email', email); // Email input değeri
        formData.append('photo', photo); // Fotoğraf var mı kontrolü ve ekleme
        setLoading(true);

        const response = await CustomerService.Update(formData);

        if (!response.status) {
            showAlert("Beklenmedik hata", false);
            navigate('/');
            setLoading(false);
        } else {
            showAlert("Kullanıcı bilgileriniz güncellendi", true);
            setLoading(false);
            navigate('/giris-yap');
            logout();
        }
    };

    // Müşteri verisini çek
    useEffect(() => {
        if (!isAuthenticated || !user) return;

        // Slug uyuşmuyorsa yönlendir
        if (user.slug !== customerSlug) {
            showAlert("Bu profili düzenlemeye yetkin yok! Uza!", false);
            navigate('/');
            return;
        }

        const Retrieve = async () => {
            setLoading(true);
            const response = await CustomerService.GetBySlug(customerSlug);
            if (!response.status) {
                showAlert("Beklenmedik hata", false);
                navigate('/');
            } else {
                setName(response.data.name);
                setSurName(response.data.surnName);
                setEmail(response.data.email);
                setOldPhoto(response.data.profilPhoto);
            }
            setLoading(false);
        };

        Retrieve();
    }, [customerSlug, isAuthenticated]);



    // Input değerlerini güncelle
    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case "name":
                setName(value);
                break;
            case "surName":
                setSurName(value);
                break;
            case "email":
                setEmail(value);
                break;
            default:
                break;
        }
    };

    // Profil fotoğrafını güncelle
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setOldPhoto(URL.createObjectURL(file));
        }
    };


    if (loading) {
        return <Loading />;
    }
    return (
        <form id="profil-update-form" onSubmit={handleSubmit}>
            <h1>Profil Düzenle</h1>

            <label className='label profil-photo'>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                {oldPhoto ? (
                    <img
                        width={50}
                        src={oldPhoto.startsWith("blob:")
                            ? oldPhoto
                            : import.meta.env.VITE_API_BASE_URL + oldPhoto}
                        alt=""
                        loading='lazy'
                    />
                ) : (
                    <img width={50} src={DefauptPP} alt="" loading='lazy' />
                )}
                <span>
                    <FaPen />
                </span>
            </label>

            <label className='label'>
                Ad
                <input
                    type="text"
                    required
                    name="name"
                    value={name || ""}
                    onChange={handleChange}
                />
            </label>

            <label className='label'>
                Soyad
                <input
                    type="text"
                    required
                    name="surName"
                    value={surName || ""}
                    onChange={handleChange}
                />
            </label>

            <label className='label'>
                Email
                <input
                    type="email"
                    required
                    name="email"
                    value={email || ""}
                    onChange={handleChange}
                />
            </label>
            <button className="button" type="submit">Kaydet</button>

        </form>
    );
}

export default ProfileUpdate;
