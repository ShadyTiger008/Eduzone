import React from 'react';
import { useTheme } from './theme-provider';

const Featured = () => {
  const { theme } = useTheme();
  return (
    <main className={`bg-gray-200 rounded-xl p-5 shadow-md ${theme === 'dark' && 'bg-slate-700 text-white'}`}>
      <h2 className='text-2xl font-semibold mb-3'>Featured</h2>
      <div className='rounded-xl overflow-hidden'>
        <img src="/featured.png" alt="Featured" className='w-full rounded-xl shadow-sm' />
        <p className='text-sm p-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos recusandae deserunt debitis sapiente nobis dignissimos mollitia vel iusto quam quisquam!</p>
      </div>
    </main>
  );
};

export default Featured;
