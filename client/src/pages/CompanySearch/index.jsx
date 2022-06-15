import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import Header from "../../components/Header";

import { StyledPageContainer } from "../../styles";
import CartCard from "../../components/CartCard";
import Map from "../../components/Map";
import CitySearch from "../../components/CitySearch";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPoints,
  getUserPoint,
  acceptNewMeeting,
  declineNewMeeting,
  removeUserPoint,
} from "../../redux/reducers/PointSlice";
import { StyledPaper } from "./styles";
import PointCreationForm from "./../../components/PointCreationForm/index";
import { acceptMeeting, createPoint, declineMeeting } from "../../api/pointApi";
import PointCard from "../../components/PointsCard";

const CompanySearch = () => {
  const dispatch = useDispatch();
  const points = useSelector((store) => store.points.points);
  const userPoint = useSelector((store) => store.points.userPoint);
  const loading = useSelector((store) => store.points.loading);

  const [pointCreation, setPointCreation] = useState(false);

  const [newPoint, setNewPoint] = useState(null);
  const [newPointAddress, setNewPointAddress] = useState(null);
  const [date, setDate] = useState(new Date());

  const [cityCoords, setCityCoords] = useState({
    coords: [47.23917, 38.88333],
    name: "Таганрог",
  });

  useEffect(() => {
    dispatch(getAllPoints(cityCoords.name));
    dispatch(getUserPoint());
  }, [cityCoords]);

  const addPoint = async () => {
    try {
      const userPoint = await createPoint(
        newPointAddress,
        `[${newPoint[0]}, ${newPoint[1]}]`,
        date,
        cityCoords.name
      );
      dispatch(getAllPoints(cityCoords.name));
      dispatch(getUserPoint());
      setNewPoint(null);
      setNewPointAddress(null);
      setPointCreation(false);
    } catch (err) {}
  };

  const decline = async (point) => {
    try {
      const promise = new Promise((resolve, reg) => {
        try {
          resolve(dispatch(declineNewMeeting(point.id)));
          console.log(reg);
        } catch (err) {}
      });
      await promise;
      dispatch(getAllPoints(cityCoords.name));
      dispatch(removeUserPoint());
    } catch (err) {}
  };

  const accept = async (point) => {
    try {
      const promise = new Promise((resolve, reg) => {
        try {
          resolve(dispatch(acceptNewMeeting(point.id)));
        } catch (err) {
          console.log(reg);
        }
      });
      await promise;
      dispatch(getAllPoints(cityCoords.name));
      dispatch(getUserPoint());
    } catch (err) {}
  };

  return (
    <>
      <Header />
      <StyledPageContainer sx={{ marginY: "30px" }}>
        {!loading ? (
          <Grid container columnSpacing={4}>
            <Grid item xs={8}>
              <Map
                points={points}
                cityCoords={cityCoords}
                newPointAddress={newPointAddress}
                setNewPointAddress={setNewPointAddress}
                newPoint={newPoint}
                setNewPoint={setNewPoint}
                userPoint={userPoint}
              />
            </Grid>
            <Grid item xs={4}>
              <StyledPaper>
                <Box>
                  <CitySearch
                    setCityCoords={setCityCoords}
                    cityCoords={cityCoords}
                  />
                  {pointCreation ? (
                    <PointCreationForm
                      date={date}
                      setDate={setDate}
                      newPoint={newPoint}
                      newPointAddress={newPointAddress}
                    />
                  ) : (
                    points.map((point) => (
                      <PointCard
                        accept={accept}
                        decline={decline}
                        point={point}
                        userPoint={userPoint}
                      />
                    ))
                  )}
                </Box>
                {userPoint ? (
                  <PointCard
                    accept={accept}
                    decline={decline}
                    point={userPoint}
                    userPoint={userPoint}
                  />
                ) : !pointCreation ? (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => setPointCreation(true)}
                  >
                    Создать метку
                  </Button>
                ) : (
                  <Grid container columnSpacing={2}>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => setPointCreation(false)}
                      >
                        Отмена
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => addPoint()}
                      >
                        Создать метку
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </StyledPaper>
            </Grid>
          </Grid>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress disableShrink={true} />
          </Box>
        )}
      </StyledPageContainer>
    </>
  );
};

export default CompanySearch;
