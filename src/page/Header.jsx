import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../helper/AuthContext';
import { useAlert } from '../helper/AlertProvider';
import { TbBrandAirbnb } from 'react-icons/tb';
import { FiSearch } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import BlogService from '../services/BlogService';
import DefauptPP from '../assets/default.png';
import { MdUpdate } from "react-icons/md";
import { GoHeart } from "react-icons/go";
import { GoComment } from "react-icons/go";
import { TbLockPassword } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";

function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();
  const { showAlert } = useAlert();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);

  const dropdownRef = useRef(null); // dropdown div'i
  const toggleButtonRef = useRef(null); // toggle butonu (HiDotsVertical)

  //#region Random Blog
  const Retrieve = async () => {
    setloading(true)
    try {
      const response = await BlogService.GetRandomBlog();
      if (!response.status) return showAlert("Beklenmedik hata", false);
      navigate(`/blog-detay/${response.data.slug}`);
    } catch (error) {
      showAlert("Beklenmedik hata", false);
    } finally {
      setloading(false)
    }
  };

  //#endregion 

  const Toogle = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        toggleButtonRef.current &&
        !toggleButtonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <header>
      <Link to="/" style={{ fontFamily: "'Pacifico', cursive", fontSize: "1.5rem", color: "#121212", textDecoration: "none" }}>
        Logo
      </Link>
      <div>
        <Link to="/arama" className='header-btn' id='header-search'>
          <FiSearch />
        </Link>
        <button className={`header-btn ${loading ? "active" : ""}`} id="header-random" onClick={Retrieve}>
          <TbBrandAirbnb />
        </button>

        {isAuthenticated ? (
          user ? (
            <img src={user.profilPhoto ? import.meta.env.VITE_API_BASE_URL + user.profilPhoto : DefauptPP} alt="" loading='lazy' onClick={Toogle} ref={toggleButtonRef} id='header-photo' />
          ) : (
            <img src={DefauptPP} alt="" loading='lazy' />
          )
        ) : (
          <Link to="/giris-yap" className='header-btn' id='header-login'>
            <FaRegUser />
          </Link>
        )}


        {isAuthenticated ? (
          <div ref={dropdownRef} id='user-box' className={isOpen ? "active" : ""}>
            <span>
              <Link to={`/profil/${user.slug}/begeniler`}>
                <GoHeart /> Beğeniler
              </Link>
            </span>
            <span>
              <Link to={`/profil/${user.slug}/yorumlar`}>
                <GoComment /> Yorumlar
              </Link>
            </span>
            <span>
              <Link to={`/profil-duzenle/${user.slug}`}>
                <MdUpdate /> Profil düzenle
              </Link>
            </span>
            <span>
              <Link to={"/sifremi-unuttum"}>
                <TbLockPassword />
                Şifre sıfırla
              </Link>
            </span>
            <span className='header-line' onClick={logout}>
              <IoLogOutOutline /> Çıkış yap
            </span>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default Header;
