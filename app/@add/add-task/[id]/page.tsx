import AddToDo from "@/components/AddToDo";
import { updateToDo } from "@/services/actions";
import getToDoList from "@/services/getToDoById";

interface Props {
  params: { id: string };
}

const ToDoDetailsPage = async ({ params }: Props) => {
  const toDo = await getToDoList(params.id);

  return <AddToDo serverAction={updateToDo} defaultValus={toDo} />;
};

export default ToDoDetailsPage;
