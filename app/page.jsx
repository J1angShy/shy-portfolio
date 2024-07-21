"use client";
import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"

//component
import Social from "@/components/Social"
import Photo from "@/components/Photo"
import Stats from "@/components/Stats"
import Card from "@/components/Card"

const page = () => {

  const handleDownload = () => {
    console.log("download");
  }

  return (
    <>
      
      <section className="h-full">
        
      <div className="container max-auto h-full ">
        <div className="flex flex-col xl:flex-row items-center item-center justify-between xl:pt-8 xl:pb-24">

          {/* text */}
          <div className="text-center xl:text-left order-2 xl:order-none">
            {/* <div><span className="text-xl">Software Developer</span></div> */}

              <div className="h1 mb-9">
                Hello I'm <br /><span className="text-accent ">Shuai Jiang</span>
            </div>

              <div className="max-w-[500px] mb-16 text-white/80">
                Driven by a continuous learning mindset, I am eager to contribute to innovative projects and collaborate with talented teams to deliver exceptional digital experiences.
              </div>
            
            {/* btn & socials */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <a href="/assets/resume/Shuai Jiang - CV.pdf">
                <Button variant="outline" size="lg" className="uppercase flex items-center gap-2" onClick={handleDownload}>
                <span>Download CV</span>
                <FiDownload className="text-xl"/>
              </Button>
              </a>
              
              <div className="mb-8 xl:mb-0">
                <Social containerStyles="flex gap-6" iconStyles="w-9 h-9 border-2 border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"/>
              </div>
            </div>
          </div>

          {/* photo */}
          {/* <div className="order-1 xl:order-none mb-8 xl:mb-0"> 
            <Photo />
          </div> */}
            {/* card */}
            <div className="order-1 xl:order-none mb-8 xl:mb-0">
              <Card />
            </div>
        </div>
      </div>
      <Stats />
      </section>

      
    </>
    
  )
}

export default page
