import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContext = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

export default function SearchTextContextProvider({
  children,
}: React.PropsWithChildren) {
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 300);

  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
    // setCurrentPage(1);
  };

  return (
    <SearchTextContext.Provider
      value={{ searchText, debouncedSearchText, handleChangeSearchText }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
