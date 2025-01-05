import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const AuthCard = ({ children, title, description }: Props) => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="space-y-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default AuthCard;
