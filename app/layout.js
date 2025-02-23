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
            <nav aria-label="Global" className={styles.nav}>
              <div className={styles.logo}>
                <Link href="/" className={styles.logoLink}>
                  <span className={styles.name}>Product Management System</span>
                  <div className={styles.logoContainer}>
                    <img
                      alt=""
                      src="/images/logo-2.png"
                      className={styles.logoImage}
                    />
                    <p>Product Management System</p>
                  </div>
                </Link>
              </div>
              <div className={styles.menu}>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(true)}
                  className={styles.menuButton}
                >
                  <span className={styles.name}>Open main menu</span>
                  <Bars3Icon aria-hidden="true" className={styles.menuIcon} />
                </button>
              </div>
              <div className={styles.navLinks}>
                <Link href="/" className={styles.link}>
                  Home
                </Link>
                <Link href="/products" className={styles.link}>
                  Products
                </Link>
                <Link href="/addProduct" className={styles.link}>
                  Add Product
                </Link>
              </div>
              <div className={styles.authLinks}>
                <Link href="/signup" className={styles.link}>
                  Sign Up
                </Link>
                <Link href="/login" className={styles.link}>
                  Log in <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </nav>
            <Dialog
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
              className={styles.dialog}
            >
              <div className={styles.d} />
              <DialogPanel className={styles.dialogPanel}>
                <div className={styles.dialogPanelHeader}>
                  <Link href="/" className={styles.logoLink}>
                    <span className={styles.name}>
                      Product Management System
                    </span>
                    <div className={styles.logoContainer}>
                      <img
                        alt=""
                        src="/images/logo-2.png"
                        className={styles.logoImage}
                      />
                      <p>Product Management System</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className={styles.dialogPanelButton}
                  >
                    <span className={styles.name}>Close menu</span>
                    <XMarkIcon aria-hidden="true" className={styles.menuIcon} />
                  </button>
                </div>
                <div className={styles.dialogLinksContainer}>
                  <div className={styles.dialogLinks}>
                    <div className={styles.pagesLinks}>
                      <Link href="/" className={styles.dialogLink}>
                        Home
                      </Link>
                      <Link href="/products" className={styles.dialogLink}>
                        Products
                      </Link>
                      <Link href="/addProduct" className={styles.dialogLink}>
                        Add Product
                      </Link>
                    </div>
                    <div className={styles.dialogAuthLinks}>
                      <Link href="/signup" className={styles.dialogAuthLink}>
                        Sign Up
                      </Link>
                      <Link href="/login" className={styles.dialogAuthLink}>
                        Log in
                      </Link>
                    </div>
                  </div>
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
