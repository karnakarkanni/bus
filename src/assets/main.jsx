import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import Select from 'react-select';
import './SearchBar.css';

const fetchSuggestionsFromAPI = async (inputValue, category) => {

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockSuggestions = [
        { name: 'React.js', category: 'Frameworks' },
        { name: 'Vue.js', category: 'Frameworks' },
        { name: 'Angular', category: 'Frameworks' },
        { name: 'Node.js', category: 'Tools' },
        { name: 'JavaScript', category: 'Languages' },
        { name: 'Python', category: 'Languages' },
        { name: 'Java', category: 'Languages' },
        { name: 'Ruby', category: 'Languages' },
      ];

      const filtered = mockSuggestions.filter((suggestion) => {
        const matchesCategory =
          category === 'all' || suggestion.category.toLowerCase() === category;
        return matchesCategory && suggestion.name.toLowerCase().includes(inputValue.toLowerCase());
      });

      resolve(filtered);
    }, 1000);
  });
};

// Categories for the search filter
const categories = [
  { value: 'all', label: 'All' },
  { value: 'frameworks', label: 'Frameworks' },
  { value: 'languages', label: 'Languages' },
  { value: 'tools', label: 'Tools' },
  { value: 'articles', label: 'Articles' },
  { value: 'authors', label: 'Authors' },
  { value: 'topics', label: 'Topics' },
];

const SearchBar = () => {
  const [value, setValue] = useState('');
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({ value: 'all', label: 'All' });
  const [error, setError] = useState(null);


  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  
  const onSuggestionsFetchRequested = async ({ value }) => {
    try {
      setError(null);  // Reset error state before fetching
      const filteredSuggestions = await fetchSuggestionsFromAPI(value, selectedCategory.value);
      setSuggestionsList(filteredSuggestions);
    } catch (err) {
      setError('Error loading suggestions. Please try again later.');
    }
  };

 
  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

 
  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name} <span className="category-tag">{suggestion.category}</span>
    </div>
  );

  return (
    <div className="search-bar-container">
    
      {error && <div className="error-message">{error}</div>}

    
      <Autosuggest
        suggestions={suggestionsList}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={(suggestion) => suggestion.name}
        renderSuggestion={renderSuggestion}
        inputProps={{
          placeholder: 'Search...',
          value,
          onChange,
        }}
      />

      {/* Category Dropdown */}
      <div className="category-dropdown">
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
          placeholder="Select Category"
          styles={{
            control: (provided) => ({
              ...provided,
              borderRadius: '20px',
              borderColor: '#ccc',
              padding: '4px 8px',
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: '#4d90fe',
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '5px',
            }),
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
