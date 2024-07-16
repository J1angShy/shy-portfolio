"use client";

import { BsArrowUpRight, BsGithub } from "react-icons/bs"

import React, { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Swiper, SwiperSlide } from "swiper/react";  
import "swiper/css";
import Image from "next/image";
import ProjectSlideBtns from "@/components/ProjectSlideBtns";

const projects = [
  {
    num: '01',
    title: 'Personal Blog',
    description: 'Backend Java project with Spring Boot',
    stack: [
      {
        name:"Java"
      },
      {
        name: "Spring Boot"
      },
      {
        name: "Spring Security"
      },
      {
        name: "Mybatis"
      },
    ],
    image: '/assets/project/blog.png',
    github: '/project',
    live: "Live Project",
    url: ""
  },
  {
    num: '02',
    title: 'Movie Catalogue',
    description: 'Fullstack project with Spring Boot, Java, React.js, JavaScript',
    stack: [
      {
        name: "Java"
      },
      {
        name: "Spring Boot"
      },
      {
        name: "React.js"
      },
      {
        name: "JavaScript"
      },
    ],
    image: '/assets/project/thumb2.png',
    github: '/project',
    live: "Still developing...",
    url: ""
  }
]

const Work = () => {

  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition:{delay:0.5,duration:0.4, ease:"easeIn"} }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div className="w-full xl:w-[50%] xl:h-[460px] felx flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              {/* outline num */}
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              {/* title */}
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500">
                {project.title}
              </h2>
              {/* project description*/}
              <p className="text-white/60">
                {project.description}
              </p>
              {/* stack */}
              <ul className="flex gap-4">
                {project.stack.map((item, index) => {
                  return (
                    <li key={index} className="text-xl text-accent">
                      {item.name}
                      {/* remove last comma */}
                      {index !== project.stack.length - 1 && ","}
                    </li>
                  )
                })}
              </ul>

              {/* border */}
              <div className="border border-white/20"></div>
              <div className="flex items-center gap-4">
                {/* live project button */}
                <div>
                  <Link href={project.url}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          {project.live}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </div>
                {/* github button */}
                <div>
                  <Link href={project.github}>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                          <BsGithub className="text-white text-3xl group-hover:text-accent" />
                        </TooltipTrigger>
                        <TooltipContent>
                          Github Repo
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Link>
                </div>
              </div>
            </div>
            
            
          </div>
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => {
                return (
                  <SwiperSlide key={index} className="w-full">
                    <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
                      {/* overlay */}
                      <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"> 
                      </div>
                      {/* image */}
                      <div className="relative w-full h-full">
                        <Image
                          src={project.image} fill className="object-cover" alt=""
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })}
              {/* slider buttons */}
              <ProjectSlideBtns
                containerStyle="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyle="bg-accent hover:bg-accent-hover trext-primary text-[22px] w-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
        
      </div>
    </motion.div>
  )
}

export default Work