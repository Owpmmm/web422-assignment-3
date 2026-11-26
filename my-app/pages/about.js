import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export default function About({ book }) {
  return (
    <>
      <PageHeader text="About the Developer: Jiyoon Kim" />

      <p>
        Hello! My name is Jiyoon Kim, and I am a student at
        Seneca Polytechnic studying Computer Programming
        and Analysis.
      </p>

      <p>
        This application was created for WEB422 Assignment 2.
        It uses Next.js, React-Bootstrap, SWR, and the Open
        Library API to display information about books.
      </p>

      <h4>Featured Book</h4>
      <hr />

      <BookDetails book={book} workId="OL453657W" showFavouriteBtn={false} />
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch(
      "https://openlibrary.org/works/OL453657W.json"
    );

    if (!response.ok) {
      throw new Error("Unable to fetch book.");
    }

    const book = await response.json();

    return {
      props: { book },
      revalidate: 3600,
    };
  } catch (error) {
    return {
      props: { book: null },
      revalidate: 60,
    };
  }
}