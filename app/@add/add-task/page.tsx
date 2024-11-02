import ManageTask from "@/components/ManageTask";
import { addToDo } from "@/services/actions";

const AddTaskPage = () => {
  return <ManageTask serverAction={addToDo} />;
};

export default AddTaskPage;
