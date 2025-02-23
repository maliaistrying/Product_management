"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { db, collection, addDoc } from "@/lib/firebase";
import styles from "../styles/AddProductForm.module.css";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Saving the image as base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !description || !image) {
      return alert("All fields are required!");
    }

    setLoading(true);
    try {
      // Save product details in Firestore (without image upload to Storage)
      await addDoc(collection(db, "products"), {
        name,
        quantity: parseInt(quantity),
        description,
        image: image || null, // Save image as base64 or null if no image
        createdAt: new Date(),
      });

      alert("Product added successfully!");
      router.push("/products"); // Navigate to products page after the product is added
      setName("");
      setQuantity("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleAddProduct} className={styles.form}>
      <div className={styles.formSpacing}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Add Product</h2>
          <p className={styles.formSubtitle}>
            Enter product details below. Image is required.
          </p>

          <div className={styles.formInputsContainer}>
            <div className={styles.productName}>
              <label htmlFor="productName" className={styles.label}>
                Product Name
              </label>
              <div className={styles.input}>
                <input
                  name="productName"
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.inputField}
                />
              </div>
            </div>

            <div className={styles.productQuantity}>
              <label htmlFor="productQuantity" className={styles.label}>
                Product Quantity
              </label>
              <div className={styles.input}>
                <input
                  name="productQuantity"
                  id="productQuantity"
                  type="number"
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className={styles.inputField}
                />
              </div>
            </div>

            <div className={styles.productDescription}>
              <label htmlFor="productDescription" className={styles.label}>
                Product Description
              </label>
              <div className={styles.input}>
                <textarea
                  name="productDescription"
                  id="productDescription"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className={styles.inputField}
                />
              </div>
              <p className={styles.productDescriptionText}>
                Write a few sentences about the product.
              </p>
            </div>

            <div className={styles.productImage}>
              <label htmlFor="productImage" className={styles.label}>
                Product Image
              </label>
              <div className={styles.imageUploadContainer}>
                {image ? (
                  <img
                    src={image}
                    alt="Product Preview"
                    className={styles.imagePreview}
                  />
                ) : (
                  <div className={styles.imageUploadPreview}>
                    <PhotoIcon
                      aria-hidden="true"
                      className={styles.photoIcon}
                    />
                    <div className={styles.imageUpload}>
                      <label
                        htmlFor="fileUpload"
                        className={styles.imageUploadLabel}
                      >
                        <span>Upload an image</span>
                        <input
                          name="fileUpload"
                          id="fileUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className={styles.uploadInput}
                        />
                      </label>
                      <p className={styles.dragOrDropText}>or drag and drop</p>
                    </div>
                    <p className={styles.acceptedFormats}>
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}
