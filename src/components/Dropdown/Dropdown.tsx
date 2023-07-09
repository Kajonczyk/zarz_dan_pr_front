import Select, {Props} from "react-select";
import "./Dropdown.style.scss";
import {City, CityKey, FuelType} from "../../types";

interface DropdownItemData {
  value: string,
  label: string,
}

interface DropdownProps {
  onChange: (e: City | { value: string, label: string }) => void;
  options: City[] | { value: FuelType, label: string }[],
  label?: string | JSX.Element,
  hasError?: boolean,
  value?: { value: FuelType, label: string },
}

const getStyle = (hasError: boolean) => ({
  control: (base: any, { isFocused }: { isFocused: boolean }) => ({
    ...base,
    border: hasError ? "1px solid #e83f68" : isFocused ? "2px solid #86cfc1" : "1px solid black",
    borderRadius: isFocused ? "4px 4px 0 0" : "4px",
    height: "50px",
    width: "300px",
    outline: 0,
    boxShadow: "none",
    "&:hover": {
      boxShadow: 0
    }
  }),
  option: (base: any, { isSelected }: { isSelected: boolean }) => ({
    ...base,
    backgroundColor: isSelected ? "rgba(0, 0, 0, 0.08);" : "white",
    color: "black",
    minHeight: "35px",
    "&:hover": {
      backgroundColor: isSelected ? "rgba(0, 0, 0, 0.08);" : "rgba(0, 0, 0, 0.04)"
    }
  }),
  menu: (base: any) => ({
    ...base,
    boxShadow: "none",
    marginTop: -2,
    border: "2px solid #86cfc1",
    borderRadius: 0,
    marginBottom: -2

  }),
  listBox: (base: any) => ({
    marginTop: 0
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (base: any) => ({ ...base, zIndex: 9999 })
});

export const Dropdown = ({
                           onChange,
                           options,
                           label,
                           hasError,
                           required = true,
                           placeholder,
                           value,
                           ...rest
                         }: DropdownProps) => {

  return <label>
      <span>{label}</span>
    <Select
      styles={getStyle(!!hasError)}
      onChange={onChange}
      isSearchable={true}
      placeholder={placeholder || ""}
      options={options}
      value={value}
      menuPortalTarget={document.body}
      menuPosition={"fixed"}
      className={"dropdown"}
      maxMenuHeight={200}
      {...rest}

    />
  </label>;
};