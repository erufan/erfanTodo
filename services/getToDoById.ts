import ToDo from "@/interface/ToDo";

import { notFound } from "next/navigation";

const getToDoList = async (id: string) => {
  const response = await fetch(`${process.env.SITE_URL}/api/todos/${id}`, {
    next: { tags: [id] },
  });

  if (response.status === 404) notFound();

  const toDo: ToDo = await response.json();

  return toDo;
};

export default getToDoList;
