import AuthForm from "@/components/AuthForm";
import { notFound } from "next/navigation";

interface Props {
  params: { authentication: "log-in" | "sign-up" };
}

const authenticationPage = ({ params }: Props) => {
  if (params.authentication !== "log-in" && params.authentication !== "sign-up")
    return notFound();

  return <AuthForm param={params.authentication} />;
};

export default authenticationPage;
