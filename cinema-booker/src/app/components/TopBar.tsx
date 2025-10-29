"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./topbar.module.css"
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function TopBar() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // useRef (and other below items) used for the positioning of the profile icon dropdown
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  //**NOTE**: isLoggedIn controls the dynamic rendering of either the profile icon (if logged in) OR login button (if not logged in)
  //Tweak it as necessary to change based off the user session information.
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  //Navigate to Home Page
  const homeHandler = () => {
    router.push('/');
  };

  //Navigate to Login Page
  const loginHandler = () => {
    router.push('/login')
  }

  //Handler for Profile Button, toggles visibility of dropdown menu.
  const toggleUserMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY, // below the button
        left: rect.left + window.scrollX + 8,
      });
    }
    setIsExpanded((prev) => !prev);
  };


  //**NOTE**: Edit this handler to log the user out.
  const logoutHandler = () => {
    console.log("Logout Clicked!")
    signOut();
    // globalThis.location.reload();
  }

  //**NOTE**: Edit the URL of this to reflect the User ID of the currently logged-in user.
  const editProfileHandler = () => {
    if (session?.user?.id) {
      router.push(`/user/${session.user.id}/profile/edit`);
    } else {
      router.push('/login');
    }
  }

  //If the user clicks outside of the menu, this useEffect handle closes the menu
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        buttonRef.current &&
        menuRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={styles.topBar}>
      <button className={styles.button} onClick={homeHandler}>
        <FontAwesomeIcon className={styles.icon} icon={faHouse} />
        <p className={styles.buttonText}>Home</p>
      </button>
      <h2 className={styles.mainHeading}>Cinema E-Booking Site</h2>
      {/* {isLoggedIn ? ( */}
      {status === "authenticated" && session?.user && (
        <button className={styles.button} onClick={toggleUserMenu} ref={buttonRef} id='buttonID'>
          <FontAwesomeIcon className={styles.icon} icon={faUser} />
          <p className={styles.buttonText}>Profile</p>
        </button>
      )}
      {status === "unauthenticated" && (
        <button className={styles.loginButton} onClick={loginHandler} ref={buttonRef} id='buttonID'>
          <p className={styles.buttonText}>Login</p>
        </button>)}
      {status === "loading" && (
        <p>Loading session...</p>
      )}
      {isExpanded && (
        <div
          className={styles.dropdownMenu}
          style={{ top: position.top, left: position.left }}
          ref={menuRef}
        >
          <ul className={styles.dropdownMenuContainer}>
            <button className={styles.dropdownMenuButtons} onClick={editProfileHandler}>
              <p>Edit Profile</p>
            </button>
            <button className={styles.dropdownMenuButtons} onClick={logoutHandler}>
              <p>Logout</p>
            </button>
          </ul>
        </div>
      )}
    </div>
  )
}