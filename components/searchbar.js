function Searchbar() {

  const searchTournaments = event => {
    event.preventDefault() // don't redirect the page
    // where we'll add our form logic
  }

  return(
    <form onSubmit={searchTournaments}>
      <label htmlFor="location">Location</label>
      <input id="location" type="text" />
      <button type="submit">Submit!</button>
    </form>
  )
}

export default Searchbar;