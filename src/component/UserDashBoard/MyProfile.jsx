import useAuth from "../../hooks/useAuth";

export default function MyProfile() {
  const { user } = useAuth();
  return (
    <div>
      <h2 className="text-3xl">{user?.displayName}</h2>
    </div>
  );
}
