import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { isLoadingSelector } from "../store/signin/signin-selector";
import { User } from "../types/user.types";
import { userDataSelector } from "../store/user/user-selector";
import { updateProfileThunk } from "../store/user/user-thunks";

export const useUserProfile = () => {
  const dispatch: AppDispatch = useDispatch();
  const userProfile = useSelector(userDataSelector);
  const isLoading = useSelector(isLoadingSelector);

  const [user, setUser] = useState<User>(userProfile!);

  useEffect(() => {
    setUser(userProfile!);
  }, [userProfile]);

  const updateUserProfile = (updatedUser: User) => {
    dispatch(updateProfileThunk(updatedUser));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserProfile(user);
  };

  return { user, setUser, isLoading, handleChange, handleSubmit };
};
