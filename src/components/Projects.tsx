
import React from 'react';
import { Github } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: 'Intelligent Chatbot using Machine Learning',
    description: 'A smart chatbot that uses machine learning algorithms to understand and respond to user queries effectively.',
    tags: ['Python', 'ML', 'NLP'],
    status: 'Completed',
    links: {
      github: 'https://github.com/siddhantbisht2004/CSE-chatbot'
    }
  },
  {
    title: 'OWASP Top 10 Vulnerability Detector',
    description: 'A tool that scans web applications to detect the OWASP Top 10 security vulnerabilities.',
    tags: ['Python', 'Security', 'Web'],
    status: 'In Progress',
    links: {
      github: 'https://github.com/anshul-rautela/Cybershield'
    }
  },
  {
    title: 'Custom Text Editor in C',
    description: 'A lightweight text editor built from scratch in C with basic text manipulation features.',
    tags: ['C', 'CLI', 'Data Structures'],
    status: 'Completed',
    links: {
      github: 'https://github.com/anshul-rautela/Text-Editor'
    }
  }
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  return (
    <Card className="bg-muted/30 border-muted hover:border-primary/50 transition-all h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
          <Badge variant={project.status === 'Completed' ? 'default' : 'secondary'} className="ml-2">
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-muted text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 pt-4 border-t border-muted">
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Github size={16} className="mr-1" />
              Code
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            My Projects
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
