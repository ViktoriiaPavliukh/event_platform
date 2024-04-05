import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export const UserIdContext = createContext<string | null>(null);

export const useUserId = (): string | null => useContext(UserIdContext);

export const UserIdProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchedUserId =
        typeof user.publicMetadata.userId === "string"
          ? user.publicMetadata.userId
          : null;
      setUserId(fetchedUserId);
    }
  }, [user]);

  return (
    <UserIdContext.Provider value={userId}>{children}</UserIdContext.Provider>
  );
};
