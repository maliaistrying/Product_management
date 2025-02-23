"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import styles from "../styles/Login.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err) {
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
          <form onSubmit={handleLogin} className={styles.formSpacing}>
            <div>
              <label className={styles.label}>Email Address</label>
              <div className="mt-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              {/* {errors.email && (
                <p className={styles.errorMessage}>{errors.email.message}</p>
              )} */}
            </div>
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
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  required
                />
              </div>
              {/* {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )} */}
            </div>
            <button type="submit" className={styles.submitButton}>
              Login
            </button>

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
