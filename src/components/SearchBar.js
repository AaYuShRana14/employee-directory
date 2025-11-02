/**
 * SearchBar component for searching employees by name or department
 * @param {Function} onSearch - Callback function called when search value changes
 * @param {Function} setSearchValue - Function to update the search value state in parent component
 * @param {string} searchValue - Current value of the search input
 */
const SearchBar = ({onSearch,setSearchValue,searchValue}) => {
    /**
     * Handles search input changes
     * @param {Event} e - Input change event
     */
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);
        // Call the parent callback with the search value
        onSearch(value);
    };

    /**
     * Clears the search input
     */
    const clearSearch = () => {
        setSearchValue("");
        onSearch("");
    };

    return (
        <div className="flex-1">
            <div className="relative">
                <span className="absolute left-3 top-2.5 text-lg"> 🔍</span>
                <input type="text" value={searchValue} onChange={handleSearchChange}
                    placeholder="Search by name or department..."
                    className="w-full pl-11 pr-11 py-2.5 border border-gray-300 rounded-md text-sm"
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                />
                {searchValue && (
                    <button
                        onClick={clearSearch}
                        className="absolute right-3 top-2.5 text-lg hover:opacity-60"
                        style={{transition: 'opacity 0.2s'}}
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;