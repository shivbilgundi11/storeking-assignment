import { Button } from "react-bootstrap";
import { FaGithub } from "react-icons/fa";
import Logo from "../assets/storeking.png";

export default function Navbar() {
  return (
    <>
      <nav className="container h-50 border-bottom p-2 d-flex align-items-center justify-content-between">
        <a href="/">
          <img src={Logo} className="" alt="storeking-logo" />
        </a>

        <a
          href="https://github.com/shivbilgundi11/storeking-assignment"
          target="_blank"
        >
          <Button
            variant={"success"}
            className="d-d-inline-flex align-items-center fw-medium"
          >
            <FaGithub className="me-1" /> Source Code
          </Button>
        </a>
      </nav>
    </>
  );
}
