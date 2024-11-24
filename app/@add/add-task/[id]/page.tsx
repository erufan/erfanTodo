import ManageTask from "@/components/ManageTask";
import updateToDo from "@/serverAction/mutations/updateToDo";
import getToDo from "@/services/getToDoById";

interface Props {
  params: { id: string };
}

const ToDoDetailsPage = async ({ params }: Props) => {
  const toDo = await getToDo(params.id);

  return <ManageTask serverAction={updateToDo} defaultValus={toDo} />;
};

export default ToDoDetailsPage;
