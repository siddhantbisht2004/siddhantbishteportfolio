
import React, { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/components/ui/sonner";
import { VideoOff, Video, Upload, Play, FileVideo } from "lucide-react";

interface QuestionProps {
  number: number;
  question: string;
  videoRequired?: boolean;
}

const Question = ({ number, question, videoRequired = true }: QuestionProps) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Load saved data on component mount
  React.useEffect(() => {
    const savedAnswer = localStorage.getItem(`q${number}_answer`);
    const savedVideo = localStorage.getItem(`q${number}_video`);
    
    if (savedAnswer) setAnswer(savedAnswer);
    if (savedVideo) setVideoUrl(savedVideo);
  }, [number]);

  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswer = e.target.value;
    setAnswer(newAnswer);
    localStorage.setItem(`q${number}_answer`, newAnswer);
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.match('video.*')) {
      toast.error("Please select a video file");
      return;
    }
    
    // Generate a local URL for the video
    const videoURL = URL.createObjectURL(file);
    setVideoUrl(videoURL);
    
    // Save to localStorage (note: this stores the blob URL which may not persist across sessions)
    localStorage.setItem(`q${number}_video`, videoURL);
    toast.success("Video uploaded successfully!");
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
    <Card className="mb-6 border-primary/20 hover:border-primary/50 transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center">
            {number}
          </span>
          {question}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`q${number}-answer`}>Your Answer:</Label>
          <textarea
            id={`q${number}-answer`}
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            className="flex min-h-28 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        
        {videoRequired && (
          <div className="space-y-4">
            <Label className="block">Video Response:</Label>
            {videoUrl ? (
              <div className="relative aspect-video bg-black/5 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={videoUrl}
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
                      if (videoUrl) URL.revokeObjectURL(videoUrl);
                      setVideoUrl(null);
                      localStorage.removeItem(`q${number}_video`);
                    }}
                  >
                    Remove Video
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center flex flex-col items-center justify-center">
                <VideoOff className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm text-muted-foreground mb-4">No video uploaded yet</p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="gap-2"
                >
                  <Upload size={16} />
                  Upload Video
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
        )}
      </CardContent>
    </Card>
  );
};

const questions = [
  { id: 1, text: "Write your career objective." },
  { id: 2, text: "Why do you want to be an engineer? Elaborate reasons." },
  { id: 3, text: "Write about projects or internship you have done/are doing along with the learning." },
  { id: 4, text: "What would you consider a significant achievement in your life and why?" },
  { id: 5, text: "Write about a failure of yours which you consider to share. What have you learned from it?" },
  { id: 6, text: "What are your strengths? Write one or two instances where you have demonstrated your strengths." },
  { id: 7, text: "Write about your weaknesses. What are you doing to overcome your weaknesses?" },
  { id: 8, text: "What is the most difficult moment that you have faced in your life so far? What qualities helped you to overcome the moment?" },
  { id: 9, text: "Apart from academics, what else are you interested in? Make a separate list in terms of extracurricular activities, sports and any other interests." },
  { id: 10, text: "Give an example of an area, concept or thing that you are absolutely passionate about." },
  { id: 11, text: "Describe yourself as an individual in 5 lines.", videoRequired: false },
  { id: 12, text: "What kinds of people do you enjoy working with?" },
  { id: 13, text: "What kinds of people you don't want to work with? What would you do if they became your senior in your dream job?" },
  { id: 14, text: "What do you expect from your first job? Prioritize and write in order." },
  { id: 15, text: "In the past year, what have you been dissatisfied about in your performance?" },
  { id: 16, text: "Rate yourself out of 5 in verbal communication. What are you doing to improve your communication skills?" },
  { id: 17, text: "Who is your role model? What qualities of that person you would like to see in your personality and why?" },
  { id: 18, text: "Write a few lines about your friends. Do you think they help/ may help you in achieving your goals? If yes, how? If no, why do you accompany them?" },
  { id: 19, text: "Write 3 leadership qualities. How many do you possess? Write an instance where you have applied those qualities." },
];

const ProfilingSheet = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">
            <FileVideo className="inline-block mr-2 text-primary" />
            Profiling Sheet
          </h2>
          <p className="text-muted-foreground mb-6">Answer the questions below and upload your video responses</p>
          
          <div className="max-w-3xl mx-auto bg-secondary/20 p-6 rounded-lg border border-secondary/30 mb-8">
            <h3 className="text-xl font-medium mb-3">Instructions</h3>
            <p className="text-base text-foreground/80 mb-4">
              Please answer each question thoroughly and upload a video response where indicated.
              Your answers and videos will be saved automatically in your browser.
            </p>
            <div className="text-sm text-foreground/70 bg-background/50 p-3 rounded border border-border/30">
              <strong>Note:</strong> All your answers and uploaded videos are stored locally on your device
              and will be available the next time you visit this page.
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {questions.map((q) => (
            <Question 
              key={q.id}
              number={q.id}
              question={q.text}
              videoRequired={q.videoRequired !== false}
            />
          ))}
          
          <div className="flex justify-center pt-8">
            <Button 
              size="lg"
              onClick={() => toast.success("Profile sheet responses saved!")}
              className="px-8"
            >
              Save All Responses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilingSheet;
