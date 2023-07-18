import { useState } from "react";

export default function Categories() {
const [activeIndex, setActiveIndex] = useState(0);

const categoriesName = ['Все','Вегетарианская', 'Мясные', 'Гриль', 'Острые', 'Закрытые' ]
const onClickCategory = (index)=>{
  setActiveIndex(index);
}
  return (
    <div className="categories">
      <ul>
{categoriesName.map((value, indexItem) => (<li key = {indexItem} onClick = {()=>onClickCategory(indexItem)}  className={activeIndex === indexItem?"active":''}>{value}</li>))}


       
      </ul>
    </div>
  );
}


// тоже что и map:
//        <li onClick = {()=>onClickCategory(0)}  className={activeIndex === 0?"active":''}>Все</li>
//        <li onClick = {()=>onClickCategory(1)} className={activeIndex === 1?"active":''}>Вегетарианская</li>
//        <li onClick = {()=>onClickCategory(2)} className={activeIndex === 2?"active":''}>Мясные</li>
//        <li onClick = {()=>onClickCategory(3)} className={activeIndex === 3?"active":''}>Гриль</li>
//        <li onClick = {()=>onClickCategory(4)} className={activeIndex === 4?"active":''}>Острые</li>
//       <li onClick = {()=>onClickCategory(5)} className={activeIndex === 5?"active":''}>Закрытые</li>