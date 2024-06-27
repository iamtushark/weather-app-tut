import PlaceSelector from "./PlaceSelector";
import { useState, useCallback } from "react";
import CityInfoComponent from "./WeatherInfo";

export default function Index() {
  let defaultCity = localStorage.getItem("city");
  if (defaultCity === null) {
    defaultCity = "";
  }

  const [city, setCity] = useState(defaultCity);
  const renderCityInfoComponent = useCallback(() => {
    return <CityInfoComponent city={city} />;
  }, [city]);

  return (
    <>
      <PlaceSelector city={city} setCity={setCity} />
      {renderCityInfoComponent()}
    </>
  );
}
