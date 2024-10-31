import ToDoCard from "@/components/ToDoCard";
import { Col, Row } from "antd";

const HomePage = () => {
  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: "20px", borderRadius: "10px", overflow: "hidden" }}
    >
      {[...Array(7)].map((_, index) => (
        <Col key={index} xs={24} sm={24} md={8} lg={8} xl={8}>
          <ToDoCard />
        </Col>
      ))}
    </Row>
  );
};

export default HomePage;
