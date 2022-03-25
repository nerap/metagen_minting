import React, { useState, useEffect } from "react";
import "./Minter.scss";

export default function Minter( props : any ) {

    
    // const [time, setTime] = useState("");

    // updateTime();
    
    // function zeroPadding(num: any, digit: any) {
    //     var zero = '';
    //     for(var i = 0; i < digit; i++) {
    //         zero += '0';
    //     }
    //     return (zero + num).slice(-digit);
    // }

    // function updateTime() {
    //     var cd = new Date();
    //     var temp = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
    //     setTime(temp);
    // };

    // var interval = setInterval(() => {
    //     updateTime()
    // }, 1000);

    
    return (
        <div className="minter">
            {/* <p className="time">{time}</p>  */}
        </div>
    );
}