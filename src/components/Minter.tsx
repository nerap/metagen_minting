import React, { useState, useEffect } from "react";
import "./Minter.scss";
import "./Slider.scss";

import Plus from "../assets/metagen_asset/plus.png"
import Minus from "../assets/metagen_asset/minus.png"

import Eth from "../assets/metagen_asset/eth.png"
import Ticket from "../assets/metagen_asset/tickets.png"


let number_temp: any = 0;

export default function Minter(props: any) {

    const [clocking, setClocking] = useState(false);
    const [tickets, setTickets] = useState(1);
    const [price, setPrice] = useState(0.540 * tickets);
    const [mousePos, setMousePos] = useState(0);

    const minPrice : number = 0.09;
    const maxPrice : number = 0.99;
    const maxTickets : number = 10;
    const ticketsLeft : number = 30000;

    var main: any = document.getElementById("main-input");
    var number: any = document.getElementById("number-price");
    var _x: any = 0;
    var _max_width: any = 0;
    function _onMouseMove(e: any) {
        setMousePos(e.screenX);
    }
    const [time, setTime] = useState("");

    function zeroPadding(num: any, digit: any) {
        var zero = '';
        for (var i = 0; i < digit; i++)
            zero += '0';
        return (zero + num).slice(-digit);
    }

    while (main != null) {
        _x += main.offsetLeft - main.scrollLeft;
        main = main.offsetParent;
    }

    main = document.getElementById("main-input");
    if (main)
        _max_width = _x + main.offsetWidth;

    function changeValue() 
    {
        if (mousePos - 6 <= _x)
            setPrice(minPrice)
        else if (mousePos + 6 >= _max_width)
            setPrice(maxPrice)
        else
            setPrice(minPrice + maxPrice - (minPrice + (maxPrice - minPrice) * ((_max_width - mousePos) / (_max_width - _x))))
        number.value = ""
    }

    function onInputNumber(e: any) {
        var num: any = 0;
        var regex: RegExp = new RegExp("^[0-9]+[.]?[0-9]*?$");

        if (number.value.match(regex) == null)  {
            if (number.value.length === 0)
                number.value = ""
            else
                number.value = number_temp;
            return;
        }
        num = number.value.match(regex).map(function (v: any) { return parseFloat(v); });
        num = num[0];
        
        if (num.toString().split(".").length === 2)
            number.value = (num.toString().split(".")[1].length <= 3 ? num : num.toFixed(3))
        if (number.value == 0 || (number.value >= minPrice * tickets && number.value <= maxPrice * tickets))
            number_temp = number.value;
        else
            number.value = number_temp;
    }

    useEffect(() => {
        updateTime();
        setClocking(false);
        function updateTime() {
            var cd = new Date();
            var temp = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
            setTime(temp);
        };
        setInterval(() => {
            updateTime()
        }, 1000);
    }, [])

    function addTickets() {
        if (tickets < maxTickets)
            setTickets(tickets + 1)
    }

    function removeTickets() {
        if (tickets > 1)
            setTickets(tickets - 1)
    }

    return (
        <div className="minter">
            {!clocking ?
                <div className="minting" onMouseMove={_onMouseMove}>
                    <div className="clock-within">
                        <p className="phase">PHASE 1</p>
                        <p className="time">{time}</p>
                    </div>
                    <div className="div-ticket-left">
                        <p className="ticket-left">{ticketsLeft}</p>
                        <img className="ticket-left-symbol" src={Ticket}/>
                    </div>
                    <div className="price-div">
                        <p className="min-price">{(minPrice * tickets).toFixed(3)} <img src={Eth}/></p>
                        <input id="main-input" className="custom-slider" type="range" step="1" min={(minPrice * tickets) * 100} max={(maxPrice * tickets) * 100} value={(price * tickets) * 100} onChange={changeValue} />
                        <p className="max-price">{(maxPrice * tickets).toFixed(3)} <img src={Eth}/></p>
                    </div>
                    <div className="text-number">
                        <input type="text" id="number-price" placeholder={(price * tickets).toFixed(3)} onInput={onInputNumber} onClick={() => { number.value = (price * tickets).toFixed(3); number_temp = number.value; }} />
                        <div className="plus-minus">
                            <div className="plus" ><img onClick={addTickets} src={Plus} alt="" /></div>
                            <div className="minus"><img onClick={removeTickets} src={Minus} alt="" /></div>
                        </div>
                        <p className="current-ticket">{tickets}</p>
                        <img className="ticket-symbol" src={Ticket}/>
                    </div>
                    <div className='button-div-minter'>
                        <div id="button-mint" className='button-main' style={{ width: "auto", position: "relative", bottom: "1%"}} >
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                            BUY {tickets} TICKETS
                        </div>
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