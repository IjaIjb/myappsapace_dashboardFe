// src/utils/currencyUtils.ts

/**
 * Format a number as currency based on the selected currency code
 * @param amount The amount to format
 * @param currencyCode The currency code (e.g., "USD", "NGN", "EUR")
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number, currencyCode: string = 'NGN'): string => {
    // Define currency symbols and formatting options for common currencies
    const currencyMap: Record<string, { symbol: string, position: 'before' | 'after', decimalPlaces: number }> = {
      USD: { symbol: '$', position: 'before', decimalPlaces: 2 },
      EUR: { symbol: '€', position: 'before', decimalPlaces: 2 },
      GBP: { symbol: '£', position: 'before', decimalPlaces: 2 },
      NGN: { symbol: '₦', position: 'before', decimalPlaces: 2 },
      // Add more currencies as needed
    };
  
    // Get currency config or use default (NGN)
    const config = currencyMap[currencyCode] || currencyMap.NGN;
    
    // Format the number with the appropriate decimal places
    const formattedNumber = amount.toFixed(config.decimalPlaces);
    
    // Add commas for thousand separators
    const parts = formattedNumber.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const numberWithCommas = parts.join('.');
    
    // Position the symbol correctly
    if (config.position === 'before') {
      return `${config.symbol}${numberWithCommas}`;
    } else {
      return `${numberWithCommas}${config.symbol}`;
    }
  };
  
  /**
   * Get the currency symbol for a given currency code
   * @param currencyCode The currency code (e.g., "USD", "NGN")
   * @returns The currency symbol
   */
  export const getCurrencySymbol = (currencyCode: string = 'NGN'): string => {
    const symbols: Record<string, string> = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      NGN: '₦',
      // Add more currencies as needed
    };
    
    return symbols[currencyCode] || symbols.NGN;
  };