
import React, { useState, useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CircularAvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const CircularAvatar = ({ initials, size = "lg", className = "" }: CircularAvatarProps) => {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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
        setImage(event.target.result as string);
        toast.success("Profile picture updated!");
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
        {image ? (
          <AvatarImage src={image} alt="Profile" className="object-cover" />
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
