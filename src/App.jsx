import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import Header from './components/Header'
import SideNav from './components/SideNav'
import BackgroundController from './components/BackgroundController'
import IconController from './components/IconController'
import LogoPreview from './components/LogoPreview'
import { UpdateStorageContext } from './context/UpdateStorageContext'



function App() {
  const [count, setCount] = useState(0)
  const[selectedIndex, setSelectedIndex] = useState(0);
  const[updateStorage,setUpdateStorage]=useState({})

  const [downloadIcon,setDownloadIcon] =useState()
  return (
    <UpdateStorageContext.Provider value={{updateStorage,setUpdateStorage}}>
      <div>
      <Header DownloadIcon={setDownloadIcon}/>
      <div className='w-64 fixed'>
        <SideNav selectedIndex={(value)=>setSelectedIndex(value)}/>
      </div>
      <div className="ml-64 grid grid-cols-1 md:grid-cols-6 fixed">
        <div className='md:col-span-2 border h-screen shadow-sm p-5
        overflow-auto'>
          {selectedIndex==0 ?
          <IconController/> :
          <BackgroundController/>
          }
        </div>
        <div className='md:col-span-3 '>
          <LogoPreview downloadIcon={downloadIcon}/>
        </div>
        <div class="p-2 md:col-span-1">
          Ads Banner
          <img src='/kcbl971c.png' alt='Ads Section' className='rounded-xl' />
        </div>
      </div>
      </div>
      </UpdateStorageContext.Provider>
  )
}

export default App



// import { useState } from 'react';
// import './App.css';
// import { Button } from "@/components/ui/button";
// import { Download } from 'lucide-react';
// import Header from './components/Header';
// import SideNav from './components/SideNav';
// import BackgroundController from './components/BackgroundController';
// import IconController from './components/IconController';
// import LogoPreview from './components/LogoPreview';
// import { UpdateStorageContext } from './context/UpdateStorageContext';
// import { ThemeProvider } from './components/theme-provider'; // Import ThemeProvider

// function App() {
//   const [count, setCount] = useState(0);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [updateStorage, setUpdateStorage] = useState({});
//   const [downloadIcon, setDownloadIcon] = useState();

//   return (
//     <ThemeProvider>
//       <UpdateStorageContext.Provider value={{ updateStorage, setUpdateStorage }}>
//         <div>
//           <Header DownloadIcon={setDownloadIcon} />
//           <div className='w-64 fixed'>
//             <SideNav selectedIndex={(value) => setSelectedIndex(value)} />
//           </div>
//           <div className="ml-64 grid grid-cols-1 md:grid-cols-6 fixed">
//             <div className='md:col-span-2 border h-screen shadow-sm p-5 overflow-auto'>
//               {selectedIndex === 0 ? <IconController /> : <BackgroundController />}
//             </div>
//             <div className='md:col-span-3 '>
//               <LogoPreview downloadIcon={downloadIcon} />
//             </div>
//             <div>
//               ads banner
//             </div>
//           </div>
//         </div>
//       </UpdateStorageContext.Provider>
//     </ThemeProvider>
//   );
// }

// export default App;
