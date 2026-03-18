import React, { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

const AuthPage = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [role, setRole] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoaded || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      console.log("SignIn Result :", result);

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        // You can persist the selected role if your app uses it
        // localStorage.setItem("role", role);
      } else {
        setError("Unable to complete sign in. Please try again.");
      }
    } catch (err) {
      // const clerkError = err?.errors?.[0]?.message;
      // setError(clerkError || "Sign in failed. Please check your credentials.");
      console.log("Full Clerk Error:", err);
      setError((err as any)?.errors?.[0]?.message || "Sign in failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #ffe9cc 0%, #fff5e6 40%, #fffaf2 100%)",
        padding: "16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#ffffff",
          borderRadius: "24px",
          padding: "32px 32px 24px",
          boxShadow:
            "0 24px 60px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.6)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "9999px",
              backgroundColor: "#ff8a1f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              color: "#fff",
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            <span role="img" aria-label="chef hat">
              👨‍🍳
            </span>
          </div>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: 600,
              margin: 0,
              color: "#111827",
            }}
          >
            TastyBite Restaurant
          </h1>
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "14px",
              color: "#6B7280",
            }}
          >
            Sign in to access the management system
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="role"
              style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                padding: "9px 12px",
                fontSize: "14px",
                color: "#111827",
                outline: "none",
                backgroundColor: "#F9FAFB",
              }}
            >
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
            </select>
          </div> */}

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="email"
              style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                padding: "9px 12px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#F9FAFB",
              }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              htmlFor="password"
              style={{ fontSize: "13px", fontWeight: 500, color: "#374151" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                padding: "9px 12px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#F9FAFB",
              }}
            />
          </div>

          {error && (
            <div
              style={{
                fontSize: "13px",
                color: "#b91c1c",
                backgroundColor: "#fee2e2",
                borderRadius: "8px",
                padding: "8px 10px",
                marginTop: "4px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !isLoaded}
            style={{
              marginTop: "8px",
              borderRadius: "9999px",
              border: "none",
              padding: "10px 16px",
              backgroundColor: submitting ? "#f97316cc" : "#f97316",
              color: "#ffffff",
              fontSize: "15px",
              fontWeight: 600,
              cursor: submitting || !isLoaded ? "not-allowed" : "pointer",
              boxShadow:
                "0 12px 20px rgba(249,115,22,0.3), 0 0 0 1px rgba(249,115,22,0.4)",
              transition: "background-color 0.18s ease, transform 0.12s ease",
            }}
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => alert("Forgot password functionality not implemented yet.")}
          style={{
            marginTop: "14px",
            width: "100%",
            textAlign: "center",
            border: "none",
            background: "none",
            color: "#f97316",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default AuthPage;

