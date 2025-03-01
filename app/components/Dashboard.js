"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, collection, getDocs } from "@/lib/firebase";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from "../styles/Dashboard.module.css";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchProducts();
      } else {
        setIsLoggedIn(false);
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setFilteredProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filter === "highest") {
      setFilteredProducts(
        [...products].sort((a, b) => b.quantity - a.quantity)
      );
    } else if (filter === "lowest") {
      setFilteredProducts(
        [...products].sort((a, b) => a.quantity - b.quantity)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [filter, products]);

  const style = {
    loadingText: {
      color: "#0070f3",
    },
    noProductsText: {
      color: "#ff0000",
    },
    productsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gap: "20px",
    },
    productCard: {
      border: "1px solid #ddd",
      padding: "10px",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    },
    productImage: {
      width: "100%",
      height: "auto",
    },
    productName: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333333",
    },
    productQuantity: {
      fontSize: "16px",
      color: "#333333",
    },
    productDescription: {
      fontSize: "16px",
      color: "#333333",
    },
  };

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <p style={style.noProductsText}>Loading products...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardHeader}>
        <div>
          <h2 className={styles.title}>Dashboard</h2>
          <p className={styles.subtitle}>Overview of all added products</p>
        </div>
        <div>
          <button
            className={styles.filterButton}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Filter Products <i className="bi bi-funnel"></i>
          </button>
          {dropdownOpen && (
            <div className={styles.filtersList}>
              <ul>
                <li className={styles.listItem}>
                  <button
                    className={styles.filter}
                    onClick={() => {
                      setFilter("highest");
                      setDropdownOpen(false);
                    }}
                  >
                    Highest Quantity
                  </button>
                </li>
                <li className={styles.listItem}>
                  <button
                    className={styles.filter}
                    onClick={() => {
                      setFilter("lowest");
                      setDropdownOpen(false);
                    }}
                  >
                    Lowest Quantity
                  </button>
                </li>
                <li className={styles.listItem}>
                  <button
                    className={styles.filter}
                    onClick={() => {
                      setFilter("all");
                      setDropdownOpen(false);
                    }}
                  >
                    Clear
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p style={style.noProductsText}>No products found.</p>
      ) : (
        <div style={style.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={style.productCard}>
              <img
                src={product.image}
                alt={product.name}
                style={style.productImage}
              />
              <h3 style={style.productName}>{product.name}</h3>
              <p style={style.productQuantity}>Quantity: {product.quantity}</p>
              <p style={style.productDescription}>{product.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
