
import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden py-20 pt-24"
      style={{
        backgroundImage: "radial-gradient(circle at 50% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%)"
      }}
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#121212] opacity-90"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="mb-8 animate-fade-in opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary mx-auto overflow-hidden">
            {/* Placeholder for profile image */}
            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xl font-bold">
              SB
            </div>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
          Hi, I'm <span className="text-primary">Siddhant Bisht</span>
        </h1>

        <div className="animate-fade-in opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
            A passionate coder and aspiring full stack developer exploring the world of technology.
          </p>

          <div className="flex justify-center space-x-4">
            <Button className="bg-primary hover:bg-primary/80 text-white">
              My Projects
            </Button>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      <a 
        href="#about" 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce-slow"
      >
        <ArrowDown size={32} strokeWidth={1} />
      </a>

      {/* Decorative elements */}
      <div className="hidden md:block absolute top-1/4 left-10 w-24 h-24 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="hidden md:block absolute bottom-1/4 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl"></div>
    </section>
  );
};

export default Hero;
