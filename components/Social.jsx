import React from 'react'
import Link from 'next/link'
import { FaGithub, FaLinkedinIn} from "react-icons/fa"
import { IoLogoWechat } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io";


const socials = [
  { icon: <FaGithub />, path: 'https://github.com/LavaXD' },
  { icon: <FaLinkedinIn />, path: 'https://www.linkedin.com/in/shuai-jiang2001/' },
  { icon: <IoLogoWhatsapp />, path: '/assets/whatsApp.jpeg' },
  { icon: <IoLogoWechat />, path: '/assets/wechat.jpeg' }, 
]

const Social = ({iconStyles, containerStyles}) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        )
      })}
    </div>
  )
}

export default Social