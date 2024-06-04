import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div>
      <h className="2text-3xl">Error</h>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}
