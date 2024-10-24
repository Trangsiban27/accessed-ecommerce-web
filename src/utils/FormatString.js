export default function capitalizeFirstLetter(str) {
  if (!str) return str; // Return the original string if it's empty or undefined
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
