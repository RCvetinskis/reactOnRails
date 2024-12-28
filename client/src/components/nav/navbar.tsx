import { routes } from "../../constants";
import SearchInput from "../search/search-input";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import NavItem from "./nav-item";

const NavBar = () => {
  return (
    <div className="fixed top-0 !w-full h-14  p-2 shadow shadow-black/90 rounded bg-secondary flex items-center gap-3 ">
      <NavigationMenu>
        <NavigationMenuList>
          {routes.map((route) => (
            <NavItem key={route.label} item={route} />
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <SearchInput />
    </div>
  );
};

export default NavBar;
