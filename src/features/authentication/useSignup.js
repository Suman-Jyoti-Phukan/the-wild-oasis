import { useMutation } from "@tanstack/react-query";

import { signup as signUpApi } from "../../services/apiAuth";

import { toast } from "react-hot-toast";

export function useSignup() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: signUpApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created! Please verify the new account"
      );
    },
  });

  return { signUp, isLoading };
}
