import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { io } from "socket.io-client";

// Use a better type for characters, e.g. any[] or a specific type
export const socket = io("http://localhost:3009");
export const charactersAtom = atom([]); // Remove TypeScript generics for JS

export const SocketManager = () => {
  const [_characters, setCharacters] = useAtom(charactersAtom);
  useEffect(() => {
    function onConnect() {
      console.log("connected");
    }
    function onDisconnect() {
      console.log("disconnected");
    }

    function onHello() {
      console.log("hello");
    }

    function onCharacters(value) {
      setCharacters(value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("hello", onHello);
    socket.on("characters", onCharacters);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("hello", onHello);
      socket.off("characters", onCharacters);
    };
  }, [setCharacters]);
  return null;
};
