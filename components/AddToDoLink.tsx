import { Affix, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Link from "next/link";

const AddToDoLink = () => {
  return (
    <Link href={"/add-task"}>
      <Affix offsetBottom={20}>
        <Button
          style={{
            width: 60,
            height: 60,
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
