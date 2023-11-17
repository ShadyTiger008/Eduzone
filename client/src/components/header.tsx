import { Button } from './ui/button';
import { GoSearch } from 'react-icons/go';
import Menu from './header-menu';
import ThemeChanger from './theme-changer';
import { Input } from './ui/input';
import { useState } from 'react';
import { useTheme } from './theme-provider';
import { Link } from 'react-router-dom';

const Header = ({user}: any) => {
  const { theme } = useTheme();
  const [toggleSearch, setToggleSearch] = useState(false);
  const isRegisterPage = false;

  const handleSearch = () => {
    
  }

  return (
    <main className={` ${theme === 'dark' ? 'bg-indigo-500' :'bg-indigo-200'}`}>
      {isRegisterPage ? (
        <div className='p-5 text-center'>
          <Link to='/' className={`text-3xl font-bold text-blue-500 ${theme === 'dark' && 'text-white'}`}>Eduzone</Link>
        </div>
      ) : (
        <div className='p-5 flex flex-row justify-between'>
            <Button
              onClick={ () => { window.location.assign('/') } }
              variant='link'
              className={ `hidden sm:flex text-2xl sm:text-3xl font-bold text-blue-500 ${ theme === 'dark' && 'text-white' }` }>Eduzone</Button>
          {!toggleSearch && (
            <span className={`flex sm:hidden text-2xl sm:text-3xl font-bold text-blue-500 ${theme === 'dark' && 'text-white'}`}>Eduzone</span>
          )}
          <div className='flex flex-row gap-2 sm:gap-8 items-center'>
              {toggleSearch ? (
                <div className='flex flex-row items-center gap-2'>
                  <div className='flex items-center justify-between drop-shadow-lg'>
                    <Input
                      placeholder='Search'
                      className='rounded-l-xl border p-2 outline-none focus:shadow-outline w-72 sm:w-96'
                    />
                    <Button
                      size='icon'
                      variant='secondary'
                      className='bg-white text-black rounded-r-xl px-4 py-2 hover:bg-gray-200 focus:outline-none'
                      onClick={handleSearch}
                    >
                      Go
                    </Button>
                  </div>
                  <GoSearch
                    className='w-6 h-6 cursor-pointer rounded-md'
                    style={{ transition: 'all 0.3s' }}
                    onClick={() => setToggleSearch(!toggleSearch)}
                  />
                </div>
              ) : (
                  <GoSearch className="w-6 h-6 cursor-pointer" onClick={ () => setToggleSearch(!toggleSearch) } /> 
              )}
                <div className='hidden sm:flex flex-row gap-0 sm:gap-5'>
                  <ThemeChanger/>
                  <Menu  user={ user} />
                </div>
              {!toggleSearch && (
                <div className='flex flex-row sm:hidden gap-0 sm:gap-5'>
                  <ThemeChanger/>
                  <Menu user={user}/>
                </div>
              )}
          </div>
        </div>
      )}
    </main>
  )
}

export default Header;