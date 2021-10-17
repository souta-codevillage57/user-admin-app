import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagement";

export const homeRoutes = [
    {
        path: "/",
        exact: true,
        children: <Home />
    },
    {
        path: "/setting",
        exact: false,
        children: <Setting />
    },
    {
        path: "/usermanagement",
        exact: false,
        children: <UserManagement />
    }
]