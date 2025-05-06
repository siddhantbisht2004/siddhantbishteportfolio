
import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContactIcon = ({ icon: Icon, href, label }: { icon: any; href: string; label: string }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="inline-flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
    >
      <Icon size={24} className="text-primary" />
      <span className="text-sm text-gray-300">{label}</span>
    </a>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Get In Touch
          </span>
        </h2>
        
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Contact section coming soon. Feel free to reach out to me through the following platforms.
        </p>
        
        <Card className="max-w-3xl mx-auto bg-muted/30 border-muted">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-3 gap-4">
              <ContactIcon 
                icon={Mail} 
                href="mailto:contact@example.com" 
                label="Email Me" 
              />
              <ContactIcon 
                icon={Github} 
                href="https://github.com" 
                label="GitHub" 
              />
              <ContactIcon 
                icon={Linkedin} 
                href="https://linkedin.com" 
                label="LinkedIn" 
              />
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">
                Want to work together or have any questions?
              </p>
              <Button className="bg-primary hover:bg-primary/80">
                <Mail className="mr-2 h-4 w-4" />
                Email Me
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
