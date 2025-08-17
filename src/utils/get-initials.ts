/**
 * Returns the initials of a given name string.
 *
 * Extracts the first letter of each word in the name, up to the specified length.
 * The initials are returned in uppercase by default, but can be returned in lowercase if specified.
 *
 * @param name - The input string (e.g., a full name).
 * @param length - The number of initials to return (default: 2 initials).
 * @param toUpperCase - Whether to return the initials in uppercase (default: true).
 * @returns The initials as a string.
 *
 * @example
 * getInitials("john doe") // "JD"
 * getInitials("john doe", 1) // "J"
 * getInitials("john doe", 2, false) // "jd"
 */
export const getInitials = (name: string, length = 2, toUpperCase = true) =>
	name
		.trim()
		.split(/\s+/)
		.reduce<string[]>((acc, word) => {
			if (word) acc.push(word.charAt(0));
			return acc;
		}, [])
		.slice(0, length ?? Number.POSITIVE_INFINITY)
		.join('')
		[toUpperCase ? 'toUpperCase' : 'toLowerCase']();
