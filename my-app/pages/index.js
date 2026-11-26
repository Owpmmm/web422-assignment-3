/********************************************************************************
 * WEB422 – Assignment 03
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 * https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Jiyoon Kim  Student ID: 154653208  Date: 2026-11-26
 ********************************************************************************/
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Row } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { author: "", title: "", subject: "", language: "", first_publish_year: "" }
  });

  const onSubmit = (data) => {
    router.push({
      pathname: "/books",
      query: Object.fromEntries(Object.entries(data).filter(([, value]) => value !== ""))
    });
  };

  return (
    <>
      <PageHeader text="Search for Books" subtext="Find books by author, title, subject, language, or first publication year." />
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row className="g-3">
          <Col md={6}>
            <Form.Group controlId="author">
              <Form.Label>Author *</Form.Label>
              <Form.Control placeholder="e.g. Terry Pratchett" {...register("author", { required: "Please enter an author." })} className={errors.author ? "is-invalid" : ""} />
              {errors.author && <Form.Control.Feedback type="invalid">{errors.author.message}</Form.Control.Feedback>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control placeholder="Book title" {...register("title")} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control placeholder="e.g. Fantasy" {...register("subject")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="language">
              <Form.Label>Language</Form.Label>
              <Form.Control placeholder="e.g. eng" {...register("language")} />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="first_publish_year">
              <Form.Label>First Published Year</Form.Label>
              <Form.Control type="number" placeholder="e.g. 1983" {...register("first_publish_year")} />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="mt-4">Search Books</Button>
      </Form>
    </>
  );
}
