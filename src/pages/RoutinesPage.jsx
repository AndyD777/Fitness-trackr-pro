import { useAuth } from "../auth/AuthContext";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RoutinesPage() {
  const { token } = useAuth();
  const { data: routines = [] } = useQuery("/routines", "routines");
  const [form, setForm] = useState({ name: "", goal: "" });
  const createRoutine = useMutation("POST", "/routines", ["routines"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createRoutine.mutate(form);
    setForm({ name: "", goal: "" });
  };

  return (
    <div>
      <h1>Routines</h1>
      {token && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Routine Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Routine Goal"
            value={form.goal}
            onChange={(e) => setForm({ ...form, goal: e.target.value })}
            required
          />
          <button type="submit">Create Routine</button>
        </form>
      )}
      <ul>
        {routines.map((routine) => (
          <li key={routine.id}>
            <Link to={`/routines/${routine.id}`}>{routine.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
