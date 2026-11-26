import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Button, Col, Container, Row } from "react-bootstrap";
import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId) || false);
  }, [favouritesList, workId]);

  if (!book) return <p>Book information is unavailable.</p>;

  const coverId = book.covers?.[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
    : "https://placehold.co/300x450?text=No+Cover";
  const description = typeof book.description === "string"
    ? book.description
    : book.description?.value || "No description available.";

  async function favouritesClicked() {
    if (!workId) return;

    if (showAdded) {
      setFavouritesList(await removeFromFavourites(workId));
    } else {
      setFavouritesList(await addToFavourites(workId));
    }
  }

  return (
    <Container>
      <Row>
        <Col lg={4}>
          <img src={coverUrl} alt={book.title || "Book cover"} className="img-fluid mb-3" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = "https://placehold.co/300x450?text=No+Cover"; }} />
        </Col>
        <Col lg={8}>
          <h2>{book.title}</h2>
          <p>{description}</p>
          <h5>People</h5><p>{book.subject_people?.join(", ") || "N/A"}</p>
          <h5>Places</h5><p>{book.subject_places?.join(", ") || "N/A"}</p>
          <h5>Links</h5>
          {book.links?.length > 0 ? (
            <ul>{book.links.map((link, index) => (
              <li key={index}><a href={link.url} target="_blank" rel="noopener noreferrer">{link.title || link.url}</a></li>
            ))}</ul>
          ) : <p>N/A</p>}
          {showFavouriteBtn && workId && <Button className="mt-2" variant={showAdded ? "primary" : "outline-primary"} onClick={favouritesClicked}>
            {showAdded ? "+ Favourite (added)" : "+ Favourite"}
          </Button>}
        </Col>
      </Row>
    </Container>
  );
}