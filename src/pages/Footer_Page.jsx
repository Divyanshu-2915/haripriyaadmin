import React from 'react'

const FooterPage = () => {
  return (
    <>
        <main>
        <section>
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
                        <div className='text-lg font-bebas mb-5 mx-10'>
                            <h4>@HARIPRIYA DAIRY FARM/ ALL RIGHT RESERVE</h4>
                        </div>
                    </div>
                            </section>
        </main>
    </>
  )
}

export default FooterPage