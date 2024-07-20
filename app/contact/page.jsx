"use client";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkedAlt, FaPhoneAlt } from 'react-icons/fa'; 
import { Textarea } from '@/components/ui/textarea';
  

const info = [
  {
    icon: <FaPhoneAlt />,
    title: 'Phone',
    description: '(+61) 490 849 955',
  },
  {
    icon: <FaEnvelope />,
    title: 'Email',
    description: 'shuai.jiang-3@student.uts.edu.au',
  },
  {
    icon: <FaMapMarkedAlt />,
    title: 'Address',
    description: '71 Jones St, Ultimo, NSW 2007',
  },
]

const Contact = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.4, ease: "easeIn" } }}
      className="py-6"
    >
      <div className="container mx-auto">
        <div className='flex flex-col xl:flex-row gap-[30px]'>
          {/* form */}
          <div className='xl:w-[54%] order-2 xl:order-none'>
            <form className='flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl'> 
              <h3 className='text-4xl text-accent' >let's connect!</h3>
              <p className='text-white/60'>This form is only for display purpose... Feel free to send me a message through email or LinkedIn, or just call me!</p>
              {/* input */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'> 
                <Input type="firstname" placeholder="Firstname" />
                <Input type="lastname" placeholder="Lastname" />
                <Input type="email" placeholder="Email" />
                <Input type="phone" placeholder="Phone number" />
              </div>
              {/* select */}
              <Select>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Select a service"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Select a service </SelectLabel>
                    <SelectItem value="1">Coffee Chat</SelectItem>
                    <SelectItem value="2">Web Development</SelectItem>
                    <SelectItem value="3">UI/UX Design</SelectItem>
                    <SelectItem value="4">Smart Contract</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* textarea */}
              <Textarea className="h-[120px]" placeholder="Message to me ~" />
              {/* btn */}
              <Button size="md">Send</Button>
            </form>
          </div>
          
          {/* info */}
          <div className='flex-1 flex items-center xl:justify-end order-1 xl:order-none mb-8 xl:mb-0'>
            <ul className='flex flex-col gap-10'>
              {info.map((item,index) => {
                return (
                  <li key={index} className='flex items-center gap-6'>
                    <div className='w-[52px] h-[52px] xl:w-[72px] xl:h-[72px] bg-[#27272c] text-accent rounded-md flex items-center justify-center'>
                      <div className='text-[37px]'>{item.icon}</div>
                    </div>
                    <div className='flex-1'>
                      <p className='text-white/60'>{ item.title}</p>
                      <h3 className='text-xl'>{ item.description}</h3>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact