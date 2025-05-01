import { AuthProvider } from "../../context/auth"
import AppRoutes from "../router"

export const AppWrapper = () => {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    )
}