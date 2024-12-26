"use client";

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
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        onClick={() => navigate(item.path)}
        className={cn(navigationMenuTriggerStyle(), "cursor-pointer")}
      >
        {item.label}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default NavItem;
