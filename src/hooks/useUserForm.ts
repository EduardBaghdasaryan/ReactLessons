import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { signUpThunk } from "../store/signin/signin-thunks";
import { isLoadingSelector } from "../store/signin/signin-selector";
import { useSelector } from "react-redux";
import { User } from "../types/user.types";
import { updateProfileThunk } from "../store/user/user-thunks";
import { userDataSelector } from "../store/user/user-selector";

export const useUserForm = () => {
  const userData = useSelector(userDataSelector);
  const [user, setUser] = useState<User>(
    userData || {
      id: "",
      firstName: "",
      lastName: "",
      imageUrl: "",
      email: "",
      password: "",
      phone: "",
    }
  );
  const dispatch: AppDispatch = useDispatch();
  const isLoading = useSelector(isLoadingSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (user.id) {
      dispatch(updateProfileThunk(user));
    } else {
      dispatch(signUpThunk(user));
    }
  };

  return { user, isLoading, handleChange, handleSubmit };
};
