import { Affix, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const AddToDoLink = () => {
  return (
    <Link
      href={"/add-task"}
      style={{ zIndex: 1, position: "fixed", display: "inline" }}
      scroll={false}
    >
      <Affix offsetBottom={20}>
        <Button
          style={{
            fontSize: 24,
          }}
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
        ></Button>
      </Affix>
    </Link>
  );
};

export default AddToDoLink;
