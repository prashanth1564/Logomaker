import { Smile } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import ColorPickerController from './ColorPickerController'
import { UpdateStorageContext } from '@/context/UpdateStorageContext'
import IconList from './IconList'


function IconController() {
    const storageValue=JSON.parse(localStorage.getItem('value'));

    const[size,setSize] = useState(storageValue?storageValue?.iconSize:280)
    const[rotate,setRotate] = useState(storageValue?storageValue?.iconRotate:0)
    const[color,setColor] = useState(storageValue?storageValue?.iconColor:'#fff')
    const {updateStorage,setUpdateStorage}=useContext(UpdateStorageContext);
    const [icon,setIcon]=useState(storageValue?storageValue?.icon:'Smile');
    useEffect(()=>{
        // const storageValue=JSON.parse(localStorage.getItem('value'));
        const updatedValue={
            ...storageValue,
            iconSize:size,
            iconRotate:rotate,
            iconColor:color,
            icon:icon
        }
        setUpdateStorage(updatedValue);
        localStorage.setItem('value',JSON.stringify(updatedValue))
    },[size,rotate,color,icon])

  return (
    <div  className=" pb-14">
        {/*<lable>Icon</lable>
         <div className='p-3 cursor-pointer bg-gray-200
        rounded-md w-[50px] my-2 flex items-center justify-center'>
            <Smile/>
        </div>
        <IconList/> */}
        <div>
            <IconList selectedIcon={(icon)=>setIcon(icon)}/>
        </div>
        <div className='py-2'>
            <label className='p-2 flex justify-between items-center'>Size <span>{size} px</span></label>
            <Slider defaultValue={[280]} max={512} step={1} 
                onValueChange={(event)=>setSize(event[0])}
            />
        </div>
        <div className='py-2'>
            <label className='p-2 flex justify-between items-center'>Rotate <span>{rotate}° </span></label>
            <Slider defaultValue={[0]} max={360} step={1} 
                onValueChange={(event)=>setRotate(event[0])}
            />
        </div>
        <div className='py-2'>
            <label className='p-2 flex justify-between items-center'>Icon Color</label>
            <ColorPickerController hideController={true}
            selectedColor={(color)=>setColor(color)}
            />
        </div>
    </div>
  )
}

export default IconController