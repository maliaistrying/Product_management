"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Login.module.css"; // <-- Ensure this path is correct

export default function LoginForm() {
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      console.log("User logged in:", user);

      // Store user email in localStorage
      localStorage.setItem("user", JSON.stringify({ email: user.email }));

      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <div className={styles.container}>
        <div className={styles.header}>
          <img className={styles.logo} src="/images/logo-2.png" alt="logo" />
          <h2 className={styles.title}>Login to your account</h2>
        </div>
        <div className={styles.formWrapper}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={styles.formSpacing}
          >
            {/* Email Input */}
            <div>
              <label className={styles.label}>Email Address</label>
              <div className="mt-2">
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={styles.inputField}
                />
              </div>
              {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className={styles.passwordLabelContainer}>
                <label className={styles.label}>Password</label>
                <div className="text-sm">
                  <a href="#" className={styles.ForgotPasswordLink}>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={styles.inputField}
                />
              </div>
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className={styles.submitButton}>
              Login
            </button>

            {/* Error Message */}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>

          <p className={styles.footer}>
            Not a member?{" "}
            <a href="/signup" className={styles.link}>
              Register Now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
