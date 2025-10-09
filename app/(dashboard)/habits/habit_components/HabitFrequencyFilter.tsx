
type frequencyFilterProps={
    setFrequencyFilter:(value:string)=>void;
    frequencyFilter:string;
    defaultFrequency:string[];

}


const HabitFrequencyFilter = ({setFrequencyFilter, frequencyFilter, defaultFrequency}:frequencyFilterProps) => {

//const defaultFrequency = ["All", "Daily", "Weekly", "Monthly"];

  return (
    <>
      {/* Frequency Filter */}
      <div className="hidden lg:flex gap-1 items-center">
        <label
          htmlFor="frequency_filter"
          className="text-xs font-light text-greyText"
        >
          Frequency
        </label>
        <select
          name="frequency"
          id="frequency_filter"
          className="border border-lightGreyBorder rounded-md bg-BG px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlueBorder focus:border-blue-500 "
          onChange={(e) => setFrequencyFilter(e.target.value)}
          value={frequencyFilter}
        >
          {defaultFrequency.map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>
    </>
  );
};
export default HabitFrequencyFilter;
