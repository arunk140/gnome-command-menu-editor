import bluetooth from "../icons/bluetooth-active-symbolic.svg"
import shutdown from "../icons/system-shutdown-symbolic.svg"
import wifi from "../icons/network-wireless-signal-excellent-symbolic.svg"
import battery from "../icons/battery-level-80-charging-symbolic.svg"
import panEnd from "../icons/pan-end-symbolic.svg"
import round from "../icons/mail-mark-unread-symbolic.svg"

import './preview.css';
import { Icon } from "./icon";
import { useRef, useState } from "react";

function Menu(props) {
  let menu = [
    ...props.commands.menu,
    {
      type: "separator",
    },
    {
      title: "Edit Commands",
    },
    {
      title: "Reload",
    }
  ];
  let [menuOpenArrays, setMenuOpenArrays] = useState(Array(menu.length).fill(0));
  let parentIcon = props.parent || {
    top: 0,
    left: 0,
  }
  return (
    <div className="Menu" style={
      {
        top: (parentIcon.bottom + 8) || "0px",
        left: (parentIcon.left + parentIcon.width/2)  || "0px",
      }
    }>
      {menu.map((item, index) => {
        if (item.type === "separator") {
          return <div key={index} className="Separator"/>
        }
        if (!item.title) { return null; }
        let isSubMenu = item.type === "submenu";
        if (isSubMenu && !item.submenu) { return null; }
        let isSubMenuClosed = menuOpenArrays[index] === 0 || menuOpenArrays[index] === false;
        let subMenuIconCls = "IconButton " + (isSubMenuClosed ? " Invert" : " Rotate90");
        let menuCls = "MenuItem" + (isSubMenu ? (isSubMenuClosed ? " Sub" : " Sub Open") : "");
        let onClickAction = (menuItem) => {
          if (!menuItem.command) { return; }
          console.log("clicked", menuItem.command);
        }
        return (
          <div key={index}>
            <div className={menuCls} onClick={() => {
              if (isSubMenu) {
                let newState = !menuOpenArrays[index];
                let newMenuOpenArrays = Array(menu.length).fill(0);
                newMenuOpenArrays[index] = newState;
                setMenuOpenArrays(newMenuOpenArrays);
              } else {
                onClickAction(item);
              }
            }}>
              {(!isSubMenu && item.icon) ? <Icon src={round} alt="icon" className="IconButton Invert"/> : null}
              <span>{item.title}</span>
              {isSubMenu ? <Icon src={panEnd} alt="submenu" className={subMenuIconCls}/> : null}
            </div>
            {isSubMenu ? item.submenu.map((subItem, subIndex) => {
              if (!subItem.title) { return null; }
              return (
                <div key={subIndex} className={"MenuItem SubMenuItem" + (isSubMenuClosed ? " Hidden" : "")} onClick={()=>{onClickAction(subItem)}}>
                  {(subItem.icon) ? <Icon src={round} alt="icon" className="IconButton Invert"/> : null}
                  <span>{subItem.title}</span>
                </div>
              );
            }) : null}
          </div>
        );
      })}
    </div>
  )
}

function getCurrentDateTime() {
  // Format - Sat May 28 9:00 PM
  let date = new Date();
  let day = date.toDateString();
  let time = date.toLocaleTimeString();
  let dayArray = day.split(" ");
  let timeArray = time.split(":");
  let month = dayArray[1];
  let dayVal = dayArray[0];
  let dayNum = dayArray[2];
  let hour = timeArray[0];
  let minute = timeArray[1];
  let amPm = timeArray[2].split(" ")[1];
  let currentDateTime = `${dayVal} ${month} ${dayNum}    ${hour}:${minute} ${amPm}`;
  return <span style={{display:"inline-block", whiteSpace: "pre", userSelect: "none"}}>{currentDateTime}</span>;
}

function Preview(props) {
  let cssStyle = {
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    lineHeight: "25px",
    padding: "2px 10px",
  };
  let flexCenter = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }

  let commandMenuBtnRef = useRef();
  let [menuIconLocation, setMenuIconLocation] = useState(null);
  let onCommandMenuButtonClick = () => {
    let rect = commandMenuBtnRef.current.getBoundingClientRect();
    setMenuIconLocation(rect);
  }

  return (
    <>
      <div className="Preview" style={cssStyle}>
        <div className="Left" style={flexCenter}>
          <span className="topBarMenuItem">Workspaces</span>
          <span className="topBarMenuItem">Applications</span>
        </div>
        <div className="Right" style={flexCenter}>
          {props.commands 
            ? <Icon 
                ref={commandMenuBtnRef}
                onClick={onCommandMenuButtonClick}
                src={props.commands.icon} 
                alt="commands" 
                className="IconButton topBarMenuItem CommandMenu" 
                text={props.commands.text ? props.commands.text : ""}
              /> 
            : null
          }
          <div className="topBarMenuItem" style={flexCenter}>
            <Icon src={wifi} alt="wifi" className="IconButton Invert"/>
            <Icon src={bluetooth} alt="bluetooth" className="IconButton Invert"/>
            <Icon src={battery} alt="battery" className="IconButton Invert"/>
            <Icon src={shutdown} alt="shutdown" className="IconButton Invert"/>
          </div>
          <span style={{width: "10px"}}/>
          <span className="topBarMenuItem">{getCurrentDateTime()}</span>
        </div>
      </div>
      {menuIconLocation ? <Menu commands={props.commands} parent={menuIconLocation}/> : null}
    </>
  );
}

export default Preview;
