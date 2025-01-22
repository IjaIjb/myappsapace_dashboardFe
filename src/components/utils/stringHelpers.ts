export function capitalizeFirstLetter(string: string) {
    if (string !== undefined) {
      if (string.length > 0) {
        const words = string.split("-");
  
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
        }
  
        return words.join(" ");
      }
    }
    return "";
  }
  

  