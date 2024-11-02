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
    "https://dummyjson.com/todos?limit=300&skip=0"
  ); // I know this isn't efficient, but due to the mock database and constant of only 254 todos, this should suffice for now.

  const data: Data = await respone.json();

  return data.todos;
};

export default getToDoList;
