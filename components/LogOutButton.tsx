"use client";
import { logout } from "@/serverAction/auth";
import { Button } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  isUser: boolean;
}

const LogOut_InButton = ({ isUser }: Props) => {
  const router = useRouter();
  let buttonStyle = isUser
    ? { backgroundColor: "red", borderColor: "red" }
    : { backgroundColor: "#4096FF", borderColor: "#4096FF" };

  const handleLogOut = () => {
    isUser ? logout() : null;
    router.refresh();
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
      <Button type="primary" onClick={handleLogOut} style={buttonStyle}>
        {isUser ? "Log Out" : <Link href={"/log-in"}>Log In</Link>}
      </Button>
    </div>
  );
};

export default LogOut_InButton;
