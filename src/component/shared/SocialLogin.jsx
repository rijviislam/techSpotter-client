// import Img2 from "../assets/github.png";
// import Img from "../assets/google.png";

import useAuth from "../../hooks/useAuth";

export default function SocialLogin() {
  const { googleLogin } = useAuth();
  return (
    <>
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => googleLogin()}
          aria-label="Log in with Google"
          className="p-3 rounded-sm"
        >
          <img
            className="w-8 h-8 object-contain"
            // src={Img}
            alt="Google Login"
          />
        </button>

        <button aria-label="Log in with GitHub" className="p-3 rounded-sm">
          {/* <img className="w-8 h-8 object-contain" src={Img2} alt="" /> */}
        </button>
      </div>
    </>
  );
}
