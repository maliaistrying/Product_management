import Link from "next/link";
import styles from "./styles/RootLayout.module.css"; // Ensure this path is correct

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <h2 className={styles.mainTitle}>
          Welcome to the Product Management System
        </h2>
      </main>
    </div>
  );
}
