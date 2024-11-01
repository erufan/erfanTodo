import ToDo from "@/interface/ToDo";
import fetchWithToken from "./fetchWithToken";

interface Data {
  todos: ToDo[];
  total: number;
  skip: number;
  limit: number;
}

const getToDoList = async () => {
  const respone = await fetchWithToken(
    "https://dummyjson.com/todos?limit=20&skip=0"
  );

  const data: Data = await respone.json();

  return data.todos;
};

export default getToDoList;
