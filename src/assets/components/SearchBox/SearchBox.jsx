export default function SearchBox({ searchTerm, onSearch }){
    return(
        <div className="input-wrapp">
            <p>Find Contact by name</p>
            <input
                type="text"
                value={searchTerm}
                onChange={onSearch}
                className='input'
            />
        </div>
    )
}