import { Routes, Route } from 'react-router-dom';
import Home from '../src/page/Home';
import Header from '../src/page/Header';
import Category from './page/Category';
import BlogDetail from './page/BlogDetail';
import Search from './page/Search';
import Login from './page/Login';
import Register from './page/Register';
import Cookies from './component/Cookies';
import CustomerBlogComment from './component/CustomerBlogComment';
import CustomerBlogLike from './component/CustomerBlogLike';
import Profile from './page/Profile';
import ProfileUpdate from './page/ProfileUpdate';
import ConfirmEmail from './page/ConfirmEmail';  // ConfirmEmail sayfasını import ediyoruz
import ForgotPassword from './page/ForgotPassword';
import ResetPassword from './page/ResetPassword';
import NotFound from './page/NotFound';
import Report from './component/Report';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/kategori/:category' element={<Category />} />
        <Route path='/blog-detay/:blogSlug' element={<BlogDetail />} />
        <Route path='/arama' element={<Search />} />
        <Route path='/giris-yap' element={<Login />} />
        <Route path='/kayit-ol' element={<Register />} />
        <Route path='/profil/:customerSlug' element={<Profile />}>
          <Route path='yorumlar' element={<CustomerBlogComment />} />
          <Route path='begeniler' element={<CustomerBlogLike />} />
        </Route>
        <Route path='/profil-duzenle/:customerSlug' element={<ProfileUpdate />} />
        <Route path="/eposta-dogrula" element={<ConfirmEmail />} />
        <Route path="/sifremi-unuttum" element={<ForgotPassword />} />
        <Route path="/sifre-sifirla" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Cookies />
      <Report />
      <footer>© 2025 Modern Blog. Tüm hakları saklıdır.</footer>
    </>
  );
}

export default App;
