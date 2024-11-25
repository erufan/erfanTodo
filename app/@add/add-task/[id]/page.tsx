import ManageTask from "@/components/ManageTask";
import { verifyAuth } from "@/lib/auth";
import updateToDo from "@/serverAction/mutations/updateToDo";
import getToDoById from "@/services/getToDoById";
import { redirect } from "next/navigation";

interface Props {
  params: { id: string };
}

const ToDoDetailsPage = async ({ params }: Props) => {
  const { user, session } = await verifyAuth();
  if (!user || !session) {
    return redirect("/log-in");
  }

  const toDo = await getToDoById(params.id);

  return <ManageTask serverAction={updateToDo} defaultValus={toDo} />;
};

export default ToDoDetailsPage;
