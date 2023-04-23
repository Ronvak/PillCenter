import React, { useEffect } from "react";
import { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";
import Paper from "@mui/material/Paper";

export default function GoogleMaps(props) {
  const { machineChoice, handleDistance } = props;
  const [location, setLocation] = useState({ lat: 3, lng: 3 });
  const [currLocation, setCurrLocation] = useState({ lat: 3, lng: 3 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCyF66ttzw2cSYnzbKY5Wyeuuiqdsl4oZ8",
  });

  useEffect(() => {
    Geocode.setApiKey("AIzaSyCyF66ttzw2cSYnzbKY5Wyeuuiqdsl4oZ8");
    Geocode.setLanguage("he");
    Geocode.setRegion("il");
    Geocode.fromAddress(
      `${machineChoice?.address} , ${machineChoice?.city}`
    ).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;

        setLocation({ lat: lat, lng: lng });
      },
      (error) => {
        console.error(error);
      }
    );

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrLocation(pos);
        },
        () => {
          console.log("err");
        }
      );
    }
  }, []);

  useEffect(() => {
    function getDistance() {
      const google = window.google;
      var service = new google.maps.DistanceMatrixService();
      origin = new google.maps.LatLng(currLocation.lat, currLocation.lng);
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [location],
          travelMode: "DRIVING",
        },
        (response, status) => {
          handleDistance(response.rows[0]?.elements[0]?.distance?.text);
          console.log(response);
        }
      );
    }
    if (currLocation.lat !== 3 && location.lat !== 3) getDistance();
  }, [currLocation, location]);
  if (!isLoaded) return <div>טוען..</div>;
  return (
    <Paper elevation={12} sx={{ borderRadius: "18px" }}>
      <GoogleMap
        zoom={18}
        center={location}
        mapContainerStyle={{
          height: "300px",
          width: "300px",
          border: "solid",
          borderRadius: "18px",
          borderColor: "#C0C0C0",
        }}
      >
        <MarkerF
          visible={true}
          key={machineChoice.id}
          position={location}
          label="מכונת PillCenter"
        />
      </GoogleMap>
    </Paper>
  );
}
