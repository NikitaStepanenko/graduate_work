import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
import { CITIES_WITH_COORDINATES_LIST } from "../../constants";
import { StyledTextField } from "../../pages/Auth/styles";

const CitySearch = ({ setCityCoords, cityCoords }) => {
  return (
    <Autocomplete
      options={CITIES_WITH_COORDINATES_LIST}
      getOptionLabel={(option) => option.name}
      id="controlled-demo"
      value={cityCoords}
      disableClearable
      onChange={(event, newValue) => {
        setCityCoords(newValue);
      }}
      renderInput={(params) => (
        <StyledTextField {...params} label="Ваш город" variant="standard" />
      )}
    />
  );
};

export default CitySearch;
