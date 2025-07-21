import { useState } from "react";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export default function SetForm({ routineId }) {
  const { data: activities = [] } = useQuery("/activities", "activities");
  const [form, setForm] = useState({ activityId: "", count: "" });
  const addSet = useMutation("POST", `/routines/${routineId}/sets`, [`routine-${routineId}`]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSet.mutate(form);
      setForm({ activityId: "", count: "" });
    } catch (err) {
      alert("Error adding set");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <select
        value={form.activityId}
        onChange={(e) => setForm({ ...form, activityId: e.target.value })}
        className="input"
      >
        <option value="">--Select Activity--</option>
        {activities.map((a) => (
          <option key={a.id} value={a.id}>{a.name}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Reps"
        value={form.count}
        onChange={(e) => setForm({ ...form, count: e.target.value })}
        className="input"
      />
      <button type="submit" className="btn">Add Set</button>
    </form>
  );
}
