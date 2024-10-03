const CountryForm = ({ searchCountry, handleCountryChange }) => {

  const inputStyle = { 
      padding: '10px', 
      width: '300px', 
      border: '2px solid #ccc', 
      borderRadius: '8px', 
      fontSize: '16px', 
      fontFamily: 'Arial, sans-serif', 
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', 
      outline: 'none' 
    } 


    return (
      <div>
      <form>
        <input style={inputStyle} value={searchCountry} onChange={handleCountryChange} />
      </form>
      </div>
    );
  };

  export default CountryForm;