import { useState } from "react";
import { Create } from "./create";
import { Grid } from "./grid";
import { FaPlus } from "react-icons/fa6";

export function Flights() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <button onClick={() => setShowForm(!showForm)}>
        <FaPlus />
        <span>New</span>
      </button>
      <div className="flex flex-row justify-between items-center">
        {showForm ? <Create onSave={() => setShowForm(!showForm)} /> : <Grid />}
      </div>
    </>
  );
}
