import { Link } from "react-router-dom";
import ErrorImg from "../../assets/page-not-found.png";

export default function Error() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img src={ErrorImg} alt="" />
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
