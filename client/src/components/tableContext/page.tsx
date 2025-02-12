"use client";
import { getToken } from "firebase/messaging";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { io } from "socket.io-client";
import FcmTokenComp from "../Firebase/page";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const socket = io("ws://localhost:1337");

export type UserData = {
  id: string;
  email: string;
  name: string;
  phone: string;
  profileImage: string;
  bio: string;
  division: string;
  district: string;
  thana: string;
  registeredAt: string;
  isBanned: boolean; // Ensuring isBanned is boolean
};

interface UserContextType {
  users: UserData[];
  setUsers: Dispatch<SetStateAction<UserData[]>>;
  updateUserStatus: (id: string, isBanned: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<UserData[]>([]);

  // Function to update user ban/unban status in real-time
  const updateUserStatus = (id: string, isBanned: boolean) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === id ? { ...user, isBanned } : user))
    );
  };

 

  useEffect(() => {
  
    // Request permission for notifications
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    socket.on("news", (data) => {
      console.log("Received:", data);

      // Show browser notification if permission is granted
      if (Notification.permission === "granted") {
        new Notification(data.title, {
          body: data.content
        });
      }
      toast.info(`${data.title}: ${data.content}`);
    });
    const userId = Cookies.get("userId");
    if (userId) {
      socket.on(userId, (data) => {
        console.log("Received:", data);

        // Show browser notification if permission is granted
        if (Notification.permission === "granted") {
          new Notification(data.title, {
            body: data.content
          });
        }
        toast.info(`${data.title}: ${data.content}`);
      });
    }

    socket.emit("subscribeTopic", "news");
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers, updateUserStatus }}>
      <FcmTokenComp />
      <ToastContainer position="top-right" autoClose={3000} />
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
}