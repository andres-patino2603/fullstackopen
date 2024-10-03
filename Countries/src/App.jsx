import { useState, useEffect } from "react";
import axios from "axios";
import CountryForm from "./components/CountryForm";
import CountryList from "./components/CountryList";

function App() {
  const [searchCountry, setsearchCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const handleCountryChange = (e) => {
    setsearchCountry(e.target.value);
  };
  const formStyle = { 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'flex-start', 
    alignItems: 'upper', 
    height: '100vh',
    width: 'auto',
    border: '1px solid black',
    borderRadius: '10px',
    padding: '20px',
  }
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      }).catch(error => {
        console.log("Error", error)
      });
  }, []);
  
  const showCountrys = searchCountry === ""
      ? countries
      : countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(searchCountry.toLowerCase())
        );
        const buttonShow = (countryName) => {
          return setsearchCountry(countryName)
        }

  return (
    <>
    <div style={formStyle}>
      <CountryForm
        searchCountry={searchCountry}
        handleCountryChange={handleCountryChange}
      />
      <CountryList countries={showCountrys} buttonShow={buttonShow}/>
      </div> 
    </>
  );
}

export default App;
