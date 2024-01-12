function truncateString(inputString, charCount) {
  // Check if the inputString is longer than the specified charCount
  if (inputString.length > charCount) {
    // Truncate the string and append "..."
    return inputString.substring(0, charCount - 3) + ' ...';
  } else {
    // If the string is already shorter than the specified charCount, return the original string
    return inputString;
  }
}

export default truncateString;
