
import './App.css'
import {Route, Routes} from "react-router";
import Home from "./pages/Home/Home.jsx";
import Header from "./components/Header/Header.jsx";
import MuseumsList from "./pages/MuseumsList/MuseumsList.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import FavoriteList from "./pages/FavoriteList/FavoriteList.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MuseumDetails from "./pages/MuseumDetails/MuseumDetails.jsx";
import {UserProvider} from "./context/UserProvider.jsx";
import RegisterLoginBase from "./pages/RegisterLoginBase/RegisterLoginBase.jsx";
import RegisterLoginBouttons from "./components/RegisterLoginBouttons/RegisterLoginBouttons.jsx";

function App() {

  return (
    <>
        <UserProvider>


        <Header></Header>
        <Routes>
            <Route index element={<Home />} />

            <Route path={"registerLoginPage"} element={<RegisterLoginBase />}>
                <Route index element={<RegisterLoginBouttons></RegisterLoginBouttons>}></Route>
                <Route path="login" element={<LoginForm />} />
                <Route path="register" element={<RegisterForm />} />
            </Route>

                <Route path={"museums"} element={<MuseumsList />} />
                <Route path={"museum/:id"} element={<MuseumDetails />} />
                <Route path={"profil"} element={<Profile />} />
                <Route path={"favoriteList"} element={<FavoriteList />} />
                <Route path={"mentionslegales"} element={<FavoriteList />} />

        </Routes>
        <Footer></Footer>
        </UserProvider>
    </>
  )
}

export default App
