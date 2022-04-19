import { useEffect, useState } from "react";

const Timing = props => {

    const [timeStr, SetTime] = useState("");

    const MakeTime = () => {
        let hours = Math.floor(props.seconds / 60 / 60 % 60);
        let minutes = Math.floor(props.seconds / 60 % 60);
        let seconds = Math.floor(props.seconds % 60);
        hours = isNaN(hours) ? 0 : hours;
        minutes = isNaN(minutes) ? 0 : minutes;
        seconds = isNaN(seconds) ? 0 : seconds;
        let string = (hours == 0 ? "" : `${ZeroToLeft(hours)}:`) + (ZeroToLeft(minutes)) + ":" + (ZeroToLeft(seconds));
        SetTime(string);
    }

    const ZeroToLeft = (number) => {
        number = number.toString();
        if (number.length == 1) return `0${number}`;
        return number;
    }

    useEffect(() => {
        MakeTime();    
    });

    return(
        <p style={{margin: "0"}}>{timeStr}</p>
    );
}

export default Timing;