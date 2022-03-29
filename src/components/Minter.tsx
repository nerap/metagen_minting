import { getValue } from "@testing-library/user-event/dist/utils";
import { rejects } from "assert";
import React, { useState, useEffect } from "react";
import "./Minter.scss";
import "./Slider.scss";

export default function Minter(props: any) {

    const [clocking, setClocking] = useState(false);
    const [price, setPrice] = useState(54);
    const [mousePos, setMousePos] = useState(0);

    var main: any = document.getElementById("main-input");
    var _x: any = 0;
    var _max_width: any = 0;

    function _onMouseMove(e: any) {
        setMousePos(e.screenX);
    }
    const [time, setTime] = useState("");

    function zeroPadding(num: any, digit: any) {
        var zero = '';
        for (var i = 0; i < digit; i++) {
            zero += '0';
        }
        return (zero + num).slice(-digit);
    }

    while (main != null) {
        _x += main.offsetLeft - main.scrollLeft;
        main = main.offsetParent;
    }

    if (main = document.getElementById("main-input"))
        _max_width = _x + main.offsetWidth;



    function changeValue() {
        if (mousePos < _x)
            setPrice(9)
        else if (mousePos > _max_width)
            setPrice(99)
        else
            setPrice(9 + 99 - (9 + 90 * ((_max_width - mousePos) / (_max_width - _x))))
    }
    useEffect(() => {

        updateTime();

        function updateTime() {
            var cd = new Date();
            var temp = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
            setTime(temp);
        };

        setInterval(() => {
            updateTime()
        }, 1000);
    }, [])





    return (
        <div className="minter">
            {!clocking ?
                <div className="minting" onMouseMove={_onMouseMove}>
                    <div className="clock-within">
                        <p className="phase">PHASE 1</p>
                        <p className="time">{time}</p>
                        {/* <p className="phase">Calculation period</p> */}
                    </div>
                    <p className="ticket-left">Tickets Left: 30000</p>
                    <div className="price-div">
                        <p className="min-price">0.09 ETH</p>
                        <input id="main-input" className="styled-slider slider-progress" type="range" step="1" min="9" max="99" value={price} onChange={changeValue} />
                        <p className="max-price">0.99 ETH</p>
                    </div>
                    <div className="text-number">
                        
                    </div>
                </div>
                :
                <div className="clock">
                    <p className="phase">PHASE 1</p>
                    <p className="time">{time}</p>
                    {/* <p className="phase">Calculation period</p> */}
                </div>
            }
        </div>
    );
}