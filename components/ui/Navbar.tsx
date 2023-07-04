import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className='p-4'>
      <div className='flex justify-between items-center'>
        <Image
          src='/v-navbar-icon.png'
          alt='valorant-v-icon'
          width={75}
          height={75}
        />
        <ul className='hidden md:flex md:space-x-4 2xl:space-x-6 text-sm tracking-wide'>
          <li className=''>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/'>About</Link>
          </li>
          <li>
            <Link href='/'>Services</Link>
          </li>
          <li>
            <Link href='/'>Contact</Link>
          </li>
        </ul>
        <div
          className='md:hidden cursor-pointer text-white'
          onClick={toggleNavbar}
        >
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </div>
        <div
          className={`${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          } z-10 bg-primary-dark-variant fixed top-0 right-0 w-48 h-screen transition duration-300 ease-in-out rounded-tl-lg rounded-bl-lg`}
        >
          <div className='flex justify-end'>
            <button
              className='text-white p-2 focuse:outline-none'
              onClick={toggleNavbar}
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <ul>
            <li className='p-4 tracking-wide'>
              <Link href='/'>Home</Link>
            </li>
            <li className='p-4 tracking-wide'>
              <Link href='/'>About</Link>
            </li>
            <li className='p-4 tracking-wide'>
              <Link href='/'>Services</Link>
            </li>
            <li className='p-4 tracking-wide'>
              <Link href='/'>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
