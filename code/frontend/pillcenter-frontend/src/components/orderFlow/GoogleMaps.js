import React, { useEffect } from "react";
import { useState } from "react";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { DirectionsRenderer } from "@react-google-maps/api";

export default function GoogleMaps(props) {
  const { machineChoice } = props;
  const [location, setLocation] = useState({ lat: 3, lng: 3 });
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
  }, []);

  if (!isLoaded) return <div>טוען..</div>;
  return (
    <GoogleMap
      zoom={18}
      center={location}
      mapContainerStyle={{ height: "300px", width: "300px" }}
    >
      <MarkerF
        visible={true}
        key={machineChoice.id}
        position={location}
        label="מכונת PillCenter"
        onClick={(e) => {
          console.log("YEHHA");
        }}
      />
    </GoogleMap>
  );
}
