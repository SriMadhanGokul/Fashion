import { Link } from "react-router-dom";
import Container from "../components/common/Container";
import { serif } from "../utils/format";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className={`${serif} text-4xl`}>We couldn’t find that page</h1>
      <Link to="/" className="mt-6 inline-block bg-[#1c1510] px-6 py-3 text-[10px] tracking-[0.2em] text-white">BACK TO HOME</Link>
    </Container>
  );
}
