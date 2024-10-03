import CountryDetail from './CountryDetails';
const CountryList = ({ countries, buttonShow}) => {
    const restoInfo = (countries) => {
      let coord= {}
      countries.forEach(country=>{
       coord ={
          latitud: country.latlng[0],
          longitud: country.latlng[1]
       }
      })
      return coord
    }
    const coord = restoInfo(countries)
    let countryListStyle = {
      border: '1px solid black',
      borderRadius: '10px',
      padding: '20px',
      backgroundColor: '#bcbcbca1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginTop: '20px',
      width: '700px',
      textAlign: 'left'
    }
    if (countries.length > 10) {
      countryListStyle={
        ...countryListStyle,
        backgroundColor: 'white',
      }
      return (
 
      <div style={countryListStyle}>
        <p>Too many matches, specify another filter</p>
      </div>
      );
    } else if (countries.length > 1) {
      return (
      <div style={countryListStyle}>
        <ul>
        {countries.map(country => (
          <li key={country.cca3}>
          {country.name.common}
          <button onClick={() => buttonShow(country.name.common)}>Show</button>
          </li>
        ))}
        </ul>
      </div>
      );
    } else if (countries.length === 1) {
      return (
      <div style={countryListStyle}>
        <CountryDetail country={countries[0]} coord={coord} />
      </div>
      );
    } else {
      return (
      <div style={countryListStyle}>
        <p>No matches</p>
      </div>
      );
    }
  }

  export default CountryList;