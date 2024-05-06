import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

export const TeamSection = ({ name, regno, image }) => {
  return (
    <Grid2
      item
      xs={12}
      sm={12}
      lg={4}
      justifyContent="center"
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Avatar src={image} />
      <Typography>{name}</Typography>
      <Typography>{regno}</Typography>
    </Grid2>
  );
};
