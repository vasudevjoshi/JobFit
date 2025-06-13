import React from 'react'
import { Facebook, Instagram, Twitter, Github } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom' // <-- import NavLink

const info = [
    {
        Services: ["Resume Analysis", "Job Description Matching", "Skill Development", "Career Coaching"]
    },
    {
        Company: ["About Us", "Blog", "Careers", "Contact Us"]
    },
    {
        Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy"]
    }
]

// Update icons to include route paths
const icons = [
  { icon: <Facebook />, path: 'https://www.facebook.com/vasujoshi2003' },
  { icon: <Instagram />, path: '/' },
  { icon: <Twitter />, path: 'https://www.x.com/vasujoshi2003' },
  { icon: <Github />, path: 'https://www.github.com/vasudevjoshi' }
];

const Footer = () => {
  return (
    <div>
        <div className=" bg-gray-800 text-gray-300 py-8 mt-8">
            <div className=" w-10/12 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">JobFit</h3>
                        <p className="text-sm">Helping job seekers match their skills to job requirements and improve their career prospects.</p>
                    </div>
                    {info.map((section, idx) => {
                        const [title, items] = Object.entries(section)[0];
                        return (
                            <div key={title}>
                                <h4 className="text-white text-md font-semibold mb-4">{title}</h4>
                                <ul>
                                    {items.map((item, i) => (
                                        <li key={i} className="mb-2 hover:text-blue-400 cursor-pointer text-sm"><Link to="/">{item}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
                <div className="border-t border-gray-700 mt-8  pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; 2025 JobFit. All rights reserved</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                      {
                        icons.map((item, idx) => (
                          <NavLink
                            key={idx}
                            to={item.path}
                            className='hover:text-blue-400 cursor-pointer'
                          >
                            {item.icon}
                          </NavLink>
                        ))
                      }
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer