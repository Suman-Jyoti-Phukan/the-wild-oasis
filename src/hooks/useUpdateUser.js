import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";

import { updateCurrentUser } from "../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account Successfully");

      queryClient.setQueriesData(["user"], user);
    },
    onError: (error) => toast.error(error.message),
  });

  return { isUpdating, updateUser };
}
