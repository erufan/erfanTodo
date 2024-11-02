import AddToDoLink from "@/components/AddToDoLink";
import LogOutButton from "@/components/LogOutButton";
import TableToDo from "@/components/TableToDo";
import getToDoList from "@/services/getToDoList";

const HomePage = async () => {
  const toDoList = await getToDoList();

  return (
    <>
      <LogOutButton />
      <TableToDo dataSource={toDoList} />
      <AddToDoLink />
    </>
  );
};

export default HomePage;
