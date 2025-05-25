"use client";
import { Canvas } from "@react-three/fiber";

import { Experience } from "../../components/3d/Experience";
import { SocketManager } from "../../components/3d/SocketManager";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <SocketManager />
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experience />
      </Canvas>
    </div>
  );
}

export default App;

const page = () => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Dashboard Button - upper left */}
      <button
        onClick={() => (window.location.href = "/")}
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 10,
          background: "white",
          border: "none",
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          cursor: "pointer",
        }}
        aria-label="Go to Dashboard"
      >
        {/* Simple Home Icon SVG */}
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12L12 4l9 8" />
          <path d="M9 21V12h6v9" />
        </svg>
      </button>
      <MultiplayerScene />
    </div>
  );
};

// To run the socket server, use the following command in your terminal:
// node socket-server.js
