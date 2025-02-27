"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, collection, getDocs } from "@/lib/firebase";
import { auth } from "@/lib/firebase"; // Ensure you import your auth configuration
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is logged in
        fetchProducts(); // Fetch products only when logged in
      } else {
        setIsLoggedIn(false); // User is logged out
        router.push("/login"); // Redirect to login if not logged in
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
      setFilteredProducts(productsList); // Set initial filtered products
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filter === "highest") {
      const sortedProducts = [...products].sort((a, b) => b.quantity - a.quantity);
      setFilteredProducts(sortedProducts);
    } else if (filter === "lowest") {
      const sortedProducts = [...products].sort((a, b) => a.quantity - b.quantity);
      setFilteredProducts(sortedProducts);
    } else {
      setFilteredProducts(products); // Show all products if "all" is selected
    }
  }, [filter, products]);

  const styles = {
    dashboardContainer: {
      padding: '20px',
      backgroundColor: '#ffffff',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333333',
    },
    subtitle: {
      fontSize: '18px',
      color: '#555555',
    },
    loadingText: {
      color: '#0070f3',
    },
    noProductsText: {
      color: '#ff0000',
    },
    productsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
    },
    productCard: {
      border: '1px solid #ddd',
      padding: '10px',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9',
    },
    productImage: {
      width: '100%',
      height: 'auto',
    },
    productName: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#333333',
    },
    productQuantity: {
      fontSize: '16px',
      color: '#333333',
    },
    productDescription: {
      fontSize: '16px',
      color: '#333333',
    },
    button: {
      padding: '10px 15px',
      backgroundColor: '#0070f3',
      color: '#ffffff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginRight: '10px',
    },
  };

  if (loading) {
    return <p style={styles.loadingText}>Loading products...</p>; // Loading state
  }

  if (!isLoggedIn) {
    return null; // Or you can return a loading state or null
  }

  return (
    <div style={styles.dashboardContainer}>
      <h2 style={styles.title}>Dashboard</h2>
      <p style={styles.subtitle}>Overview of all added products</p>

      <div>
        <button style={styles.button} onClick={() => setFilter("highest")}>
          Products with Highest Quantity
        </button>
        <button style={styles.button} onClick={() => setFilter("lowest")}>
          Products with Lowest Quantity
        </button>
        <button style={styles.button} onClick={() => setFilter("all")}>
          Show All Products
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <p style={styles.noProductsText}>No products found.</p>
      ) : (
        <div style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <img
                src={product.image}
                alt={product.name}
                style={styles.productImage}
              />
              <h3 style={styles.productName}>{product.name}</h3>
              <p style={styles.productQuantity}>
                Quantity: {product.quantity}
              </p>
              <p style={styles.productDescription}>
                {product.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
