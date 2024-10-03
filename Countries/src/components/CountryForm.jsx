const CountryForm = ({ searchCountry, handleCountryChange }) => {
    return (
      <form>
        <input value={searchCountry} onChange={handleCountryChange} />
      </form>
    );
  };

  export default CountryForm;