import ManageTask from "@/components/ManageTask";
import { verifyAuth } from "@/lib/auth";
import addToDo from "@/serverAction/mutations/addToDo";
import { redirect } from "next/navigation";

const AddTaskPage = async () => {
  const { user, session } = await verifyAuth();

  if (!user || !session) {
    return redirect("/log-in");
  }

  return <ManageTask serverAction={addToDo} />;
};

export default AddTaskPage;
