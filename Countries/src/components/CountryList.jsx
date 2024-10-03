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
  
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (countries.length > 1) {
      return (
        <ul>
          {countries.map(country => <li key={country.cca3}>{country.name.common}<button onClick={()=>buttonShow(country.name.common)}>Show</button></li> )}
        </ul>
      )
    } else if (countries.length === 1) {
  
      return <CountryDetail country={countries[0]} coord={coord} />
    } else {
      return <p>No matches</p>
    }
  }

  export default CountryList;