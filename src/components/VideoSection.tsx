
import React, { useState, useEffect } from 'react';
import { Video, Youtube, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';
import YouTubeEmbed from './YouTubeEmbed';
import { isValidYouTubeUrl, extractYouTubeId } from '@/utils/youtube';

interface VideoItemProps {
  youtubeUrl: string;
  title: string;
  description?: string;
  onRemove: () => void;
}

interface StoredVideo {
  youtubeUrl: string;
  title: string;
  description: string;
}

const VideoItem = ({ youtubeUrl, title, description, onRemove }: VideoItemProps) => {
  return (
    <Card className="bg-secondary/50 border border-secondary/80">
      <CardContent className="p-0 relative overflow-hidden rounded-lg">
        <div className="relative">
          <YouTubeEmbed url={youtubeUrl} />
        </div>
        
        <div className="p-4 flex flex-col gap-2">
          <h3 className="text-lg font-medium">{title}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={onRemove} className="text-destructive hover:text-destructive/80">
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const VideoSection = () => {
  const [videos, setVideos] = useState<Array<StoredVideo>>([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');

  // Google Drive folder URL
  const googleDriveUrl = "https://drive.google.com/drive/folders/1Bn_eeitFecn3mlexc0ronGsxIK83P7j-?usp=drive_link";
  
  // Load videos from localStorage on component mount
  useEffect(() => {
    const storedVideos = localStorage.getItem('userYoutubeVideos');
    if (storedVideos) {
      try {
        const parsedVideos = JSON.parse(storedVideos);
        setVideos(parsedVideos);
      } catch (error) {
        console.error('Error parsing stored videos:', error);
      }
    }
  }, []);

  // Save videos to localStorage whenever videos state changes
  useEffect(() => {
    if (videos.length > 0) {
      localStorage.setItem('userYoutubeVideos', JSON.stringify(videos));
    }
  }, [videos]);
  
  const handleAddYoutubeVideo = () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }
    
    if (!isValidYouTubeUrl(youtubeUrl)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    const title = videoTitle.trim() ? videoTitle : `YouTube Video ${videos.length + 1}`;
    
    const newVideos = [...videos, {
      youtubeUrl: youtubeUrl,
      title: title, 
      description: "Click to edit description."
    }];
    
    setVideos(newVideos);
    toast.success("YouTube video added successfully!");
    
    // Reset inputs
    setYoutubeUrl('');
    setVideoTitle('');
  };

  const removeVideo = (index: number) => {
    const newVideos = [...videos];
    newVideos.splice(index, 1);
    setVideos(newVideos);
    
    // Update localStorage after removal
    if (newVideos.length > 0) {
      localStorage.setItem('userYoutubeVideos', JSON.stringify(newVideos));
    } else {
      localStorage.removeItem('userYoutubeVideos');
    }
    
    toast.success("Video removed");
  };

  const handleOpenGoogleDrive = () => {
    window.open(googleDriveUrl, "_blank");
    toast.info("Opening Google Drive. You can organize your YouTube links here for reference.");
  };

  return (
    <section id="videos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            <Video className="inline-block mr-2 text-primary" />
            My Videos
          </h2>
          <p className="text-muted-foreground mb-6">Check out my latest video content</p>
          
          <div className="max-w-3xl mx-auto bg-secondary/20 p-6 rounded-lg border border-secondary/30 mb-8">
            <h3 className="text-xl font-medium mb-3">YouTube Video Gallery</h3>
            <p className="text-base text-foreground/80 mb-4">
              Welcome to my video collection! Add your favorite YouTube videos by pasting their URLs below. 
              Videos will be saved in your browser and will be available even after you close or refresh the page.
            </p>
            <div className="text-sm text-foreground/70 bg-background/50 p-3 rounded border border-border/30">
              <strong>Note:</strong> All your videos are stored locally on your device and will be available the next time you visit.
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {videos.length > 0 ? (
            <Carousel className="mb-10">
              <CarouselContent>
                {videos.map((video, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <VideoItem
                        youtubeUrl={video.youtubeUrl}
                        title={video.title}
                        description={video.description}
                        onRemove={() => removeVideo(index)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-6">
                <CarouselPrevious className="relative static transform-none mx-2" />
                <CarouselNext className="relative static transform-none mx-2" />
              </div>
            </Carousel>
          ) : (
            <div className="text-center p-16 border-2 border-dashed border-muted rounded-lg">
              <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No videos yet</h3>
              <p className="text-muted-foreground mb-6">
                Add YouTube videos using the form below
              </p>
            </div>
          )}

          <div className="text-center mt-8 space-y-4">
            <div className="max-w-md mx-auto p-6 bg-secondary/10 rounded-lg border border-secondary/20">
              <h3 className="text-lg font-medium mb-4">Add YouTube Video</h3>
              <div className="space-y-3">
                <div>
                  <Input 
                    placeholder="YouTube video URL"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="mb-2"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Video title (optional)"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="mb-4"
                  />
                </div>
                <Button 
                  onClick={handleAddYoutubeVideo}
                  className="w-full gap-2"
                  variant="default"
                >
                  <Youtube size={18} />
                  Add YouTube Video
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                onClick={handleOpenGoogleDrive}
                variant="outline"
                className="gap-2"
              >
                Access Google Drive
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              You can use Google Drive to organize and save your YouTube video links for reference
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
