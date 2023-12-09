"use client";

import React, { createContext, useContext, ReactNode, useState } from "react";

interface UserContextProps {
  id: string | null;
  username: string | null;
  image: string | null;
  setUserData: (id: string, username: string, image: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [id, setId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const setUserData = (
    newId: string,
    newUsername: string,
    newImage: string
  ) => {
    setId(newId);
    setUsername(newUsername);
    setImage(newImage);
  };

  const value: UserContextProps = {
    id,
    username,
    image,
    setUserData,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const User = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("User must be used within a UserProvider");
  }
  return context;
};
