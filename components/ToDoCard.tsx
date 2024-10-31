import { Button, Card } from "antd";

const ToDoCard = () => {
  return (
    <Card
      title="To-Do"
      extra={
        <>
          <Button type="primary"> Edit </Button>
          <Button style={{ marginLeft: 8 }}>Delete</Button>
        </>
      }
      style={{
        marginBottom: 16,
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <p>
        <b>Task:</b> {"todo.text"}
      </p>
      <p>
        <b>Completed:</b> {true ? "Yes" : "No"}
      </p>
      <p>
        <b>User:</b> {"erfan"}
      </p>
    </Card>
  );
};

export default ToDoCard;
