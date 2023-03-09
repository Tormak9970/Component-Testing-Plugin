import { ButtonItem, Dropdown, DropdownOption, Focusable } from "decky-frontend-lib";
import { useState, VFC, Fragment, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

/**
 * The properties for the MultiSelectedOption component.
 * @param option This entry's option.
 * @param onRemove The function to run when the user deselects this option.
 */
type MultiSelectedOptionProps = {
  option: DropdownOption,
  onRemove: (option: DropdownOption) => void
}

/**
 * A component for multi select dropdown options.
 * @param props The MultiSelectedOptionProps for this component.
 * @returns A MultiSelectedOption component.
 */
const MultiSelectedOption:VFC<MultiSelectedOptionProps> = ({ option, onRemove }) => {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>{option.label}</div>
      <ButtonItem onClick={() => onRemove(option)} icon={<FaTimes />} tooltip={`Remove ${option.label}`} />
    </div>
  );
}

/**
 * The properties for the MultiSelect component.
 * @param options The list of all possible options for the component.
 * @param selected The list of currently selected options.
 * @param maxOptions Optional prop to limit the amount of selectable options.
 */
export type MultiSelectProps = {
  options: DropdownOption[],
  selected: DropdownOption[],
  maxOptions?: number;
}

/**
 * A component for multi select dropdown menus.
 * @param props The MultiSelectProps for this component.
 * @returns A MultiSelect component.
 */
export const MultiSelect:VFC<MultiSelectProps> = ({ options, selected, maxOptions }) => {
  const [ sel, setSel ] = useState(selected);
  const [ available, setAvailable ] = useState(options.filter((opt) => !selected.includes(opt)));
  const [ dropLabel, setDropLabel ] = useState("Select an option");

  useEffect(() => {
    setAvailable(options.filter((opt) => !sel.includes(opt)));
    setDropLabel(available.length == 0 ? "No more options" : (maxOptions && selected.length == maxOptions ? "Max selected" : "Select an option"));
  }, [sel]);

  const onRemove = (option: DropdownOption) => {
    selected = sel.splice(sel.indexOf(option), 1);
    setSel(selected);
  }

  const onChange = (option: DropdownOption) => {
    selected = [...sel, option];
    setSel(selected);
  }

  return (
    <Focusable>
      <div style={{ width: "100%", marginBottom: "14px" }}>
        {sel.map((option) => <MultiSelectedOption option={option} onRemove={onRemove} />)}
      </div>
      <div className="multi-selected__options">
        <Dropdown rgOptions={available} selectedOption={dropLabel} onChange={onChange} strDefaultLabel={dropLabel} focusable={true} />
      </div>
    </Focusable>
  );
}