import React, { memo } from "react";

type CategoriesPropsType = {
  value: number;
  onChangeCategory: (i: number)=> void;
}
  const categoriesName = ["All", "Vegetarian", "Meat", "Grill", "Spicy", "Mix"];

  // memo  - not redraws categories (не перерисовывает категории)
const Categories:React.FC<CategoriesPropsType> = memo(({ value, onChangeCategory })=> {

  
  return (
    <div className="categories">
      <ul>
        {categoriesName.map((categoryName, indexItem) => (
          <li
            key={indexItem}
            onClick={() => onChangeCategory(indexItem)}
            className={value === indexItem ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
})
export default Categories;