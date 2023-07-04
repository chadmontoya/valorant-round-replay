import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className='py-4'>
      <div className='container mx-auto flex justify-center'>
        <ul className='flex space-x-6 text-sm tracking-wide'>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/about'>About</Link>
          </li>
          <li>
            <Link href='/services'>Services</Link>
          </li>
          <li>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
