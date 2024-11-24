import ToDo from "@/interface/ToDo";
import fetchWithToken from "./fetchWithToken";
import { env } from "process";

interface Data {
  todos: ToDo[];
  total: number;
  skip: number;
  limit: number;
}

const getToDoList = async (skip: number, limit: number) => {
  const respone = await fetch(
    `${process.env.SITE_URL}/api/todos?skip=${skip}&limit=${limit}`,
    { next: { tags: ["todos"] } }
  );
  const data: Data = await respone.json();

  return data;
};

export default getToDoList;
