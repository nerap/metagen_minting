import './Footer.scss';
import React from 'react';
import Brand from '../assets/metagen_asset/brands.png'

function Footer() {

    return (
        <div className='footer-main'>
            <img src={Brand} alt="" className="brand-img" />
        </div>
    );
  }

export default Footer;