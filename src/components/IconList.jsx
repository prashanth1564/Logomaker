import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { icons, Smile } from 'lucide-react'
import { iconList } from '@/constants/icons';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from 'axios';
  
const BASE_URL='https://logoexpress.tubeguruji.com'
function IconList({selectedIcon}) {
    const [openDialog, setOpenDialog]=useState(false);
    const [pngIconList, setPngIconList]=useState([]);
    const storageValue=JSON.parse(localStorage.getItem('value'));
    const [icon,setIcon]=useState(storageValue?storageValue?.icon:'Smile');

    useEffect(()=>{
        getPngIcons();
    },[]
    )
    // useEffect(() => {
    //     // Fetch icons on component mount
    //     const fetchIcons = async () => {
    //       try {
    //         const response = await axios.get(BASE_URL);
    //         console.log(response.data);
    //         // Handle the fetched icons data here if needed
    //       } catch (error) {
    //         console.error('Error fetching icons:', error);
    //       }
    //     };
    //     fetchIcons();
    //     }, []);
    const Icon=({name,color,size,})=>{
        const LucidIcon=icons[name];
        if(!LucidIcon)
        {
            return ;
        }
        return <LucidIcon color={color} size={size}
        />
    }

    const getPngIcons=()=>{
        axios.get(BASE_URL+'/getIcons.php').then(resp=>{
            console.log(resp.data);
            setPngIconList(resp.data);
    })
    }
  return (
    <div>
        <div >
            <label>Icon</label>
            <div 
                onClick={()=>setOpenDialog(true)}
                className='p-3 cursor-pointer bg-gray-200
                rounded-md w-[50px] my-2 flex items-center justify-center'>
                    {icon.includes('.png')?
                    <img src={BASE_URL+'/png/'+icon } />:
                <Icon name={icon} color={'#000'} size={20}/>
                    }
            </div>
        </div>
        <Dialog open={openDialog}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Pick your Favourite icon</DialogTitle>
                <DialogDescription>

                    <Tabs defaultValue="icon" className="w-[400px]">
                        <TabsList>
                            <TabsTrigger value="icon">Icons</TabsTrigger>
                            <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                        </TabsList>
                        <TabsContent value="icon">

                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 
                        gap-4 overflow-auto h-[400px]'>
                        {iconList.map((icon,index)=>(
                            <div className='border p-3 flex rounded-sm 
                            items-center justify-cente cursor-pointerr'
                            onClick={()=>{selectedIcon(icon);setOpenDialog(false)
                                setIcon(icon)
                            }}
                            >
                                <Icon name={icon} color={'#000'} size={20}/>
                            </div>
                        ))}
                    </div>
                        </TabsContent>
                        <TabsContent value="color-icon">
                        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 
                        gap-4 overflow-auto h-[400px]'>
                        {pngIconList.map((icon,index)=>(
                            <div className='border p-3 flex rounded-sm 
                            items-center justify-cente cursor-pointerr'
                            onClick={()=>{selectedIcon(icon);setOpenDialog(false)
                                setIcon(icon)
                            }}
                            >
                                <img src={BASE_URL+"/png/"+icon}/>
                            </div>
                        ))}
                    </div>
                        </TabsContent>
                    </Tabs>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
</Dialog>

    </div>
  )
}

export default IconList