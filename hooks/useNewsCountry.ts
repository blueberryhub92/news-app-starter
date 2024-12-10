import CountryList from "../constants/CountryList";
import { useCallback, useState } from "react";



export const useNewsCountries = () => {
    const [newsCountries, setNewsCountries] = useState(CountryList);

    const toggleNewsCountry = useCallback((id: number) => {
        setNewsCountries((prevNewsCountries) => {
            return prevNewsCountries.map((item, index) => {
                return index === id
                    ? { ...item, selected: !item.selected }
                    : item;
            });
        });
    }, []);

    return {
        newsCountries,
        toggleNewsCountry
    }
}
