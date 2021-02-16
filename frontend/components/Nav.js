import styles from "../assets/styles/Nav.module.css";
import React, { Component, useContext } from "react";
import logo from "../assets/img/ivsm_no_text.jpg";
import Link from "next/link";
import AuthContext from "../context/auth";
import { useRouter } from "next/router";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const { pathname } = useRouter();

  function handleClick(e) {
    e.preventDefault();
    let mobileMenu = document.getElementById('mobileMenu')
    mobileMenu.className == "sm:hidden" ? mobileMenu.className = "sm:hidden hidden" : mobileMenu.className = "sm:hidden"
  }

  const renderNavLink = (name, path, on) => {
    return (
      <div className={`hover:underline ${pathname === path && "font-bold underline"}`}>
        <Link href={path}>{name}</Link>
      </div>
    );
  };

  return (
  <div>
  <nav className="text-white flex-wrap bg-blue-900">
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

          <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            
            <svg onClick={handleClick} className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" id="hamburger">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            
            <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="IVSM Bank" className={styles.headerLogo} />
          </div>
          <div className="hidden sm:block sm:ml-6" >
            {user?.isLoggedIn && (
              <div className="flex space-x-6 ml-12">
                {user?.role === "user" && renderNavLink("Account", "/account")}
                {user?.role === "user" && renderNavLink("Transactions", "/transactions")}
                {user?.role === "admin" && renderNavLink("Admin", "/admin")}
              </div>
            )}
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div>
            {user?.isLoggedIn ? (
              <>
                <p>
                  {user.first_name} {user.last_name}
                </p>
                <p className="cursor-pointer hover:underline" onClick={logout}>
                  Logout ←
                </p>
              </>
            ) : (
              <Link href="/login">
                <p className={styles.loginText}>⎆ Log in</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>

    <div className="sm:hidden hidden" id="mobileMenu">
      {user?.isLoggedIn && (
        <div className="px-2 pt-2 pb-3 space-y-1">
          {user?.role === "user" && renderNavLink("Account", "/account")}
          {user?.role === "user" && renderNavLink("Transactions", "/transactions")}
          {user?.role === "admin" && renderNavLink("Admin", "/admin")}
        </div>
      )}
    </div>
  </nav>
  </div>
  );
}
