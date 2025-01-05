import { cn } from "../../../lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";

type Props = {
  className?: string;
};
const UserAvatar = ({ className }: Props) => {
  return (
    <Avatar className={cn(className)}>
      <AvatarImage src="https://github.com/shadcn.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
