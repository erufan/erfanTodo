import ManageTask from "@/components/ManageTask";
import addToDo from "@/serverAction/mutations/addToDo";

const AddTaskPage = () => {
  return <ManageTask serverAction={addToDo} />;
};

export default AddTaskPage;
