import { City } from "../interfaces/cityJsonInterface";

type DropdownOption = {
  value: string;
  label: string;
};

export const getCityDropdownOptions = (cities: City[]): DropdownOption[] => {
  const options: DropdownOption[] = [];

  cities.forEach((city_object) => {
    const { city, lat, lng } = city_object;
    options.push({ value: `${lat},${lng}`, label: city });
  });

  return options;
};
