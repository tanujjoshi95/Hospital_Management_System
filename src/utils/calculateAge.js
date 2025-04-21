/**
 * Converts a date of birth (DOB) to age in years.
 * @param {string} dob - Date of birth in ISO format (e.g., "1985-06-15")
 * @returns {number | null} - Age in years, or null if DOB is invalid
 */
export function calculateAge(dob) {
  try {
    const birthDate = new Date(dob);

    // Check if the date is valid
    if (isNaN(birthDate.getTime())) {
      return null;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    // Adjust age if birthday hasn't occurred this year
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age >= 0 ? age : null; // Return null for future dates
  } catch (error) {
    return null; // Return null for any parsing errors
  }
}
