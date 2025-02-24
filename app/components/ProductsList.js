"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import styles from "../styles/ProductsList.module.css";
// import { Button } from "@/components/ui/button";

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.productsContainer}>
      {/* Header Section */}
      <div className={styles.productsHeader}>
        <div>
          <h2 className={styles.productsTitle}>Products</h2>
          <p className={styles.productsSubtitle}>
            Manage your product inventory easily.
          </p>
        </div>
        <Link href="/addProduct">
          <button className={styles.addProductButton}>+ Add Product</button>
        </Link>
      </div>

      {/* Table Container */}
      <div className={styles.productsTableContainer}>
        <table className={styles.productsTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Description</th>
              <th>Image</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product.id}
                className={`border-t ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="py-4 px-4 text-gray-800">{product.name}</td>
                <td className="py-4 px-4 text-gray-800">{product.quantity}</td>
                <td className="py-4 px-4 text-gray-600">
                  {product.description}
                </td>
                <td className={styles.productImageCell}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.productImage}
                  />
                </td>
                <td className="text-right">
                  <Link
                    href={`/editProduct/${product.id}`}
                    className={styles.editLink}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
