export default function formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
  
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
  
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
  
      return date.toLocaleDateString("en-GB", options);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  }
  