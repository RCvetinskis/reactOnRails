import { LogOut } from "lucide-react";
import { IUser } from "../../../types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { signOut } from "../../../services/user-service";
import { useNavigate } from "react-router-dom";

type Props = {
  user: IUser;
};

const UserMenu = ({ user }: Props) => {
  const navigate = useNavigate();
  const handleSigntOut = async () => {
    await signOut();
    navigate(0);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar className="w-8 h-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSigntOut}
          className="flex justify-between items-center"
        >
          <span>Sign out</span>
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
