import ActivityPageItem from "./ActivityPageItem";
import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function ActivitiesPage() {
  const { token } = useAuth();
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");
  const {
    mutate,
    data: addedActivity,
    loading: adding,
    error: addingError,
  } = useMutation("POST", "/activities", ["activities"]);

  if (loading) {
    return <>Loading</>;
  }

  const createActivity = (event) => {
    const name = event.get("name");
    const description = event.get("description");

    mutate({ name, description });
  };

  return (
    <>
      <h1>Activities</h1>
      <ul>
        {activities &&
          activities.map((activity) => {
            return <ActivityPageItem key={activity.name} activity={activity} />;
          })}
      </ul>
      {token && (
        <form action={createActivity}>
          <input name="name" type="text" placeholder="Name"></input>
          <input
            name="description"
            type="text"
            placeholder="Description"
          ></input>
          <button>Add Activity</button>
          
          {addingError && <p>{addingError}</p>}
        </form>
      )}
    </>
  );
}
