import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams, Outlet, Link, NavLink } from 'react-router-dom'
import "../css/Profile.css";
import CustomerService from '../services/CustomerService';
import DefauptPP from "../assets/default.png"
import Loading from '../component/Loading';
function Profile() {
    const { customerSlug } = useParams("");
    const Navigate = useNavigate();
    const [profil, setProfil] = useState({})
    const [loading, setLoading] = useState(false)


    // Müşteri verisini çek
    useEffect(() => {
        const Retrieve = async () => {
            setLoading(true);
            const response = await CustomerService.GetBySlug(customerSlug);
            console.log("calıstı")
            if (!response.status) {
                showAlert("Beklenmedik hata", false);
                Navigate('/');
            } else {
                setProfil(response.data);
            }
            setLoading(false);
        };
        Retrieve()
    }, []);

    if (loading) {
        return <Loading />
    }

    const formattedDate = new Date(profil.createdDateTime).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return (
        <section id="profil-container-section" className="section-width">
            <div id="profil-container">
                <div>
                    {profil && profil.profilPhoto ? (
                        <img src={import.meta.env.VITE_API_BASE_URL + profil.profilPhoto} alt="" loading='lazy' />
                    ) : (
                        <img src={DefauptPP} alt="" loading='lazy' />
                    )}
                    <p>
                        {profil.name + " " + profil.surnName}
                        <span>
                            {formattedDate}
                        </span>
                    </p>
                </div>
                <div id='profil-link'>
                    <NavLink to={`/profil/${customerSlug}/yorumlar`} className='category-tag'>Yorumlar</NavLink>
                    <NavLink to={`/profil/${customerSlug}/begeniler`} className='category-tag'>Beğeniler</NavLink>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </section>
    )
}

export default Profile