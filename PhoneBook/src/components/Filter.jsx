const Filter = ({ filterName, handleFilterPerson }) => {
    return (
      <div>
        filter shown with: <input type="text" value={filterName} onChange={handleFilterPerson} />
      </div>
    )
  }

export default Filter;