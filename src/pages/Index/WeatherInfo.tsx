import { useState, useEffect, useCallback, useMemo } from "react";
import CommonBox from "../../components/common/commonBox";
import CommonCircularProgress from "../../components/common/commonCircularProgress";
import CommonContainer from "../../components/common/commonContainer";
import fetchWeatherInfo from "../../utils/fetchWeatherInfo";
import CommonTypoGraphy from "../../components/common/CommonTypography";
import { CityInfoComponentProps } from "./interfaces/weatherInfoInterface";

function CityInfoComponent({ city }: CityInfoComponentProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const [maxTemp, setMaxTemp] = useState<string | null>(null);
  const [minTemp, setMinTemp] = useState<string | null>(null);
  const [avgTemp, setAvgTemp] = useState<string | null>(null);

  const calculateAvgTemp = useMemo(() => {
    if (maxTemp && minTemp) {
      return ((parseFloat(maxTemp) + parseFloat(minTemp)) / 2).toFixed(1);
    }
    return null;
  }, [maxTemp,minTemp]);

  const fetchCityInfo = useCallback(async () => {
    if (!city) return;

    setLoading(true);
    const parts = city.split(",");
    const lat = parts[0];
    const lng = parts[parts.length - 1];

    try {
      const response = await fetchWeatherInfo(lat, lng);
      setError(null);
      setMinTemp(response.daily.temperature_2m_min);
      setMaxTemp(response.daily.temperature_2m_max);
    } catch (error: any) {
      // TODO: Handle specific errors based on API response and give definitive type above
      setError(error.response.data.reason);
    } finally {
      setLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city) {
      fetchCityInfo();
    }
  }, [city]);

  useEffect(() => {
    setInterval(()=> fetchCityInfo, 600000);
  }, [])

  useEffect(() => {
    setAvgTemp(calculateAvgTemp);
  }, [calculateAvgTemp]);

  if (loading) {
    return <CommonCircularProgress />;
  }

  if (error) {
    return <CommonTypoGraphy variant="body1">{error}</CommonTypoGraphy>;
  } else {
    return (
      <CommonContainer maxWidth="sm">
        <CommonBox sx={{ mt: 5 }}>
          {maxTemp && (
            <>
              <CommonTypoGraphy variant="h6">City Information</CommonTypoGraphy>
              <CommonBox>
                <CommonTypoGraphy variant="body1">
                  Max Temp: {maxTemp}
                </CommonTypoGraphy>
                <CommonTypoGraphy variant="body1">
                  Min Temp: {minTemp}
                </CommonTypoGraphy>
                <CommonTypoGraphy variant="body1">
                  Avg Temp: {avgTemp}
                </CommonTypoGraphy>
              </CommonBox>
            </>
          )}
        </CommonBox>
      </CommonContainer>
    );
  }
}

export default CityInfoComponent;
