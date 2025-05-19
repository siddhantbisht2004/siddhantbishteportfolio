
/**
 * Extract YouTube video ID from various YouTube URL formats
 * @param url - YouTube video URL
 * @returns YouTube video ID or null if not a valid YouTube URL
 */
export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  
  // Regular expression to match YouTube video IDs from various URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Create an embed URL from a YouTube ID
 * @param videoId - YouTube video ID
 * @returns YouTube embed URL
 */
export const getYouTubeEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/embed/${videoId}`;
};

/**
 * Check if a string is a valid YouTube URL
 * @param url - URL to check
 * @returns boolean indicating if the URL is a valid YouTube URL
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  return !!extractYouTubeId(url);
};
