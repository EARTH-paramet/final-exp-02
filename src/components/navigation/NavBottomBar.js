import { NavLink } from "./NavLink";
import { useState } from "react";

import styles from "../css/NavBottomBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function NavBottomBar() {
  const [option, setOption] = useState("home");

  return (
    <div className={styles.bottomAppbar}>
      <div className={styles.tabs}>
        <div className={`${styles.tab} ${styles.tabLeft}`}>
          <div className="row">
            <div
              className={`${"col-6"} ${styles.menuNav}`}
              onClick={() => setOption("home")}
            >
              <NavLink to="/">
                <div className={styles.iconsBar}>
                  <FontAwesomeIcon
                    className="icon"
                    icon="fa-solid fa-house"
                    size="xl"
                  />
                </div>
                <span>Home</span>
              </NavLink>
            </div>
            <div
              className={`${"col-6"} ${styles.menuNav}`}
              onClick={() => setOption("fridge")}
            >
              <NavLink to="/fridge">
                <div className={styles.iconsBar}>
                  <FontAwesomeIcon icon="fa-solid fa-snowflake" size="xl" />
                </div>
                <span>Fridge</span>
              </NavLink>
            </div>
          </div>
        </div>
        <div onClick={() => setOption("scan")}>
          <div className={styles.top}>
            <NavLink to="/scan">
              <div className={styles.fab}>
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </div>
            </NavLink>
          </div>
        </div>
        <div className={`${styles.tab} ${styles.tabRight}`}>
          <div className="row">
            <div
              className={`${"col-6"} ${styles.menuNav}`}
              onClick={() => setOption("category")}
            >
              <NavLink to="/category">
                <div
                  className={styles.iconsBar}
                  style={{ transform: "translateX(15%)" }}
                >
                  <FontAwesomeIcon icon="fa-solid fa-layer-group" size="xl" />
                </div>
                <span>CATEGORY</span>
              </NavLink>
            </div>
            <div
              className={`${"col-6"} ${styles.menuNav}`}
              onClick={() => setOption("profile")}
            >
              <NavLink to="/profile">
                <div className={styles.iconsBar}>
                  <FontAwesomeIcon icon="fa-solid fa-user" size="xl" />
                </div>
                <span>Profile</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
