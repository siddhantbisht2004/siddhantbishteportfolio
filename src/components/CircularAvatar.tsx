
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CircularAvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  image?: string;
}

const CircularAvatar = ({ initials, size = "lg", className = "", image }: CircularAvatarProps) => {
  const [loadedImage, setLoadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load image from localStorage or props when component mounts
  useEffect(() => {
    try {
      const savedImage = localStorage.getItem('userProfileImage');
      if (savedImage) {
        setLoadedImage(savedImage);
        console.log("Loaded image from localStorage");
      } else if (image) {
        setLoadedImage(image);
        console.log("Used prop image as fallback");
      }
    } catch (error) {
      console.error("Error loading image from localStorage:", error);
      // Fallback to prop image if localStorage fails
      if (image) {
        setLoadedImage(image);
      }
    }
  }, [image]);
  
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
    xl: "w-40 h-40"
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const imageData = event.target.result as string;
        try {
          // Save to localStorage for persistence
          localStorage.setItem('userProfileImage', imageData);
          setLoadedImage(imageData);
          toast.success("Profile picture updated!");
          console.log("Image saved to localStorage");
        } catch (error) {
          console.error("Error saving to localStorage:", error);
          toast.error("Failed to save image. It may not persist after refresh.");
          // Still show the image for current session
          setLoadedImage(imageData);
        }
      }
    };
    reader.readAsDataURL(file);
  };
  
  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`relative group ${className}`}>
      <Avatar className={`border-4 border-primary mx-auto overflow-hidden ${sizeClasses[size]}`}>
        {loadedImage ? (
          <AvatarImage src={loadedImage} alt="Profile" className="object-cover" />
        ) : (
          <AvatarFallback className="bg-gradient-to-br from-gray-700 to-gray-900 text-xl font-bold flex items-center justify-center">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      
      <div 
        className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer"
        onClick={handleUploadClick}
      >
        <Button variant="ghost" size="icon" className="text-white">
          <Upload size={24} />
        </Button>
      </div>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleImageChange}
      />
    </div>
  );
};

export default CircularAvatar;
