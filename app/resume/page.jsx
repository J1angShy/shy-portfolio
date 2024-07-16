"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { FaHtml5, FaJs, FaReact, FaJava, FaPhp } from 'react-icons/fa';
import { SiDocker, SiNextdotjs, SiSpringboot, SiTailwindcss } from 'react-icons/si';

const about = {
  title: 'about me',
  description: 'Looking for a internship/job in software engineering ~',
  info: [
    {
      fieldName: "Name",
      fieldValue: "Shuai Jiang",
    },
    {
      fieldName: "Phone",
      fieldValue: "(+61) 0490 849 955",
    },
    {
      fieldName: "Gender",
      fieldValue: "Male",
    },
    {
      fieldName: "Email",
      fieldValue: "shuai.jiang-3@student.uts.edu.au",
    },
    {
      fieldName: "Nationality",
      fieldValue: "Chinese",
    },
    {
      fieldName: "Languages",
      fieldValue: "English, Chinese",
    },
  ]
}

const education = {
  items: [
    {
      uni: 'University of Technology Sydney',
      major: 'Master of IT',
      duration: '2023 - 2025'
    },
    {
      uni: 'University of Ottawa',
      major: 'Bachelor of Economics',
      duration: '2019 - 2023'
    },
  ]
  
}

const experience = {
  items: [
    {
      duration: '2024.6 - 2024.7',
      position: 'Data Scientist',
      company: 'NSW Jobs Connect Program'
    },
    {
      duration: '2023.8 - 2024.6',
      position: 'Waiter',
      company: 'Royal Palace Seafood Restanraut'
    }
  ]
}

const skills = {
  skillList: [
    {
      name: 'Java',
      icon: <FaJava />
    },
    {
      name: 'PHP',
      icon: <FaPhp />
    },
    {
      name: 'JavaScript',
      icon: <FaJs />
    },
    {
      name: 'HTML 5',
      icon: <FaHtml5 />
    },
    {
      name: 'Next.js',
      icon: <SiNextdotjs />
    },
    {
      name: 'Tailwind.css',
      icon: <SiTailwindcss />
    },
    {
      name: 'Spring Boot',
      icon: <SiSpringboot />
    }, 
    {
      name: 'React',
      icon: <FaReact />
    },
    {
      name: 'Docker',
      icon: <SiDocker />
    }, 
  ]
}
const Resume = () => {
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {delay:0.5, duration:0.4, ease:"easeIn"}
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="education" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6" >
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          {/* content */}
          <div className="min-h-[70vh] w-full">

            {/* education */}
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <div className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li key={index} className="bg-[#2c2c30] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center  gap-1">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center">
                            {item.uni}
                          </h3>
                          <div className="flex items-center justify-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.major}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </TabsContent>

            {/* experience */}
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li key={index} className="bg-[#2c2c30] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center  gap-1">
                          <span className="text-accent">{ item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            {/* dot */}
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{ item.company}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* skills */}
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((item, index) => {
                    return (
                      <li key={index}>
                        <TooltipProvider delayDuration={100}>
                          <Tooltip>
                            <TooltipTrigger className="w-full h-[150px] bg-[#2c2c30] rounded-xl flex justify-center items-center group">
                              <div className="text-8xl group-hover:text-accent transition-all duration-300">{ item.icon}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{ item.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabsContent>

            {/* about */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => {
                    return (
                      <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                        <span className="text-white/60">{item.fieldName}</span>
                        <span className="text-xl ">{item.fieldValue}</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  )
}

export default Resume