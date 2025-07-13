
import React, {useEffect, useRef} from 'react';
import './App.css';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
import cover from './images/cover.jpg';
import bottle1 from './images/BOTTLE1.png';
import { library } from "@fortawesome/fontawesome-svg-core";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

library.add( faArrowRight);

function App() {
return (
    <>
        <main className='bg-[#FFEAD8] text-[#56021F]'>
            <header className='border-2 border-black'>
                <nav className=' flex flex-row justify-between px-10 py-3 font-karantina text-3xl'>
                    <div> HARIPRIYA DAIRY FARM</div>
                    <div> 
                        <ol className='flex flex-row gap-20'>
                            <li>HOME</li>
                            <li>ABOUT</li>
                            <li>PRODUCTS</li>
                            <li>CONTACT</li>
                        </ol>
                    </div>
                </nav>
            </header>
                <section>
                    <div className='border-2 border-black h-screen'>
                    </div>
                    <div className='border-2 border-black h-max font-bebas text-9xl flex flex-col gap-10 place-items-center items-center pt-16'>
                        <h1> <marquee behavior="scroll" direction="left">NATURAL PRODUCTS*</marquee></h1>
                        <h1 className='outline outline-2 font-outline-2 text-transparent'> NATURAL PRODUCTS*</h1>
                        <h1> <marquee behavior="scroll" direction="left">WE ALWAYS CHECK QUALITY*</marquee></h1>
                        <h1> <marquee behavior="scroll" direction="left">BRIGHT MAP OF TASTE*</marquee></h1>
                    </div>
                    <div className='bg-[#56021F] text-[#FFEAD8] border-2 border-black flex flex-col mt-28'>
                        <div className='text-8xl text-center font-bebas py-28 border-2 border-white'>
                            <p>We deliver 100% natural cow milk straight from our farm to your doorstep.
                                Our cows are raised in a clean, healthy environment with love and care.
                            </p>
                        </div>
                        <div className='flex flex-row gap-16 justify-around border-2 border-white h-[75rem]'>
                            <img src="" alt="sub-img" className=' rounded-tl-[5rem] border-2 border-black w-96 h-[30rem] place-self-end mb-96 '/>
                            <img src="" alt="sub-img" className=' rounded-t-full border-2 border-black h-[40rem] w-96 place-self-start'/>
                            <img src="" alt="sub-img" className=' rounded-tr-[5rem] border-2 border-black w-96 h-[30rem] place-self-end'/>
                        </div>
                    </div>
                    <div className=' flex flex-col gap-16'>
                        <div className='text-9xl font-karantina text-center border-2 border-black pt-24'>
                            <h1>POPULAR PRODUCTS</h1>
                        </div>
                        <div className="border-2 border-black flex flex-col gap-10">
                        <div className='flex flex-row gap-10 place-self-center'>
                            <div className="border-2 border-red-900 w-56 h-80 rounded-tl-[6rem]"></div>
                            <div className="border-2 border-red-900 w-56 h-80 rounded-tr-[6rem]"></div>
                        </div>
                        <div className='flex flex-row gap-10 place-self-center'>
                            <div className="border-2 border-red-900 w-56 h-80 rounded-bl-[6rem]"></div>
                            <div className="border-2 border-red-900 w-56 h-80 rounded-br-[6rem]"></div>
                        </div>
                        </div>
                        <div className='border-2 border-black flex flex-row gap-2 py-24 px-4'>
                            <div className='border-2 border-black w-60 h-80 rounded-tl-3xl'></div>
                            <div className='border-2 border-black w-60 h-80 '></div>
                            <div className='border-2 border-black w-60 h-80 rounded-tr-3xl'></div>
                            <div className='border-2 border-black w-60 h-80 rounded-tl-3xl'></div>
                            <div className='border-2 border-black w-60 h-80 '></div>
                            <div className='border-2 border-black w-60 h-80 rounded-tr-3xl'></div>
                            {/** Carsoul Code Area */}
                        </div>
                    </div>
                    <div className='h-screen '>
                        <div className="relative py-20 flex justify-center">
                            <div className="relative w-96 h-[45rem] bg-[#6C1A1A] rounded-t-full flex items-end justify-center">
                                <div className="w-72 h-[40rem] mb-4 bg-[#d6d3d1] rounded-t-full absolute bottom-0"></div>
                            </div>
                            <div className="absolute bottom-1">
                                <div className="w-48 h-48  rounded-full border border-black bg-[#e6e6e6] mx-auto"></div>
                            </div>
                        </div>
                    </div>
                    <div className='h-screen bg-[#E5D2C2] content-end'>
                        <p className='w-[50rem] font-bebas text-5xl text-center place-self-center mb-16'>If you do not want to leave your office or apartment, collect a pack of the desired flavors.
                            We will deliver it to you: we can in a branded package, or in a gift box.</p>
                    </div>
                    <div className='border-2 border-black h-96'>
                        <img src="" alt="Sample Img" />
                    </div>
                    <div className='border-2 border-black h-screen'>
                        
                    </div>
                                            <div className='p-3'>
                            <ol className='flex flex-row gap-8 font-karantina text-center justify-evenly text-4xl'>
                            <li>INSTAGRAM</li>
                            <li>FACEBOOK</li>
                            <li>WHATSAPP</li>
                            <li>GMAIL</li>
                            </ol>
                        </div>
                    <div className='bg-[#56021F] text-[#FFEAD8] h-max rounded-t-[6rem] flex flex-col gap-4 justify-around'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-7xl font-karantina text-center mt-4'>HAVE A QUESTION? THEN THERE IS AN ANSWER!</h1>
                            <form className="p-8">
    {/* Row 1: Subject & City */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
      <div>
        <label className="block mb-1 text-sm">Subject of address *</label>
        <input
          type="text"
          className="w-full bg-transparent border-b border-white outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">City</label>
        <input
          type="text"
          className="w-full bg-transparent border-b border-white outline-none"
        />
      </div>
    </div>

    {/* Row 2: Name, Phone, Email */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
      <div>
        <label className="block mb-1 text-sm">Your name</label>
        <input
          type="text"
          className="w-full bg-transparent border-b border-white outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Phone</label>
        <input
          type="tel"
          className="w-full bg-transparent border-b border-white outline-none"
        />
      </div>
      <div>
        <label className="block mb-1 text-sm">Email</label>
        <input
          type="email"
          className="w-full bg-transparent border-b border-white outline-none"
        />
      </div>
    </div>

    {/* Row 3: Message */}
    <div>
      <label className="block mb-1 text-sm">Message</label>
      <textarea
        rows="3"
        className="w-full bg-transparent border-b border-white outline-none resize-none"
      ></textarea>
    </div>

    {/* Submit Button */}
    <div className="pt-4">
      <button
        type="submit"
        className="border border-white px-6 py-2 hover:bg-white hover:text-[#A10F2B] transition"
      >
        Send
      </button>
    </div>
  </form>
                        </div>
                        <div className='text-lg font-bebas mb-5'>
                            <h4>@HARIPRIYA DAIRY FARM/ ALL RIGHT RESERVE</h4>
                        </div>
                    </div>
                </section>
        </main>
    </>
);
}

export default App;

