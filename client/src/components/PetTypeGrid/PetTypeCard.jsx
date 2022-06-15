import { Grid, Paper } from "@mui/material";
import React from "react";
import { Image, StyledPaper } from "./styles.js";

const PetTypeCard = ({ pet, size }) => {
  return (
    <Grid item xs={size}>
      <StyledPaper sx={{ bgcolor: "secondary.card" }} item elevation={2}>
        <Image src={`/images/types/${pet.value}.png`} />
      </StyledPaper>
    </Grid>
  );
};

export default PetTypeCard;
