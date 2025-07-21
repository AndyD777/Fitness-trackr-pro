import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation"; // adjust imports if needed
import { useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // useAuth for token
import SetForm from "../components/SetForm";

export default function RoutineDetailPage() {
  const { id: routineId } = useParams();
  const { token } = useAuth();
  const { data: routine, loading, error } = useQuery(`/routines/${routineId}`, `routine-${routineId}`);

  const deleteRoutine = useMutation("DELETE", `/routines/${routineId}`, ["routines"]);

  // Mutation for deleting a set
  const deleteSet = useMutation("DELETE", `/routines/${routineId}/sets/`, [`routine-${routineId}`]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading routine: {error}</p>;
  if (!routine) return <p>Routine not found.</p>;

  const handleDeleteRoutine = async () => {
    try {
      await deleteRoutine.mutate();
      // optionally redirect or show success message here
    } catch {
      alert("Error deleting routine.");
    }
  };

  const handleDeleteSet = async (setId) => {
    try {
      await deleteSet.mutate(setId);
    } catch {
      alert("Error deleting set.");
    }
  };

  return (
    <div className="p-4">
      <h2>{routine.name}</h2>
      <p><strong>Goal:</strong> {routine.goal}</p>
      <p><strong>Creator:</strong> {routine.creatorName}</p>

      {token && (
        <button onClick={handleDeleteRoutine} className="btn mt-2">
          Delete Routine
        </button>
      )}

      <h3>Sets</h3>
      {routine.sets.length === 0 ? (
        <p>No sets yet. Add some!</p>
      ) : (
        <ul>
          {routine.sets.map((set) => (
            <li key={set.id}>
              {set.name} - {set.count} reps
              {token && (
                <button
                  onClick={() => handleDeleteSet(set.id)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {token && <SetForm routineId={routineId} />}
    </div>
  );
}