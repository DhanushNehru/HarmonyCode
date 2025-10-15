// Utility functions for AiRecommendation component

/**
 * Fisher-Yates shuffle algorithm for unbiased array shuffling
 * @param {Array} array - Array to shuffle
 * @returns {Array} - Shuffled copy of the array
 */
export const fisherYatesShuffle = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Get random selection from array using Fisher-Yates shuffle
 * @param {Array} array - Source array
 * @param {number} count - Number of items to select
 * @returns {Array} - Randomly selected items
 */
export const getRandomSelection = (array, count) => {
  const shuffled = fisherYatesShuffle(array);
  return shuffled.slice(0, count);
};