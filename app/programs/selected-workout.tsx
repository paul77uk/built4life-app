"use client";

import { useEffect, useState } from "react";

const SelectedWorkout = ({ id, title }: { id: string; title: string }) => {
  const [selectedId, setSelectedId] = useState<string>("");

  return (
    <div
      className={selectedId === id ? "bg-primary" : "bg-black"}
      onClick={() => setSelectedId(id)}
    >
      {title}
    </div>
  );
};
export default SelectedWorkout;
