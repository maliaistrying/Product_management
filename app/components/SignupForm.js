"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "../styles/Signup.module.css"; // <-- Check this path carefully

export default function SignupForm() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      console.log("User signed up:", userCredential.user);
      router.push("/dashboard");
    } catch (err) {
      console.error("Signup error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Create an Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formSpacing}>
        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className={styles.inputField}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className={styles.inputField}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>

        {/* Error Message */}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </div>
  );
}
