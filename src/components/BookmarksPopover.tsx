import { createPortal } from "react-dom";
import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";
import { forwardRef } from "react";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { bookmarkedJobItems, isLoading } = useBookmarksContext();

  return createPortal(
    <div className="bookmarks-popover" ref={ref}>
      <JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body || document.documentElement
  );
});

export default BookmarksPopover;
