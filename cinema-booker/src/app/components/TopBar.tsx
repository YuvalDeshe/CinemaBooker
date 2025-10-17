'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import styles from "./topbar.module.css"
import { useRouter } from "next/navigation";

export default function TopBar() {
const router = useRouter();

const returnHandler = () => {
    router.push('/');
};

return (
    <div className={styles.topBar}>
        <button className={styles.homeButton} onClick={returnHandler}>
          <FontAwesomeIcon className={styles.icon} icon={faHouse}/> 
          <p className={styles.buttonText}>Home</p> 
        </button>
        <h2 className={styles.mainHeading}>Cinema E-Booking Site</h2>
        <button className={styles.tempButtonCSS}>
          <FontAwesomeIcon className={styles.icon} icon={faHouse}/> 
          <p className={styles.buttonText}>Home</p> 
        </button> 
      </div>
    )
}