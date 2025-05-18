
import React, { useState, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Play, VideoOff } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const About = () => {
  const [introVideo, setIntroVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load saved video on component mount
  React.useEffect(() => {
    const savedVideo = localStorage.getItem('intro_video');
    if (savedVideo) setIntroVideo(savedVideo);
  }, []);

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.match('video.*')) {
      toast.error("Please select a video file");
      return;
    }
    
    // Generate a local URL for the video
    const videoURL = URL.createObjectURL(file);
    setIntroVideo(videoURL);
    
    // Save to localStorage
    localStorage.setItem('intro_video', videoURL);
    toast.success("Introduction video uploaded successfully!");
  };

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
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            About Me
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300">
              I am a B.Tech Computer Science Engineering student at Graphic Era Hill University, Dehradun. 
              Passionate about coding and always eager to explore emerging technologies, I aim to develop 
              meaningful and innovative digital solutions.
            </p>
            
            <Card className="bg-muted/50 border-muted p-6">
              <h3 className="text-xl font-semibold mb-4">Education</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-primary mr-3"></div>
                  <div>
                    <h4 className="font-medium">Bachelor of Technology in CSE</h4>
                    <p className="text-sm text-gray-400">Graphic Era Hill University, Dehradun (2023–2027)</p>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Introduction Video Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">My Introduction</h3>
              <div className="space-y-4">
                {introVideo ? (
                  <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      src={introVideo}
                      className="w-full h-full object-cover"
                      onEnded={() => setIsPlaying(false)}
                    />
                    {!isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="rounded-full bg-primary text-white hover:bg-primary/80 w-12 h-12"
                          onClick={togglePlay}
                        >
                          <Play size={24} />
                        </Button>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (introVideo) URL.revokeObjectURL(introVideo);
                          setIntroVideo(null);
                          localStorage.removeItem('intro_video');
                          toast.success("Video removed successfully");
                        }}
                      >
                        Remove Video
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center flex flex-col items-center justify-center">
                    <VideoOff className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-sm text-muted-foreground mb-4">No introduction video uploaded yet</p>
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="gap-2"
                    >
                      <Upload size={16} />
                      Upload Introduction Video
                    </Button>
                  </div>
                )}
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
          
          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-lg blur-3xl"></div>
            <Card className="bg-muted/30 border-muted p-8 relative z-10">
              <h3 className="text-xl font-semibold mb-4">My Journey</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-primary">Passion for Coding</h4>
                  <p className="text-sm text-gray-300 mt-2">
                    Started my coding journey with C and C++, and quickly expanded my skills to include 
                    web technologies and modern programming languages.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">Continuous Learning</h4>
                  <p className="text-sm text-gray-300 mt-2">
                    Always exploring new technologies and frameworks to stay ahead in the rapidly 
                    evolving tech landscape.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-primary">Problem Solver</h4>
                  <p className="text-sm text-gray-300 mt-2">
                    Enjoy tackling complex problems and developing innovative solutions through code.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
