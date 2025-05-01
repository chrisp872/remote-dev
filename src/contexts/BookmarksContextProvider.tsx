import { useState, createContext } from "react";

export const BookmarksContext = createContext(null);

export default function BookmarksContextProvider({ children }) {
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds((prevIds) => {
      if (prevIds.includes(id)) {
        return prevIds.filter((prevId) => prevId !== id);
      } else {
        return [...prevIds, id];
      }
    });
  };

  return (
    <BookmarksContext.Provider value={{ bookmarkedIds, handleToggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  );
}
