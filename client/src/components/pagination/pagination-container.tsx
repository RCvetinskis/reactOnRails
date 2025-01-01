import { useSearchParams } from "react-router-dom";
import PaginationNumbers from "./pagination-numbers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Props = {
  totalPages: number;
};

const PaginationContainer = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setSearchParams({ page: page.toString() });
    }
  };

  return (
    <Pagination className="flex items-center justify-center md:justify-end ">
      <PaginationContent>
        <PaginationItem className="hover:cursor-pointer">
          <PaginationPrevious
            onClick={() => handlePageChange(currentPage - 1)}
          />
        </PaginationItem>

        <PaginationNumbers
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
        <PaginationItem className="hover:cursor-pointer">
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationContainer;
