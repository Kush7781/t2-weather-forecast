import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div style={{ display: 'inline-flex', justifyContent: 'space-around', margin: '20px' }}>
      <TextField
        variant="outlined"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        InputProps={{
          style: {
            backgroundColor: 'white',
            marginRight: '10px'
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={city.trim() === ''} 
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
