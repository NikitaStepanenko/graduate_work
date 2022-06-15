import { Grid, Paper } from "@mui/material";
import React from "react";
import { PET_LIST } from "../../constants";
import PetTypeCard from "./PetTypeCard";

const PetTypeGrid = () => {
  return (
    <Grid container spacing={5} sx={{ marginTop: "6px" }}>
      {PET_LIST.map((pet) => (
        <PetTypeCard
          pet={pet}
          size={pet.value === "cats" || pet.value === "dogs" ? 6 : 3}
        />
      ))}
    </Grid>
  );
};

export default PetTypeGrid;
