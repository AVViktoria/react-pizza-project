

export default function Categories({value, onChangeCategory, onChangeSort}) {

  const categoriesName = [
    "All",
    "Vegetarian",
     "Meat",
     "Grill",
    "Spicy",
    "Mix",
  ];

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

