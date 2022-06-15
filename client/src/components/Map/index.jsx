import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";

const CustomMap = ({
  cityCoords,
  newPointAddress,
  setNewPointAddress,
  newPoint,
  setNewPoint,
  points,
  userPoint,
}) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [selectedPointAddress, setSelectedPointAddress] = useState(null);

  const [ymaps, setYmaps] = useState(null);

  const clickOnMap = async (e) => {
    const coords = e.get("coords");
    const response = await ymaps.geocode(coords);
    let nearest = response.geoObjects.get(0);
    let name = nearest.properties.get("name");
    setNewPointAddress(name);
    setNewPoint(coords);
  };

  return (
    <YMaps
      enterprise
      query={{
        apikey: process.env.REACT_APP_YANDEX_MAPS_API_KEY,
      }}
    >
      <Map
        state={{ center: cityCoords?.coords, zoom: 15 }}
        width={"100%"}
        modules={["geoQuery", "geocode"]}
        height={"60vh"}
        onClick={clickOnMap}
        onLoad={(ymapsInstance) => {
          setYmaps(ymapsInstance);
        }}
        options={{ searchControlProvider: "yandex#search" }}
      >
        <Clusterer
          options={{
            preset: "islands#invertedVioletClusterIcons",
            groupByCoordinates: false,
          }}
        >
          {newPoint && (
            <Placemark
              geometry={newPoint}
              options={{
                preset: "islands#dotIcon",
                iconColor: "green",
              }}
              properties={{
                balloonContent: `${newPointAddress}`,
              }}
              modules={["geoObject.addon.balloon"]}
            />
          )}
          {points.map((point, index) => {
            return (
              <Placemark
                key={index}
                geometry={JSON.parse(point.coords)}
                onClick={() => setSelectedPoint(point)}
                options={
                  userPoint?.id === point.id && {
                    preset: "islands#dotIcon",
                    iconColor: "red",
                  }
                }
                properties={{
                  balloonContent: `${point.address}<br/>${
                    point?.users?.length
                  } ${
                    [2, 3, 4].includes(point?.users?.length)
                      ? "человека"
                      : "человек"
                  }`,
                }}
              />
            );
          })}
        </Clusterer>
      </Map>
    </YMaps>
  );
};

export default CustomMap;
