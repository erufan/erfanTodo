import { Button, Card } from "antd";

interface Props {
  toDotitle: string;
  isCompleted: boolean;
  userId: number;
}

const ToDoCard = ({ toDotitle, isCompleted, userId }: Props) => {
  return (
    <Card
      title={toDotitle}
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
        <b>Task:</b> {toDotitle}
      </p>
      <p>
        <b>Completed:</b> {isCompleted ? "Yes" : "No"}
      </p>
      <p>
        <b>User:</b> {userId}
      </p>
    </Card>
  );
};

export default ToDoCard;
