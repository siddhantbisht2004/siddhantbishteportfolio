
import React from 'react';
import { Code, Html, Github } from 'lucide-react';
import { Card } from '@/components/ui/card';

const skillCategories = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'C', level: 85, icon: Code },
      { name: 'C++', level: 80, icon: Code },
      { name: 'Python', level: 75, icon: Code },
      { name: 'Java', level: 70, icon: Code }
    ]
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'HTML', level: 90, icon: Html },
      { name: 'CSS', level: 85, icon: Html },
      { name: 'JavaScript', level: 75, icon: Code }
    ]
  },
  {
    title: 'Backend Frameworks',
    skills: [
      { name: 'Flask', level: 65, icon: Code },
      { name: 'FastAPI', level: 60, icon: Code }
    ]
  },
  {
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 80, icon: Github },
      { name: 'GitHub', level: 85, icon: Github }
    ]
  }
];

const SkillBar = ({ name, level, icon: Icon }: { name: string; level: number; icon: any }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Icon size={16} className="text-primary" />
          <span className="text-sm font-medium text-gray-200">{name}</span>
        </div>
        <span className="text-xs font-medium text-gray-400">{level}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
            Skills & Expertise
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="bg-muted/30 border-muted hover:border-primary/50 transition-colors p-6"
            >
              <h3 className="text-lg font-semibold mb-4 text-white">{category.title}</h3>
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    name={skill.name}
                    level={skill.level}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
