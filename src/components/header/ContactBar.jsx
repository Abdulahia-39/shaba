import loactionsvg from '../../assets/icons/location.svg';
import phonesvg from '../../assets/icons/phone.svg';
import mailsvg from '../../assets/icons/mail.svg';

const ContactBar = () => {
    return (
        <div className="hidden md:flex justify-around items-center bg-none text-white p-4 h-15">
            <div className="flex-wrap gap-4 lg:flex lg:items-center lg:justify-center">
                <a href="" className="flex items-center gap-2">
                    <img src={loactionsvg} alt="location icon" />
                    <span>Borama, Awdal Somaliland</span>
                </a>
                <a href="" className="flex items-center gap-2">
                    <img src={phonesvg} alt="phone icon" />
                    <span>+252 63 4456478</span>
                </a>
                <a href="" className="flex items-center gap-2">
                    <img src={mailsvg} alt="mail icon" />
                    <span>shabaco@gmail.com</span>
                </a>
            </div>
            <div className="flex gap-6">
                <a href="">
                    <i className="fab fa-facebook-f text-white text-2xl"></i>
                </a>
                <a href="">
                    <i className="fab fa-linkedin-in text-white text-2xl"></i>
                </a>
                <a href="">
                    <i className="fab fa-youtube text-white text-2xl"></i>
                </a>
                <a href="">
                    <i className="fab fa-twitter text-white text-2xl"></i>
                </a>
            </div>
        </div>
    )
}

export default ContactBar;