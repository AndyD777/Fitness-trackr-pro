import { useParams, useNavigate } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ActivityDetailPage() {
  const { activityId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${activityId}`, null);

  const {
    mutate: deleteActivity,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", `/activities/${activityId}`, ["activities"]);

  const handleDelete = async () => {
    await deleteActivity();
    navigate("/activities");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <>
      <h2>{activity.name}</h2>
      <p>{activity.description}</p>
      <p>Created by: {activity.creatorName}</p>
      {token && (
        <button onClick={handleDelete}>
          {deleting ? "Deleting..." : deleteError || "Delete Activity"}
        </button>
      )}
    </>
  );
}
