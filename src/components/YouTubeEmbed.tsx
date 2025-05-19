
import React from 'react';
import { extractYouTubeId, getYouTubeEmbedUrl } from '@/utils/youtube';

interface YouTubeEmbedProps {
  url: string;
  className?: string;
  title?: string;
}

const YouTubeEmbed = ({ url, className = "", title = "YouTube video player" }: YouTubeEmbedProps) => {
  const videoId = extractYouTubeId(url);
  
  if (!videoId) {
    return <div className="p-4 text-center text-red-500">Invalid YouTube URL</div>;
  }
  
  const embedUrl = getYouTubeEmbedUrl(videoId);
  
  return (
    <div className={`aspect-video w-full overflow-hidden rounded-lg ${className}`}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  );
};

export default YouTubeEmbed;
