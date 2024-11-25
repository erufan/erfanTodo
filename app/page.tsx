import LogOut_InButton from "@/components/LogOutButton";
import AddToDoLink from "@/components/AddToDoLink";
import TableToDo from "@/components/TableToDo";
import getToDoList from "@/services/getToDoList";
import HomePageProp from "@/interface/HomePageProp";
import { verifyAuth } from "@/lib/auth";

export default async function HomePage({ searchParams }: HomePageProp) {
  const { user } = await verifyAuth();

  const INITIAL_PAGE = "1";
  const INITIAL_PAGE_SIZE = "10";
  const currentPage = parseInt(searchParams.page || INITIAL_PAGE);
  const pageSize = parseInt(searchParams.pageSize || INITIAL_PAGE_SIZE);
  const skip = (currentPage - 1) * pageSize;
  const data = await getToDoList(skip, pageSize);

  return (
    <>
      <LogOut_InButton isUser={Boolean(user)} />
      <TableToDo
        dataSource={data.todos}
        total={data.total}
        currentPage={currentPage}
        pageSize={pageSize}
        isUser={Boolean(user)}
      />
      <AddToDoLink />
    </>
  );
}
