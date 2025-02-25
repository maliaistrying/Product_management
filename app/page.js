"use client";

import Link from "next/link";
import styles from "./styles/RootLayout.module.css";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("user");
    if (!isAuthenticated) {
      redirect("/login");
    } else {
      redirect("/dashboard");
    }
  }, []);

  return (
    <div className={styles.home}>
      <h1 className={styles.homeHeader}>
        Welcome to the Product Management System
      </h1>
    </div>
  );
}
