import useAuth from '../../(auth)/hooks/useAuth';

const isBrowser = () => typeof window !== "undefined";

export default function ProtectedRoute({router, children}) {
    const { isAuthenticated } = useAuth();

    let protectedRoutes = [
        "/questions"
    ]

    let pathIsProtected = protectedRoutes.indexOf(router.pathname) !== -1;

    if (isBrowser() && !isAuthenticated && !pathIsProtected) {
        router.push("/");
    }

    return children;
}