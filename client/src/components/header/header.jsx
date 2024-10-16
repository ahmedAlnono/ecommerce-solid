import { A, useLocation } from "@solidjs/router";
import styles from "./header.module.css";
import { createSignal } from "solid-js";
const Header = () => {
  const location = useLocation();

  const [active, setActive] = createSignal(
    `start-${location.pathname.slice(1)}`
  );

  return (
    <div class={styles['header-container']}>
      <div class={styles.container} style={{ background: "#34495e" }}>
        <nav class={styles.header}>
          <A
            class={`${styles["nav-item"]}`}
            href="/home"
            onClick={() => {
              setActive("start-home");
            }}
          >
            Home
          </A>
          <A
            class={`${styles["nav-item"]}`}
            href="/profile"
            onClick={() => {
              setActive("start-profile");
            }}
          >
            profile
          </A>
          <A
            class={`${styles["nav-item"]}`}
            href="/orders"
            onClick={() => {
              setActive("start-orders");
            }}
          >
            orders
          </A>
          <A
            class={`${styles["nav-item"]}`}
            href="/login"
            onClick={() => {
              setActive("start-login");
            }}
          >
            Login
          </A>
          <A
            class={`${styles["nav-item"]}`}
            href="/sell"
            onClick={() => {
              setActive("start-sell");
            }}
          >
            Sell Item
          </A>
          <div class={`${styles.animation} ${styles[`${active()}`]}`}></div>
        </nav>
      <h1 class="self-center p-0 ml-auto hidden md:block">
        E-Commerce
      </h1>
      </div>
    </div>
  );
};

export default Header;
