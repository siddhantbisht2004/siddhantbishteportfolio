
import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const About = () => {
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
            
            <Button className="flex items-center gap-2">
              <FileText size={18} />
              Download Resume
            </Button>
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
