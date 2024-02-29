import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/index";
import { useNavigate } from "react-router-dom";

import { RootState } from "../store/index";
import { ROUTES } from "../constants/index";
import {
  isAuthSelector,
  userIdSelector,
} from "../store/signin/signin-selector";
import { signInThunk } from "../store/signin/signin-thunks";
import { User } from "../types";

const useSignIn = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const isAuth = useSelector((state: RootState) => isAuthSelector(state));
  const userId = useSelector((state: RootState) => userIdSelector(state));

  const signInUser = async (userData: User) => {
    try {
      const user: User = await dispatch(
        signInThunk({ data: userData })
      ).unwrap();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return {
    isAuth,
    userId,
    signInUser,
  };
};

export default useSignIn;
