import React, {useState} from 'react'
import "./Style.css"
import MenuCard from "./MenuCard"
import SolarData from "./SolarData"


// const uniqueList = [
//   ...new Set(Menu.map((curEle)=>{
//   return curEle.category;
// })),"All"
// ]


// console.log(uniqueList)

const Solar = () => {
   const [menuData,setMenuData]=useState(SolarData);
//    const [menu , setmenu]=useState(uniqueList);
//    const filter=(category)=>{
  
//      const updateList = Menu.filter((curElemr)=>{
//       return curElemr.category===category;
//      });
//      setMenuData(updateList);
//      if (category==="All"){
//       setMenuData(Menu)
//     }
//   };

  
  return (
    <>
{/* <Navbar filter={filter} menu={menu} /> */}
  
    <MenuCard menuData={menuData}/>
    </>
  )
}
export default Solar
