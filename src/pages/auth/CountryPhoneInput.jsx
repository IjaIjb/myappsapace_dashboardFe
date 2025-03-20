import React, { useState, useEffect, useRef, useCallback } from "react";
import { UserApis } from "../../apis/userApi/userApi";

const CountryPhoneInput = ({ 
  value, 
  onChange, 
  name, 
  error, 
  disabled = false,
  className = ""
}) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [allCountriesLoaded, setAllCountriesLoaded] = useState(false);
  const dropdownRef = useRef(null);

  const fetchCountries = useCallback(async (page) => {
    setIsLoading(true);
    try {
      const response = await UserApis.getCountry(page);
      if (response?.data) {
        // Process countries to add flag image URLs
        const processedCountries = response.data.data.map(country => ({
          ...country,
          flagUrl: `https://flagcdn.com/w40/${country.iso2.toLowerCase()}.png`,
          // Alternative flag API URLs:
          // flagUrl: `https://flagsapi.com/${country.iso2}/flat/64.png`,
          // flagUrl: `https://flagcdn.com/h40/${country.iso2.toLowerCase()}.png`,
        }));

        if (page === 1) {
          setCountries(processedCountries);
          setFilteredCountries(processedCountries);
        } else {
          setCountries(prev => [...prev, ...processedCountries]);
          setFilteredCountries(prev => [...prev, ...processedCountries]);
        }
        setTotalPages(response.data.last_page);
        
        // Check if we've loaded all pages
        if (page >= response.data.last_page) {
          setAllCountriesLoaded(true);
        }
        
        // If no country is selected yet, default to a common one
        if (!selectedCountry && processedCountries.length > 0) {
          // Try to find Nigeria or United States
          const nigeria = processedCountries.find(c => c.name === "Nigeria");
          const us = processedCountries.find(c => c.name === "United States");
          setSelectedCountry(nigeria || us || processedCountries[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCountry]);

  const fetchAllCountries = useCallback(async () => {
    if (allCountriesLoaded) return; // Skip if all countries are already loaded
    
    setSearchLoading(true);
    try {
      // Load all pages one by one
      const allCountriesList = [...countries];
      for (let page = currentPage + 1; page <= totalPages; page++) {
        const response = await UserApis.getCountry(page);
        if (response?.data?.data) {
          const processedCountries = response.data.data.map(country => ({
            ...country,
            flagUrl: `https://flagcdn.com/w40/${country.iso2.toLowerCase()}.png`,
          }));
          allCountriesList.push(...processedCountries);
        }
      }
      
      setCountries(allCountriesList);
      setAllCountriesLoaded(true);
      
      // Filter with the current search term
      const filtered = allCountriesList.filter(
        (country) =>
          country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          country.phone_code.includes(searchTerm)
      );
      setFilteredCountries(filtered);
      
    } catch (error) {
      console.error("Error fetching all countries:", error);
    } finally {
      setSearchLoading(false);
    }
  }, [countries, currentPage, totalPages, allCountriesLoaded, searchTerm]);

  const handleSearch = useCallback(async (term) => {
    setSearchLoading(true);
    
    try {
      // If search term exists and we don't have all countries loaded,
      // fetch all countries first to enable full search
      if (term && !allCountriesLoaded) {
        await fetchAllCountries();
      } else {
        // Just filter the loaded countries
        const filtered = countries.filter(
          (country) =>
            country.name.toLowerCase().includes(term.toLowerCase()) ||
            country.phone_code.includes(term)
        );
        setFilteredCountries(filtered);
      }
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setSearchLoading(false);
    }
  }, [countries, allCountriesLoaded, fetchAllCountries]);

  // Fetch countries on component mount
  useEffect(() => {
    fetchCountries(1);
  }, [fetchCountries]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm) {
      // If we have all countries loaded, just filter locally
      if (allCountriesLoaded) {
        const filtered = countries.filter(
          (country) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.phone_code.includes(searchTerm)
        );
        setFilteredCountries(filtered);
      } else {
        // Otherwise, perform a search operation
        handleSearch(searchTerm);
      }
    } else {
      setFilteredCountries(countries);
    }
  }, [searchTerm, allCountriesLoaded, countries, handleSearch]);

  // Update the combined value when either country or phone number changes
  useEffect(() => {
    if (selectedCountry && phoneNumber) {
      const combinedValue = `+${selectedCountry.phone_code.replace(/\D/g, '')}${phoneNumber}`;
      // Prevent infinite loop by checking if the value actually changed
      if (value !== combinedValue) {
        onChange({ target: { name, value: combinedValue } });
      }
    }
  }, [selectedCountry, phoneNumber, onChange, name, value]);

  // Parse incoming value into country code and phone number - only run once when countries are loaded
  useEffect(() => {
    if (value && countries.length > 0 && !selectedCountry) {
      // Try to find the country code in the value
      const match = value.match(/^\+(\d+)/);
      if (match) {
        const code = match[1];
        // Find the country with this code
        const country = countries.find(c => c.phone_code.replace(/\D/g, '') === code);
        if (country) {
          setSelectedCountry(country);
          // Extract the phone number part
          const phoneNumberPart = value.substring(match[0].length);
          setPhoneNumber(phoneNumberPart);
        }
      }
    }
  }, [countries, selectedCountry, value]);

  const loadMoreCountries = useCallback(() => {
    if (currentPage < totalPages && !isLoading && !searchTerm) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchCountries(nextPage);
    }
  }, [currentPage, totalPages, isLoading, searchTerm, fetchCountries]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Only allow digits
    const digits = input.replace(/\D/g, "");
    setPhoneNumber(digits);
  };

  const handleDropdownScroll = useCallback((e) => {
    const bottom = 
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50;
    if (bottom) {
      loadMoreCountries();
    }
  }, [loadMoreCountries]);

  // Fallback to emoji flag if image fails to load
  const handleFlagError = (country) => {
    // Create a new element with the flag emoji
    const fallbackElement = document.createElement('span');
    fallbackElement.textContent = country.flag;
    fallbackElement.className = 'text-xl';
    
    // Replace the image with the emoji span
    const img = document.getElementById(`flag-img-${country.id}`);
    if (img && img.parentNode) {
      img.parentNode.replaceChild(fallbackElement, img);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex">
        {/* Country Selector Button */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          className="flex mt-1 items-center gap-1 h-[40px] px-1 border-[0.5px] rounded-l-[5px] bg-[#FBFBFF] border-[#D8D8E2]"
        >
          {selectedCountry && (
            <>
              <div className="w-6 h-4 mr-1 overflow-hidden shadow-sm">
                <img 
                  src={selectedCountry.flagUrl} 
                  alt={`Flag of ${selectedCountry.name}`}
                  className="w-full h-full object-cover"
                  onError={() => handleFlagError(selectedCountry)}
                  id={`flag-img-${selectedCountry.id}`}
                />
              </div>
              <span className="text-sm font-medium">+{selectedCountry.phone_code.replace(/\D/g, '')}</span>
            </>
          )}
          <svg 
            className="w-4 h-4 text-gray-500 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Phone Number Input */}
        <input
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          disabled={disabled}
          placeholder="Phone number"
          className={`block w-full mt-1 h-[40px] border-[0.5px] border-l-0 pl-3 rounded-r-[5px] focus:outline-none text-sm bg-[#FBFBFF] border-[#D8D8E2] ${className}`}
        />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-red-700 text-xs mt-1">{error}</p>
      )}

      {/* Country Dropdown */}
      {isDropdownOpen && (
        <div className="absolute z-10 mt-1 w-full md:w-80 bg-white border border-gray-200 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {/* Search Input */}
          <div className="p-3 border-b">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search country or code..."
                className="w-full px-3 py-1 pl-9 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              {searchLoading ? (
                <div className="absolute left-2 top-2.5 w-5 h-5">
                  <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                <svg 
                  className="w-5 h-5 text-gray-400 absolute left-2 top-2.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
          </div>

          {/* Countries List */}
          <div className="overflow-y-auto max-h-48" onScroll={handleDropdownScroll}>
            {searchLoading && searchTerm ? (
              <div className="flex items-center justify-center p-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-700"></div>
                <span className="ml-2">Searching all countries...</span>
              </div>
            ) : (
              <>
                {filteredCountries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => handleCountrySelect(country)}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="w-8 h-6 overflow-hidden shadow-sm flex-shrink-0">
                      <img 
                        src={country.flagUrl} 
                        alt={`Flag of ${country.name}`}
                        className="w-full h-full object-cover"
                        onError={() => handleFlagError(country)}
                        id={`flag-img-${country.id}`}
                      />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium truncate">{country.name}</span>
                      <span className="text-xs text-gray-500">
                        +{country.phone_code.replace(/\D/g, '')}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 flex-shrink-0">
                      +{country.phone_code.replace(/\D/g, '')}
                    </span>
                  </div>
                ))}
                {isLoading && !searchTerm && (
                  <div className="text-center py-2 text-gray-500">Loading more countries...</div>
                )}
                {filteredCountries.length === 0 && !isLoading && !searchLoading && (
                  <div className="text-center py-2 text-gray-500">No countries found</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryPhoneInput;