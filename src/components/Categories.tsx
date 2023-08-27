
import React from "react";
type CategoriesPropsType = {
  value: number;
  onChangeCategory: any;

}

const Categories:React.FC<CategoriesPropsType> = ({ value, onChangeCategory })=> {
  const categoriesName = ["All", "Vegetarian", "Meat", "Grill", "Spicy", "Mix"];

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
}
export default Categories;