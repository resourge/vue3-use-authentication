import { usePermissionsProvider } from "../provider/AuthenticationProvider"

export const usePermissions = <U, P>() => usePermissionsProvider<U, P>()