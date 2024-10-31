import ToDoCard from "@/components/ToDoCard";
import ToDo from "@/interface/ToDo";
import getToDoList from "@/services/getToDoList";
import { Col, Row } from "antd";

const HomePage = async () => {
  const toDoList = await getToDoList();

  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: "20px", borderRadius: "10px", overflow: "hidden" }}
    >
      {toDoList.map((toDo: ToDo) => (
        <Col key={toDo.id} xs={24} sm={24} md={8} lg={8} xl={8}>
          <ToDoCard
            toDotitle={toDo.todo}
            isCompleted={toDo.completed}
            userId={toDo.userId}
          />
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
