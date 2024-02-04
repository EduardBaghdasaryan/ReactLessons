import { CellProps } from "../interfaces/index";
import React from "react";
import "../styles/cell.styles.css";

const Cell = ({ children, onClick, backgroundColor }: CellProps) => {
  return (
    <div
      onClick={onClick}
      className="cell"
      style={{
        backgroundColor,
      }}
    >
      {!!children && children}
    </div>
  );
};

export default Cell;
