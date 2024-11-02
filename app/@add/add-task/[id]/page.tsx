import ManageTask from "@/components/ManageTask";
import { updateToDo } from "@/services/actions";
import getToDoList from "@/services/getToDoById";

interface Props {
  params: { id: string };
}

const ToDoDetailsPage = async ({ params }: Props) => {
  const toDo = await getToDoList(params.id);

  return <ManageTask serverAction={updateToDo} defaultValus={toDo} />;
};

export default ToDoDetailsPage;
