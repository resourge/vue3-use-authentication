import { useAuthenticationProvider } from "../provider/AuthenticationProvider"

export default function useAuthentication<U,P>() {
    return useAuthenticationProvider<U,P>()
}