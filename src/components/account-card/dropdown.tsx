import React, { MouseEvent, useRef, useState } from 'react';
import Icon from '@material-ui/core/Icon';

export interface Item {
  text: String,
  value: String
};

export interface Props {
  items: Array<Item>,
  onSelectItem: (event: MouseEvent, value: String) => void
};

const Dropdown : React.FC<Props> = ({items = [], onSelectItem = () => {}}) => {
  const [show, setShow] = useState(false);
  const btnRef = useRef(null);

  const handleClickItem = (event : MouseEvent) => {
    setShow(false);
    onSelectItem(event, event.currentTarget.getAttribute("data-value") || "");
  };
  const handleClickMenu = () => {
    setShow(!show);
  };

  return (
  <button ref={btnRef} onClick={handleClickMenu} className="account-card--menu">
    <Icon children="menu" />
      {show ?
        <ul>
          {items.map(el => <li onClick={handleClickItem} data-value={el.value} >{el.text}</li>)}
        </ul>
        : null}
    </button>);
};

export default Dropdown;
