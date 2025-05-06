import { AppProvider } from "@toolpad/core/AppProvider";
import {
  SignInPage,
  type AuthProvider,
  type AuthResponse,
} from "@toolpad/core/SignInPage";

const providers = [
  { id: "google", name: "Google" },
  { id: "credentials", name: "Email and Password" },
];

const signIn: (provider: AuthProvider) => void | Promise<AuthResponse> = async (
  provider
) => {
  const promise = new Promise<AuthResponse>((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve({ error: "This is a mock error message." });
    }, 500);
  });
  return promise;
};

export default function SignIn() {
  return (
    // preview-start
    <AppProvider>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ form: { noValidate: true } }}
        sx={{
          "& form > .MuiStack-root": {
            marginTop: "2vw",
            rowGap: "0.5vw",
          },
        }}
      />
    </AppProvider>
    // preview-end
  );
}
