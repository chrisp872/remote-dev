export default function SearchForm({searchtext, setSearchText}) {

  return (
    <form onSubmit={e => {
      e.preventDefault();
      
    }}
     action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchtext}
        onChange={e => {setSearchText(e.target.value)}}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
