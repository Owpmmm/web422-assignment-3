import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  function logout() {
    removeToken();
    router.push("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} href="/">Jiyoon Kim</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">About</Nav.Link>
          </Nav>

          {token && (
            <Nav>
              <NavDropdown title={token.userName} id="user-dropdown">
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}

          {!token && (
            <Nav>
              <Nav.Link as={Link} href="/register">Register</Nav.Link>
              <Nav.Link as={Link} href="/login">Login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}