

type CategoryFilterProps={
    setCategoryFilter: (value:string)=>void;
    categoryFilter:string;
    defaultCategories:string[];

}

const HabitCategoryFilter = ({setCategoryFilter, categoryFilter, defaultCategories}:CategoryFilterProps)=>{

    return(
        
        <div className="hidden lg:flex gap-1 items-center">

            <label
              htmlFor="category_filter"
              className="text-xs font-light text-greyText"
            >
              Category
            </label>
            <select
              name="category"
              id="category_filter"
              className="border border-lightGreyBorder rounded-md bg-BG px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlueBorder focus:border-blue-500 "
              onChange={(e) => setCategoryFilter(e.target.value)}
              value={categoryFilter}
            >
              {defaultCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
        </div>

        )

};
export default HabitCategoryFilter;