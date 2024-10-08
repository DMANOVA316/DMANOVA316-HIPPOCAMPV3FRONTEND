import { useState, useEffect } from "react";

import axios from "@/api/axios";

import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import images from "@/images/Logo2.png";

import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const navigation = [
  { name: "Mon profil", href: "/profilformateur" },
  { name: "Messages", href: "/ListeMessageFormateur" },
];
const userNavigation = [
  { name: "Mon Profil", href: "/profilformateur" },
  { name: "Modifier Photo", href: "/modifierphoto" },
  { name: "Se déconnecter", href: "/signinform" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navform = () => {
  const location = useLocation();
  const token = Cookies.get("token");

  const [demandes, setDemandes] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState();

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get("/countVue?token=" + token)
      .then((response) => {
        setUnreadMessages(response.data);
        console.log(response.data.image);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
  }, []);

  useEffect(() => {
    // Effectuer une requête HTTP pour récupérer les détails de l'utilisateur et les paramètres de l'utilisateur
    axios
      .get("/InfoFormateurPhoto?token=" + token)
      .then((response) => {
        setDemandes(response.data);
        console.log(response.data.image);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      });
  }, []);

  const user = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };

  return (
    <>
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <Disclosure
            as="nav"
            className="bg-gray-900  dark:bg-gray-800 dark:border-gray-700 
            fixed left-[240px] right-0 top-0 z-50"
          >
            {({ open }) => (
              <>
                <div className="mx-auto px-4 sm:px-6 lg:px-8" 
        style={{backgroundColor:'#fff'}}
        >
                  <div className="flex h-16 items-center justify-between"
                  style={{display: 'flex',
                    justifyContent: 'flex-end'}}>
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {/* <img
                          className="h-20 w-20 mr-16"
                          src={images}
                          alt="Your Company"
                        /> */}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0"></div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4 relative">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={item.onClick}
                              className={classNames(
                                location.pathname === item.href
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "rounded-md px-3 py-2 text-sm font-medium relative"
                              )}
                              style={{backgroundColor:'#f5f5f5', color:'#020F13'}}

                            >
                              {item.name}
                              {item.name === "Messages" &&
                                unreadMessages > 0 && (
                                  <span className="absolute top-0 right-0 bg-red-500 rounded-full text-xs font-bold px-2 py-1" 
                                  >
                                    {unreadMessages}
                                  </span>
                                )}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-4 flex items-center md:ml-6">
                        <button
                          type="button"
                          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          style={{backgroundColor:'#f5f5f5', color:'#020F13'}}

                        >
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={`http://ec2-52-40-245-130.us-west-2.compute.amazonaws.com:9090/${demandes.pdp}`}
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={user.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">
                          {user.name}
                        </div>
                        <div className="text-sm font-medium leading-none text-gray-400">
                          {user.email}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
        <div className="flex items-center lg:order-2"></div>
      </div>
    </>
  );
};

export default Navform;
