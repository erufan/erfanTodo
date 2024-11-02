import { Button, Card } from "antd";
import Link from "next/link";

interface Props {
  toDotitle: string;
  isCompleted: boolean;
  userId: number;
  toDoid: number;
}

const ToDoCard = ({ toDotitle, isCompleted, userId, toDoid }: Props) => {
  return (
    <Card
      title={toDotitle}
      extra={
        <>
          <Link href={`/add-task/${toDoid}`}>
            <Button type="primary"> Edit </Button>
          </Link>
          <Button style={{ marginLeft: 8 }}>Delete</Button>
        </>
      }
      style={{
        marginBottom: 16,
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <b>Task:</b>
      <p>{toDotitle}</p>
      <b>Completed:</b>
      <p>{isCompleted ? "Yes" : "No"}</p>
      <b>User:</b>
      <p>{userId}</p>
    </Card>
  );
};

export default ToDoCard;
