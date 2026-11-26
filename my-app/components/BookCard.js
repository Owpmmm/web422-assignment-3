import Link from "next/link";
import useSWR from "swr";
import Error from "next/error";
import { Button, Card, Spinner } from "react-bootstrap";

export default function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(workId ? `https://openlibrary.org/works/${workId}.json` : null);
  if (isLoading) return <div className="text-center"><Spinner animation="border" size="sm" /></div>;
  if (error || !data || data.error) return <Error statusCode={404} />;

  const coverId = data.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://placehold.co/300x450?text=No+Cover";

  return <Card className="h-100">
    <Card.Img variant="top" src={coverUrl} alt={data.title || "Book cover"} className="book-card-cover" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "https://placehold.co/300x450?text=No+Cover"; }} />
    <Card.Body className="d-flex flex-column">
      <Card.Title>{data.title || ""}</Card.Title>
      <Card.Text>{data.first_published_date || "N/A"}</Card.Text>
      <Button as={Link} href={`/works/${workId}`} className="mt-auto">View Book</Button>
    </Card.Body>
  </Card>;
}
