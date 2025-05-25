import { signIn, signOut, useSession } from "next-auth/react";

export default function Login({ session }: { session: any }) {
  if (!session) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f5f5f5",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 350,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            padding: "32px 20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ marginBottom: 24, fontSize: 24, textAlign: "center" }}>
            Not signed in
          </h1>
          <button
            onClick={() => signIn("google")}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fff",
              color: "#444",
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: "14px 0",
              fontSize: 18,
              fontWeight: 500,
              cursor: "pointer",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              width: "100%",
              marginBottom: 8,
              transition: "background 0.2s",
              gap: 12,
            }}
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              style={{ width: 28, height: 28 }}
            />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }
}
