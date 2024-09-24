import React, { ReactNode,PropsWithChildren } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export const ConstantsContext = React.createContext<{
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}>({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
});