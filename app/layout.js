"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import "./styles/globals.css";
import styles from "./styles/RootLayout.module.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const excludePaths = pathname === "/login" || pathname === "/signup";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <html lang="en">
      <body>
        {!excludePaths && (
          <header className={styles.header}>
            <div className={styles.logo}>
              <Link href="/" className={styles.logoLink}>
                <div className={styles.logoContainer}>
                  <img
                    alt="Logo"
                    src="/images/logo-2.png"
                    className={styles.logoImage}
                  />
                </div>
                <span className={styles.name}>Product Management System</span>
              </Link>
            </div>
            <nav className={styles.navbar}>
              <Link href="/" className={styles.link}>
                Home
              </Link>
              <Link href="/products" className={styles.link}>
                Products
              </Link>
              <Link href="/addProduct" className={styles.link}>
                Add Product
              </Link>
            </nav>
            <div className={styles.buttons}>
              <Link href="/signup" className={styles.button}>
                Sign Up
              </Link>
              <Link href="/login" className={styles.button}>
                Log In
              </Link>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className={styles.menuButton}
            >
              <Bars3Icon aria-hidden="true" className={styles.menuIcon} />
            </button>
            <Dialog
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
              className={styles.dialog}
            >
              <div className={styles.d} />
              <DialogPanel className={styles.dialogPanel}>
                <div className={styles.dialogPanelHeader}>
                  <Link href="/" className={styles.logoLink}>
                    <div className={styles.logoContainer}>
                      <img
                        alt="Logo"
                        src="/images/logo-2.png"
                        className={styles.logoImage}
                      />
                    </div>
                    <span className={styles.name}>Product Management System</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.dialogPanelButton}
                  >
                    <XMarkIcon aria-hidden="true" className={styles.menuIcon} />
                  </button>
                </div>
                <div className={styles.dialogLinksContainer}>
                  <Link href="/" className={styles.dialogLink}>
                    Home
                  </Link>
                  <Link href="/products" className={styles.dialogLink}>
                    Products
                  </Link>
                  <Link href="/addProduct" className={styles.dialogLink}>
                    Add Product
                  </Link>
                  <Link href="/signup" className={styles.dialogAuthLink}>
                    Sign Up
                  </Link>
                  <Link href="/login" className={styles.dialogAuthLink}>
                    Log In
                  </Link>
                </div>
              </DialogPanel>
            </Dialog>
          </header>
        )}
        <main>{children}</main>
      </body>
    </html>
  );
}
