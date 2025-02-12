"use client";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { messaging } from "../Firebase/page";
import { onMessage } from "firebase/messaging";
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
    if(messaging){
        onMessage(messaging,(payload)=>{
            console.log("FCM Got",payload)
        })
    }
    else{
        alert('exist korena')
    }
  }, [])
  

  return (
    <UserContext.Provider value={{ users, setUsers, updateUserStatus }}>
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
