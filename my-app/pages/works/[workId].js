import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import { Spinner } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import BookDetails from "@/components/BookDetails";

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;
  const { data, error, isLoading } = useSWR(workId ? `https://openlibrary.org/works/${workId}.json` : null);

  if (isLoading || !workId) return <div className="text-center"><Spinner animation="border" /><p>Loading book...</p></div>;
  if (error || !data || data.error) return <Error statusCode={404} />;
  return <><PageHeader text={data.title} /><BookDetails book={data} workId={workId} /></>;
}
