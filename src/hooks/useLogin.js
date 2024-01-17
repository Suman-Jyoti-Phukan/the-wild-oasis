import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

import { login as loginApi } from "../services/apiAuth";

export default function useLogin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ password, email }) => loginApi({ password, email }),

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", {
        replace: true,
      });
    },

    onError: (err) => {
      console.log(err.message);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}
