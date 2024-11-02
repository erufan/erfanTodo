import AddToDo from "@/components/AddToDo";
import { addToDo } from "@/services/actions";

const AddTaskPage = () => {
  return <AddToDo serverAction={addToDo} />;
};

export default AddTaskPage;
