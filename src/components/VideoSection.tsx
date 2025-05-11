import React, { useState, useRef } from 'react';
import { Video, Upload, Play, FileVideo, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from '@/components/ui/sonner';

interface VideoItemProps {
  src: string;
  title: string;
  description?: string;
  onRemove: () => void;
}

const VideoItem = ({ src, title, description, onRemove }: VideoItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="bg-secondary/50 border border-secondary/80">
      <CardContent className="p-0 relative overflow-hidden rounded-lg">
        <div className="relative aspect-video">
          <video
            ref={videoRef}
            src={src}
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
          />
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-primary/80 hover:bg-primary text-white w-16 h-16"
                onClick={togglePlay}
              >
                <Play size={32} />
              </Button>
            </div>
          )}
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
  const [videos, setVideos] = useState<Array<{src: string; title: string; description: string}>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Updated Google Drive folder URL with the user's specific link
  // You can update this URL with your own Google Drive folder link
  const googleDriveUrl = "https://drive.google.com/drive/folders/1Bn_eeitFecn3mlexc0ronGsxIK83P7j-?usp=drive_link";
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.match('video.*')) {
      toast.error("Please select a video file");
      return;
    }
    
    // Generate a local URL for the video
    const videoURL = URL.createObjectURL(file);
    
    // Get filename without extension as title
    const title = file.name.replace(/\.[^/.]+$/, "");
    
    setVideos([...videos, { src: videoURL, title, description: "Newly uploaded video. Click to edit description." }]);
    toast.success("Video uploaded successfully!");
    
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeVideo = (index: number) => {
    const newVideos = [...videos];
    
    // Revoke the object URL to free up memory
    URL.revokeObjectURL(newVideos[index].src);
    
    newVideos.splice(index, 1);
    setVideos(newVideos);
    toast.success("Video removed");
  };

  const handleOpenGoogleDrive = () => {
    window.open(googleDriveUrl, "_blank");
    toast.info("Opening Google Drive. Upload your videos there and they will appear in your video gallery.");
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
          
          {/* Added detailed description */}
          <div className="max-w-3xl mx-auto bg-secondary/20 p-6 rounded-lg border border-secondary/30 mb-8">
            <h3 className="text-xl font-medium mb-3">Video Gallery</h3>
            <p className="text-base text-foreground/80 mb-4">
              Welcome to my video collection! Here you'll find tutorials, project demos, and educational content 
              related to programming, technology, and my personal projects. Browse through the carousel to see all videos, 
              or access my Google Drive for the complete collection with downloadable resources.
            </p>
            <div className="text-sm text-foreground/70 bg-background/50 p-3 rounded border border-border/30">
              <strong>Note:</strong> To update videos, upload them to the connected Google Drive folder. 
              Once uploaded, they will be automatically synced with this gallery on the next update.
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
                        src={video.src}
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
                Click below to access your Google Drive videos
              </p>
            </div>
          )}

          <div className="text-center mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={handleOpenGoogleDrive}
                size="lg"
                className="gap-2"
                variant="default"
              >
                <FileVideo size={18} />
                Access Google Drive Videos
              </Button>

              <Button 
                onClick={() => fileInputRef.current?.click()}
                size="lg" 
                variant="outline"
                className="gap-2"
              >
                <Upload size={18} />
                Upload Video Directly
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Recommended: Upload your videos to Google Drive for better management and storage
            </p>
            
            <input
              type="file"
              ref={fileInputRef}
              accept="video/*"
              className="hidden"
              onChange={handleVideoUpload}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
