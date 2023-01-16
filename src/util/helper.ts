/**
 * Function that checks if the input object is empty
 *
 * @param {Record<string, unknown>} obj - The input object to check
 * @returns {boolean} - A boolean value indicating if the object is empty or not
 */
export default function isEmpty(obj: Record<string, unknown>): boolean {
  // Get the keys of the object and check if the length of the keys is 0
  return Object.keys(obj).length === 0;
}
