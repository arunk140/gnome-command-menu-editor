import bluetooth from "../icons/bluetooth-active-symbolic.svg"
import shutdown from "../icons/system-shutdown-symbolic.svg"
import wifi from "../icons/network-wireless-signal-excellent-symbolic.svg"
import battery from "../icons/battery-level-80-charging-symbolic.svg"

import './preview.css';
import Icon from "./icon";

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
  let colors = {
    background: "#211f1f",
    foreground: "#dddddd",
  };
  let cssStyle = {
    backgroundColor: colors.background,
    color: colors.foreground,
    fontWeight: "bold",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
    lineHeight: "25px",
    padding: "2px 10px",
  };
  let iconBtn = {
    width: "15px",
    height: "15px",
    margin: "0 5px",
  }
  let invertedIconBtn = {
    ...iconBtn,
    filter: "invert(100%)",
  }
  let flexCenter = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  }
  return (
    <div className="Preview" style={cssStyle}>
      <div className="Left" style={flexCenter}>
        <span className="MenuItem">Workspaces</span>
        <span className="MenuItem">Applications</span>
      </div>
      <div className="Right" style={flexCenter}>
        {(props.commands.icon ? <Icon src={props.commands.icon} alt="commands" style={iconBtn} className="MenuItem CommandMenu" text={props.commands.text?props.commands.text:""}/> : null)}
        <div className="MenuItem" style={flexCenter}>
          <Icon src={wifi} alt="wifi" style={invertedIconBtn}/>
          <Icon src={bluetooth} alt="bluetooth" style={invertedIconBtn}/>
          <Icon src={battery} alt="battery" style={invertedIconBtn}/>
          <Icon src={shutdown} alt="shutdown" style={invertedIconBtn}/>
        </div>
        <span style={{width: "10px"}}/>
        <span className="MenuItem">{getCurrentDateTime()}</span>
      </div>
    </div>
  );
}

export default Preview;
