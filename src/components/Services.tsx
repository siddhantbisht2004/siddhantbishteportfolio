
import React from 'react';
import { Laptop, Server, Code, Layout } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: 'Frontend Development',
    description: 'Creating responsive and interactive user interfaces with modern web technologies and frameworks.',
    icon: Layout
  },
  {
    title: 'Backend Development',
    description: 'Building robust server-side applications and APIs to power web applications.',
    icon: Server
  },
  {
    title: 'Full Stack Development',
    description: 'Providing end-to-end solutions that integrate both frontend and backend technologies.',
    icon: Laptop
  },
  {
    title: 'Custom Application Development',
    description: 'Developing specialized applications tailored to specific needs and requirements.',
    icon: Code
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Services
          </span>
        </h2>
        
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Aspiring Full Stack Developer aiming to provide complete web development solutions including 
          frontend design, backend integration, and full-scale application development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="bg-muted/30 border-muted hover:border-primary/50 transition-all overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300"></div>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-2 rounded-md bg-primary/10 text-primary">
                    <Icon size={24} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
