import useAuth from "../../hooks/useAuth";

export default function MyProfile() {
  const { user } = useAuth();
  return (
    <div>
      <div className="w-20 h-20">
        <img src={user?.photoURL} alt="" />
      </div>
      <h2 className="text-3xl">{user?.displayName}</h2>
      <h4 className="text-2xl">{user?.email}</h4>
      <div className="join">
        <input className="input input-bordered join-item" placeholder="Email" />
        <button className="btn join-item rounded-r-full">Subscribe</button>
      </div>
    </div>
  );
}
