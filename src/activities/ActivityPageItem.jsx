import { useAuth } from "../auth/AuthContext";
import useMutation from "../api/useMutation";

export default function ActivityPageItem({ activity }) {
  const { token } = useAuth();
  const {
    mutate,
    data: data,
    loading: deleting,
    error: error,
  } = useMutation("DELETE", "/activities/" + activity.id, ["activities"]);

  return (
    <li>
      {activity.name}
      {token && <button onClick={() => mutate({
        "Authorization": `Bearer ${token}`
      })}>{error ? error : "Delete"}</button>}
    </li>
  );
}
