import { usePermissionsProvider } from "../provider/AuthenticationProvider"

export const usePermissions = <U, P>() => {
    return usePermissionsProvider<U, P>()
}