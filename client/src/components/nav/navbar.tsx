import useRoutes from "../../hooks/use-routes";
import Loading from "../loading";
import { NavigationMenu, NavigationMenuList } from "../ui/navigation-menu";
import NavItem from "./nav-item";

const NavBar = () => {
  const { routes, loading } = useRoutes();
  const mainRoutes = routes.filter((route) => route.path !== null);
  const userRoutes = routes.filter((route) => route.path === null);

  return (
    <div className="fixed top-0 !w-full h-14 p-2 shadow shadow-black/90 rounded bg-secondary flex items-center justify-between">
      {loading ? (
        <Loading className="h-8 w-8 " />
      ) : (
        <>
          <NavigationMenu>
            <NavigationMenuList>
              {mainRoutes.map((route) => (
                <NavItem key={route.label} item={route} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <NavigationMenu>
            <NavigationMenuList>
              {userRoutes.map((route) => (
                <NavItem key={route.label} item={route} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </>
      )}
    </div>
  );
};

export default NavBar;
