import ToDo from "@/interface/ToDo";
import fetchWithToken from "./fetchWithToken";
import { notFound } from "next/navigation";

const getToDoList = async (id: string) => {
  const response = await fetchWithToken(`https://dummyjson.com/todos/${id}`);

  if (response.status === 404) notFound();

  const toDo: ToDo = await response.json();

  return toDo;
};

export default getToDoList;
