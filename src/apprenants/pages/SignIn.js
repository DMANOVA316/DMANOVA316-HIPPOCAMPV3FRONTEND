import React from "react";

import Logo2 from "@/images/Logo2.png";
import Swal from "sweetalert2";
import { Link, useLocation } from "react-router-dom";
import axios from "@/api/axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

import NavbarAccuiel from "@/apprenants/components/NavbarAccuiel";
import NavBarPrincipale from "@/apprenants/components/NavBarPrincipale";
import images from "@/images/login.jpg";
import NavbarAccuielSite from "@/apprenants/components/NavbarAccuielSite";
import NavBarPrincipaleSite from "@/apprenants/components/NavBarPrincipaleSite";

// import images from "@/images/svg/login-bg.svg";
import logo from "@/images/logo-hippocamp.png";
import wave from "@/images/svg/wave.svg";
import userIcon from "@/images/svg/user.svg";
import homeIcon from "@/images/svg/home-light.svg";

// const styles = {
//   borderRadius: '20px',
//   width: '80%',
//    height: '80%',
//    marginTop:'-10%'

// };
// const style = {
//   borderRadius: '20px',
//   width: '40%',
//    height: '30%',
//    marginTop:'10%'
// };
const styles = {
  backgroundImage: `url('https://s3-alpha-sig.figma.com/img/c297/5ed9/feedde7751b41eae50bbf1887e4955a4?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bsKWE4kSPALCsL-IuPuU2ZQc9FcP4eKWRQwiYu61K42enIsDNTQs~biQn6-jLdHib36EK15WdKlKV7PpPBDzOd1arIGUCTOZ5jf1cDerhvhvLwJo5f9XRpPBiz5jmwjjJt-mK2J9bWzoT7t~qsQ7qD0qn3uQtfcnOOlAGGMRcFYiF53DMCrbmcaLMWLALud-lhLZNx3MBWtpcOCTPeuai5G~YAtwVDfCU3~TTtTuLVEJ-N~ZxWLfoQ2bisL~cQTTOSffplSOT7INlsMlRxaeitux7k7KKAEjyD8sZ~xtQvJiHIrIU-1dClsU4vLgFJEkSPZou7DWCezVkkXG2lLLFg__')`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",

  borderRadius: "20px",
  // width: '80%',
  height: "100%",
  // marginTop: "-10%",
};
const styleTitle = {
  fontFamily: "Kalnia",
};
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const nom = queryParams.get("nom");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/LoginApprenant?email=" + email + "&password=" + password
      );

      if (response.status === 200) {
        // window.location.href="/home?token="+response.data;
        Cookies.set("token", response.data);
        //navigate("/coursapprenant")
        window.location.href = "/coursapprenant";
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Veuillez activer votre compte",
          footer: '<a href=""></a>',
        });
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Veuillez activer votre compte",
        footer: '<a href=""></a>',
      });
    }
  };

  return (
    <>
      {/* <NavbarAccuiel />
      <NavBarPrincipale />
      <br></br>
      <br></br>
      <br></br> */}
      {/* <section style={{ backgroundColor: "white" }}>
        <div class="flex justify-center" style={{ marginTop: 60 }}>
          <div
            class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 
      dark:bg-gray-800 dark:border-gray-700"
          >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Connexion
              </h1>

              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium 
                      text-gray-900 dark:text-white"
                  >
                    Adresse email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 
                      text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 
                      block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 
                      dark:text-white"
                  >
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                      focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                       dark:focus:border-blue-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border
                            border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 
                            dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                            dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Souvenez-vous de moi
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgetpassword"
                    style={{ color: "#F39530 ", fontWeight: "bold" }}
                    class="text-sm font-medium text-blue-700 hover:underline 
                      dark:text-primary-500"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
                <button
                  type="submit"
                  style={{ backgroundColor: "#0096BB" }}
                  class="w-full text-white bg-blue-700
                   hover:bg-primary-700 focus:ring-4 focus:outline-none 
                  focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Se connecter
                </button>

                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Vous n'avez pas encore de compte ?
                  <Link
                    to="/signup"
                    style={{ color: "#F39530 ", fontWeight: "bold" }}
                    class="font-medium text-blue-700  hover:underline dark:text-primary-500"
                  >
                    S'inscrire
                  </Link>
                </p>
              </form>
            </div>
          </div>

          <div class=" md:mt-0 sm:max-w-md" style={{ marginLeft: "20%" }}>
            <img src={images} alt="" style={styles} />

            <h2
              style={{ fontWeight: "bold" }}
              class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-3xl 
            dark:text-white text-gray-900"
            >
              Bon retour parmi nous
            </h2>

            <h2
              class="max-w-2xl mb-4 text-4xl  tracking-tight leading-none md:text-4xl xl:text-xl 
            dark:text-white text-gray-900"
            >
              <strong style={{ color: "#0096BB" }}>
                Vivez de votre savoir
              </strong>{" "}
              et créez la meilleure expérience de formation pour vos apprenants.
            </h2>
          </div>
        </div>
      </section> */}
      {/*  */}
      <div class="relative flex gap-[16px] p-[16px] bg-white w-full h-screen overflow-hidden">
        <div class="absolute top-0 right-0 p-4">
          <a
            href="/"
            className="flex gap-[8px] items-center text-primary font-normal cursor hover:text-grayRaven"
          >
            <img src="{homeIcon}" alt="" className="" />
            <span className="font-normal">Retour à la page d'accueil</span>
          </a>
        </div>
        <div className="w-1/2 rounded-[28px] h-full" style={styles}></div>
        <div className="flex flex-col items-center gap-[40px] justify-center w-1/2">
          <img src={logo} alt="" className="" />
          <div className="flex flex-col gap-[24px] items-center">
            <h1 className="text-4xl font-semibold" style={styleTitle}>
              Connectez-vous
            </h1>
            <div class="flex gap-2">
              <p className="text-grayRaven">Bon retour parmi nous !</p>
              <img src={wave} alt="" className="" />
            </div>
            <form
              className="my-10 flex flex-col items-center gap-[24px]"
              onSubmit={handleSubmit}
            >
              <div className="flex sm:min-w-[400px] flex-col gap-[24px]">
                <div className="w-full">
                  <label
                    for="email"
                    className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <img src={userIcon} alt="" className="" />
                    <span className="font-normal">Addresse email </span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-100 border-none text-gray-900 
                        text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                         dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                         dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="name@company.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for="password"
                    className="flex gap-[6px] block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-100 border-none text-gray-900 
                    text-sm rounded-md focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                     dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border
                            border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 
                            dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 
                            dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                        required
                      >
                        Souvenez-vous de moi
                      </label>
                    </div>
                  </div>
                  <Link
                    to="/forgetpasswordform"
                    style={{ color: "#F39530 ", fontWeight: "bold" }}
                    class="text-sm font-medium text-blue-700 hover:underline 
                      dark:text-primary-500 underline"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-cyan-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Se connecter
              </button>
            </form>
            <div class="flex flex-col items-center">
              <p className="text-grayRaven">
                Vous n’avez pas encore de compte ?
              </p>
              <a
                href="/adhesionform"
                className="text-yellowSea font-bold cursor"
              >
                S'inscrire
              </a>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
    </>
  );
};

export default SignIn;
