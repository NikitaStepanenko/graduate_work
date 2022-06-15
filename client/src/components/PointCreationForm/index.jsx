import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";
import { StyledTextField } from "../../pages/Auth/styles";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const PointCreationForm = ({ newPointAddress, date, setDate }) => {
  return (
    <>
      <StyledTextField
        fullWidth
        label="Адрес"
        variant="standard"
        disabled
        helperText="Отметьте точку на карте"
        name="name"
        value={newPointAddress || ""}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => (
            <StyledTextField fullWidth variant="standard" disabled {...props} />
          )}
          label="Время"
          ampmInClock={false}
          ampm={false}
          minDateTime={new Date()}
          inputFormat="dd.MM.yyyy HH:mm"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
        />
      </LocalizationProvider>
    </>
  );
};

export default PointCreationForm;
