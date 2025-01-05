import { useNavigate } from "react-router";
import { IRoute } from "../../types";
import {
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";
import { cn } from "../../lib/utils";

type Props = {
  item: IRoute;
};

const NavItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    if (item.path) {
      navigate(item.path);
    }
  };
  return (
    <NavigationMenuItem>
      {item.path && !item.Component ? (
        <NavigationMenuLink
          onClick={handleNavigation}
          className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
        >
          {item.label}
        </NavigationMenuLink>
      ) : (
        <NavigationMenuLink>{item.Component}</NavigationMenuLink>
      )}
    </NavigationMenuItem>
  );
};

export default NavItem;
