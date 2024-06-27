import React, { useState } from "react";
import CommonTypography from "../../components/common/CommonTypography";
import CommonDropdown from "../../components/common/CommonDropDownField";
import CommonContainer from "../../components/common/commonContainer";
import CommonButton from "../../components/common/CommonButtonFIeld";
import CommonBox from "../../components/common/commonBox";
import citiesData from "../../assets/data/cities.json";
import { getCityDropdownOptions } from "../../utils/cities";
import { useMemo } from "react";
import placeSelectorProps from "./interfaces/placeSelectorProps";

export default function PlaceSelector({ city, setCity }: placeSelectorProps) {
  const dropdownOptions = useMemo(
    () => getCityDropdownOptions(citiesData),
    [citiesData],
  );

  const [selectedCity, setSelectedCity] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedCity = event.target.value as string;
    setSelectedCity(selectedCity);
  };

  const handleSubmit = () => {
    setCity(selectedCity);
    localStorage.setItem("city", selectedCity);
  };

  return (
    <CommonContainer maxWidth="sm">
      <CommonBox sx={{ mt: 5 }}>
        <CommonTypography variant="h6">Select Place</CommonTypography>
        <CommonDropdown
          label="Place"
          value={selectedCity}
          options={dropdownOptions}
          onChange={handleChange}
        />
        <CommonButton onClick={handleSubmit}>Select</CommonButton>
      </CommonBox>
    </CommonContainer>
  );
}
