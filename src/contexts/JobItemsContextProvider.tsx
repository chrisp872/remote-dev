import { createContext, useCallback, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { JOB_ITEMS_PER_PAGE } from "../lib/constants";
import { SortBy, PageDirection, JobItem } from "../lib/types";

type JobItemsContext = {
  jobItems: JobItem[] | undefined;
  isLoading: boolean;
  totalJobItems: number;
  totalPages: number;
  jobItemsSortedAndSliced: JobItem[] | undefined;
  currentPage: number;
  handlePageChange: (direction: PageDirection) => void;
  handleChangeSortBy: (newSortBy: SortBy) => void;
  sortBy: SortBy;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: React.PropsWithChildren) {
  // dependency on other contexts
  const { debouncedSearchText } = useSearchTextContext();

  // state
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  // derived state
  const totalJobItems = jobItems?.length || 0;
  const totalPages = totalJobItems / JOB_ITEMS_PER_PAGE;

  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * JOB_ITEMS_PER_PAGE - JOB_ITEMS_PER_PAGE,
        currentPage * JOB_ITEMS_PER_PAGE
      ),
    [jobItemsSorted, currentPage]
  );

  // event handlers
  const handlePageChange = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);

  const jobItemsContextValue = useMemo(
    () => ({
      jobItems,
      isLoading,
      totalJobItems,
      totalPages,
      jobItemsSortedAndSliced,
      currentPage,
      handlePageChange,
      handleChangeSortBy,
      sortBy,
    }),
    [
      jobItems,
      isLoading,
      totalJobItems,
      totalPages,
      jobItemsSortedAndSliced,
      currentPage,
      handlePageChange,
      handleChangeSortBy,
      sortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={jobItemsContextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
