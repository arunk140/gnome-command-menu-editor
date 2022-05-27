export default function Icon(props) {
    return (
        <div style={{display:"flex", height: "23px", alignItems: "center", justifyContent: "space-evenly"}} className={props.className}>
            <img src={props.src} alt={props.alt} style={props.style} />
            {props.text ? <span>{props.text}</span> : null}
        </div>
    )
}