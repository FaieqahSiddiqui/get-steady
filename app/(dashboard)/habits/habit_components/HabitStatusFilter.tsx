//import { defaultHabitStatuses as defaultStatuses} from "@/app/constants/types";

type StatusFilterProps = {
  setHabitStatusFilter: (value: { label: string; value: boolean | null }) => void;
  habitStatusFilter: { label: string; value: boolean | null };
  defaultStatuses: { label: string; value: boolean | null }[];
};



const HabitStatusFilter =({setHabitStatusFilter, habitStatusFilter,defaultStatuses}:StatusFilterProps)=>{

    return(
        <div className="hidden lg:flex gap-1 items-center">
            <label
              htmlFor="status_filter"
              className="text-xs font-light text-greyText"
            >
              Status
            </label>
            <select
              name="status"
              id="status_filter"
              className="border border-lightGreyBorder rounded-md bg-BG px-1 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-lightBlueBorder focus:border-blue-500 "
              onChange={(e) => {
                const selected = defaultStatuses.find(
                  (s) => s.label === e.target.value
                );
                if (selected) setHabitStatusFilter(selected);
              }}
              value={habitStatusFilter.label}
            >
              {defaultStatuses.map((s) => (
                <option key={s.label} value={s.label}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

    )
};
export default HabitStatusFilter;