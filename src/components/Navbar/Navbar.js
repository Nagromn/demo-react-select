import styles from "./Navbar.module.css";
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link className={styles.navbarLink} to="/">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link className={styles.navbarLink} to="/produit">
        <FontAwesomeIcon icon={faPlus} />
      </Link>
    </nav>
  );
}
