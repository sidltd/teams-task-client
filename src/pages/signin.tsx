import SignInForm from "../forms/signin/SignInForm";
import { useAuth } from "../providers/AuthContext";

const SignIn = () => {
    const {login} = useAuth();

    return <SignInForm onSubmit={login} />
}

export default SignIn;
