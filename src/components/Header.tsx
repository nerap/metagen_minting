import Discord from "../assets/social_media/ic1.png";
import Instagram from "../assets/social_media/ic2.png";
import Twitter from "../assets/social_media/ic3.png";
import Logo from "../assets/metagen_asset/logo.png";
import "./Header.scss";

export default function Header(props: any) {

    return (
        <div className="header-area">
            <div className="header">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="header-wrp">
                                <div className="header-logo">
                                    <a href="/#">
                                        <img src={Logo} alt="" />
                                    </a>
                                </div>
                                <div className="header-social">
                                    <a
                                        href="https://discord.com/metagenio"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img src={Discord} alt="" />
                                    </a>
                                    <a
                                        href="https://twitter.com/metagen_io"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img src={Twitter} alt="" />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/metagen.io"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <img src={Instagram} alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}