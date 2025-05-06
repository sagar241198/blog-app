import { AuthProvider } from "../../context/auth"
import { ProgressProvider } from "../../context/progress"
import AppRoutes from "../router"

export const AppWrapper = () => {
    return (
        <AuthProvider>
            <ProgressProvider>
                <AppRoutes />
            </ProgressProvider>
        </AuthProvider>
    )
}