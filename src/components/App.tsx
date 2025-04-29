import { useState } from "react";
import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import JobItemContent from "./JobItemContent";
import { JOB_ITEMS_PER_PAGE } from "../lib/constants";

function App() {
  // state
  const [searchText, setSearchText] = useState<string>("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const { jobItems, isLoading } = useJobItems(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // derived state
  const totalJobItems = jobItems.length;
  const totalPages = totalJobItems / JOB_ITEMS_PER_PAGE;
  const jobItemsSliced = jobItems.slice(
    currentPage * JOB_ITEMS_PER_PAGE - JOB_ITEMS_PER_PAGE,
    currentPage * JOB_ITEMS_PER_PAGE
  );

  // event handlers
  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      setCurrentPage((prevPage) => prevPage + 1);
    } else if (direction === "prev") {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      <Background />

      <Header>
        <HeaderTop>
          <Logo />
          <BookmarksButton />
        </HeaderTop>

        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      </Header>

      <Container>
        <Sidebar>
          <SidebarTop>
            <ResultsCount totalJobItems={totalJobItems} />
            <SortingControls />
          </SidebarTop>

          <JobList jobItems={jobItemsSliced} isLoading={isLoading} />

          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handlePageChange}
          />
        </Sidebar>
        <JobItemContent />
      </Container>

      <Footer />
    </>
  );
}

export default App;
