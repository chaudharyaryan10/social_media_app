import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Copyright = () => {
  return (
    <Typography variant="subtitle1" color="text.secondary">
      Copyright © Aryan Chaudhary 2025{" "}
      <Link to="/" color="inherit">
      Sociafy
      </Link>
    </Typography>
  );
};

export default Copyright;
