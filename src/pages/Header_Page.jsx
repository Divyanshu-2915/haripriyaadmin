import React from 'react';
import { Link } from "react-router-dom";

const HeaderPage = () => {
  return (
    <>
        <main>
                        <header className='border-2 border-black'>
                <nav className=' flex flex-row justify-between px-10 py-3 font-karantina text-3xl'>
                    <div> HARIPRIYA DAIRY FARM</div>
                    <div> 
                        <ol className='flex flex-row gap-20'>
                            <li><Link to='/Home_Page'>HOME </Link></li>
                            <li><Link to='/About_Page'>ABOUT</Link></li>
                            <li><Link to='/Gallery_Page'>GALLERY</Link></li>
                            <li><Link to='/Products_Page'>PRODUCTS</Link></li>
                            <li><Link to='/Footer_Page'>CONTACT</Link></li>
                        </ol>
                    </div>
                </nav>
            </header>
        </main>
    </>
  )
}

export default HeaderPage