import WeatherInfo from "./WeatherInfo";
const CountryDetail = ({ country, coord }) => {

    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area} km²</p>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="100"
        />
        <WeatherInfo coord={coord} country={country}/>
      </div>
    );
  };

  export default CountryDetail;