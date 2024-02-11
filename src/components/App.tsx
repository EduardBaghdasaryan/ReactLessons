import React, { FC } from "react";
import Stream from "./Stream";
import Record from "./Recorder";

const App: FC = () => {
  return (
    <>
      <Stream />
      <Record />
    </>
  );
};

export default App;
