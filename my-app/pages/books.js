import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Alert, Pagination, Spinner, Table } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

const SEARCH_FIELDS = ["author", "title", "subject", "language", "first_publish_year"];

export default function Books() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const queryEntries = useMemo(() => SEARCH_FIELDS
    .filter(key => typeof router.query[key] === "string" && router.query[key].trim() !== "")
    .map(key => [key, router.query[key].trim()]), [router.query]);
  const queryString = queryEntries.map(([key, value]) => `${key}:${value}`).join(" AND ");
  const queryDescription = queryEntries.map(([key, value]) => `${key.replaceAll("_", " ")}: ${value}`).join(" | ");

  useEffect(() => { setPage(1); }, [queryString]);

  const { data, error, isLoading } = useSWR(
    router.isReady && queryString
      ? `https://openlibrary.org/search.json?q=${encodeURIComponent(queryString)}&page=${page}&limit=10`
      : null
  );

  useEffect(() => { setPageData(data?.docs || []); }, [data]);
  const totalPages = data ? Math.ceil((data.numFound ?? data.num_found ?? 0) / 10) : 0;

  return (
    <>
      <PageHeader text="Search Results" subtext={queryDescription || "Search for books from the home page."} />
      {!queryString && <Alert variant="info">Enter a search on the home page to see results.</Alert>}
      {error && <Alert variant="danger">Unable to load books. Please try again later.</Alert>}
      {isLoading && <div className="text-center my-4"><Spinner animation="border" /><p>Loading books...</p></div>}
      {queryString && !isLoading && !error && data && (
        <>
          {pageData.length === 0 ? <Alert variant="info">No books found for this search.</Alert> : (
            <Table striped bordered hover responsive>
              <thead><tr><th>Title</th><th>First Published</th></tr></thead>
              <tbody>{pageData.map(book => (
                <tr key={book.key} onClick={() => book.key && router.push(book.key)} style={{ cursor: "pointer" }}>
                  <td>{book.title}</td><td>{book.first_publish_year || "N/A"}</td>
                </tr>
              ))}</tbody>
            </Table>
          )}
          {totalPages > 1 && <Pagination>
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} />
          </Pagination>}
        </>
      )}
    </>
  );
}
