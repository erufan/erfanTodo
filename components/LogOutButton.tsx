"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { logOut } from "@/services/actions";

const LogOutButton = () => {
  const router = useRouter();

  const handleLogOut = () => {
    logOut();
    router.push("/log-in");
  };

  return (
    <div
      style={{
        margin: "15px 0",
        borderColor: "red",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        type="primary"
        onClick={handleLogOut}
        style={{ backgroundColor: "red", borderColor: "red" }}
      >
        Log Out
      </Button>
    </div>
  );
};

export default LogOutButton;
