import { ReactNode } from "react";

export type CellProps = {
  onClick: () => void;
  backgroundColor?: string;
  children: ReactNode;
};

export type Point = {
  x: number;
  y: number;
};
