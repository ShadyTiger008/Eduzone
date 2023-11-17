import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { BiMenuAltRight } from 'react-icons/bi';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';
import Sidebar from './sidebar-menu';

const Menu = ({user}) => {
    const { theme } = useTheme();
  return (
    <div className={`${theme === 'dark' && "text-white"}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size='icon' className={`${theme === 'dark' && "text-white"}`}>
            <BiMenuAltRight className={`w-8 h-8 text-blue-500 ${theme === 'dark' && "text-white"}`}/>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className='text-white'>User Menu</SheetTitle>
          </SheetHeader>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default Menu