import { useDispatch, useSelector } from "react-redux";
// import { increment } from "../../features/counterSlice";
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { signin } from "../../features/registerSlice";
import Logo3 from '../../assets/logo4.png'
import img1 from '../../assets/image2.jpeg'
// const files = import.meta.globEager('/assets/css/*.css')
// import 'assets/style.css'
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min";


export default function Login() {
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errormsg,setErrormsg]=useState("");
  const [signinRequestStatus,setSigninRequestStatus]=useState('idle');
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }
  const handleLogin =async (e) => {
    console.log("hann",e,"jjjdata",formData)
      e.preventDefault();
        try {
           setIsLoading(true)
          setSigninRequestStatus('pending')
          const response = await dispatch(signin(formData)).unwrap();
          setFormData({
          email: '',
          password: ''})
         // console.log(response.token,"resppppp")
          localStorage.setItem("token",response.token)
          localStorage.setItem('_i',response._id)
          localStorage.setItem('_n',response.name)
          localStorage.setItem('_e',response.email)
          localStorage.setItem('_m',response.mobile)
           navigate('/udashboard')
        } catch (err) {
          console.log(err,"errrrr")
          //setSigninRequestStatus('idle')
          // console.error(err.response.data.errors)
          setErrormsg(err.response.data.errors)
          // if(err.response.data.info){
          //   navigate('/smaintance')
          // }
        } finally {
          setSigninRequestStatus('idle')
          setIsLoading(false)
        }
    };

    const myStyles = {
      backgroundImage: "url('/assets/images/banner2.png')",
      backgroundSize: 'cover',
      color: 'white',
      textAlign: 'center',
      padding: '100px 0',
      // Adjust other styles as needed
  };
  return (
    <>

<div style={{backgroundColor:"#1A1929"}}>

            <div id="preloader" className="inso-preloader">
                <span className="loader"></span>
            </div>

            <div className="o-hidden">
                <div className="offcanvase">
                    <div className="offcanvase__menu">
                        <div className="offcanvase__menu--content">
                            <div className="offcanvase__menu--top mb-30 d-flex justify-content-between">
                                <div className="offcanvase__menu--logo">
                                    <div className="offcanvase__logo">
                                        <a href="index.html">
                                            <img src="assets/images/logo.png" alt="insoand" />
                                        </a>
                                    </div>
                                </div>
                                <div className="offcanvase__menu--close-icon">
                                    <div className="close-menu pointer"><i className="fa-sharp fa-regular fa-xmark"></i></div>
                                </div>
                            </div>
                            <div className="offcanvase-menu o-hidden mb-30"></div>
                            <div className="offcanvase__button mb-30">
                                <a className="login" href="login.html">Login</a>
                                <a className="signup" href="register.html">Sign Up</a>
                            </div>
                            <div className="offcanvase__menu--contact center">
                                <h4 className="offcanvase__menu--contact-title mb-20">Contact Us</h4>
                                <div className="offcanvase__menu--contact-text">
                                    <ul>
                                        <li><a href="tel:+8801755202096">+8801755202096</a></li>
                                        <li><a href="mailto:contact@insomniacafe.org">contact@insomniacafe.org</a></li>
                                    </ul>
                                    <p>Kushtia Sador, Kushtia, Bangladesh</p>
                                </div>
                            </div>
                            <div className="offcanvase__menu--social">
                                <ul className="d-flex justify-content-center gap-3">
                                    <li className="social-item"><a href="#" target="_blank"><i
                                        className="fa-brands fa-facebook"></i></a></li>
                                    <li className="social-item"><a href="#" target="_blank"><i className="fa-brands fa-twitter"></i></a>
                                    </li>
                                    <li className="social-item"><a href="#" target="_blank"><i className="fa-brands fa-line"></i></a>
                                    </li>
                                    <li className="social-item"><a href="#" target="_blank"><i
                                        className="fa-brands fa-linkedin"></i></a></li>
                                </ul>
                            </div>
                            <div className="thanks-giving mt-5">
                                <img src="assets/img/thanks.jpg" alt="thank you" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas__overlay"></div>

            <header className="header ">
                <div className="container mt-20 mb-20">
                    <div className="row">
                        <div className="header__wrapper ">
                            <div className="header__logo">
                                <a href="index.html"><img src="assets/images/logo.png" style={{ maxWidth: '250px' }}
                                    alt="Insoand Logo" /></a>
                            </div>
                            <div className="header__menu">
                                <nav id="offcanvase__menu">
                                    {/* <ul>
                                            <li className="has-children"><a href="index.html">Home</a>
                                                <ul className="submenu">
                                                    <li><a href="index.html">Home One</a></li>
                                                    <li><a href="index-2.html">Home Two</a></li>
                                                    <li><a href="index-3.html">Home Three</a></li>
                                                    <li><a href="index-4.html">Home Four</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="about.html">About</a></li>
                                            <li className="has-children"><a href="portfolio.html">Portfolio</a>
                                                <ul className="submenu">
                                                    <li><a href="portfolio.html">Portfolio</a></li>
                                                    <li><a href="portfolio-details.html">Portfolio Details</a></li>
                                                </ul>
                                            </li>
                                            <li className="has-children"><a href="#">Page</a>
                                                <ul className="submenu">
                                                    <li className="has-children"><a href="#">Service</a>
                                                        <ul className="submenu">
                                                            <li><a href="service.html">Service</a></li>
                                                            <li><a href="service-details.html">Service Details</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="has-children"><a href="team.html">Team</a>
                                                        <ul className="submenu">
                                                            <li><a href="team.html">Team</a></li>
                                                            <li><a href="team-details.html">Team Details</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="has-children"><a href="shop.html">Shop</a>
                                                        <ul className="submenu">
                                                            <li><a href="shop.html">Shop</a></li>
                                                            <li><a href="shop-details.html">Shop Details</a></li>
                                                            <li><a href="cart.html">Cart</a></li>
                                                            <li><a href="checkout.html">checkout</a></li>
                                                        </ul>
                                                    </li>

                                                    <li className="has-children"><a href="career.html">Career</a>
                                                        <ul className="submenu">
                                                            <li><a href="career.html">Career</a></li>
                                                            <li><a href="career-details.html">Career Details</a></li>
                                                        </ul>
                                                    </li>
                                                    <li><a href="testimonial.html">Testimonial</a></li>
                                                    <li><a href="pricing.html">Pricing</a></li>
                                                    <li><a href="faq.html">Faq</a></li>
                                                    <li><a href="404.html">404</a></li>
                                                </ul>
                                            </li>
                                            <li className="has-children"><a href="blog.html">Blog</a>
                                                <ul className="submenu">
                                                    <li><a href="blog.html">Blog</a></li>
                                                    <li><a href="blog-left.html">Blog Left Sidebar</a></li>
                                                    <li><a href="blog-details.html">Blog Details</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html">Contact</a></li>
                                        </ul>  */}
                                </nav>
                            </div>
                            <div className="header__right">
                                <div className="header__right--btn">
                                    <a className="login" href="login.html">Login</a>
                                    <a className="signup" href="register.html">Sign Up</a>
                                </div>
                                <button className="menu-icon d-md-block d-lg-none"><i className="fa-sharp fa-solid fa-bars"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

                <div className="container absolute-top-5">
                    <div className="row">
                        <div className="col-12">
                            <div className="hero__text">
                                <div className="hero__vector">
                                    <img src="assets/img/animated-icon/graph.png" alt="graph" />

                                    <img src="assets/img/animated-icon/star-icon.png" alt="graph" />
                                </div>
                                <div className="hero__text--content relative">
                                    <h2>
                                        Streamline Your Wealth <br />
                                        with
                                        {/* <!-- <span>Mars</span>Connecting --> */}
                                        <img src="assets/images/logo2.png" width="590px" />
                                    </h2>
                                    {/* <!-- <div className="hero__video" data-sal="slide-left" data-sal-delay="400"
                                                            data-sal-easing="ease-out-back">
                                                            <div className="video-img">
                                                                <img src="assets/img/hero/team.jpg" alt=""/>
                                                                    <div className="video-play" data-video-id="u31qwQUeGuM"><i className="fa-solid fa-play"></i>
                                                                    </div>
                                                            </div>
                                                        </div> --> */}
                                </div>

                                <p>Your website is often the first point of contact with potential customers. Expert web
                                    designers can create user-friendly, visually appealing websites that reflect your brand and
                                    convert visitors into customers.
                                </p>
                                <div className="hero__button">
                                    <a href="#" className="rounded-btn">Get in Touch <span><i
                                        className="fa-sharp fa-light fa-arrow-right-long"></i></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           

            <div className="hero-slider slider">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="slider__wrapper">

                                <div className="slider__single">
                                    <img src="assets/images/banner.png" alt="slider" />
                                    <ul className="slider--content">
                                        <li><img src="assets/img/hero/customer-1.jpg" alt="1" /></li>
                                        <li><img src="assets/img/hero/customer-2.jpg" alt="1" /></li>
                                        <li><i className="fa-solid fa-plus"></i></li>
                                        <li>
                                            <span className=""><b>1K+</b> <br />Happy Clients</span>
                                        </li>
                                    </ul>
                                </div>
                                {/* <!-- <div className="slider__single">
                                    <img src="assets/img/hero/customer-service-cute-guy-grey-suit-with-computer-headset-smiling-showing-good-gesture.jpg"
                                        alt="slider">
                                        <ul className="slider--content">
                                            <li><img src="assets/img/hero/customer-1.jpg" alt="1"></li>
                                            <li><img src="assets/img/hero/customer-2.jpg" alt="1"></li>
                                            <li><i className="fa-solid fa-plus"></i></li>
                                            <li>
                                                <span className=""><b>2K+</b> <br>Download+</span>
                                            </li>
                                        </ul>

                                </div> --> */}
                                {/* <!-- <div className="slider__single">
                                    <img src="assets/img/hero/modern-equipped-computer-lab.jpg" alt="slider">
                                        <ul className="slider--content">
                                            <li><img src="assets/img/hero/customer-1.jpg" alt="1"></li>
                                            <li><img src="assets/img/hero/customer-2.jpg" alt="1"></li>
                                            <li><i className="fa-solid fa-plus"></i></li>
                                            <li>
                                                <span className=""><b>20+</b> <br>Projects Running</span>
                                            </li>
                                        </ul>
                                </div> --> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="information pt-100 pb-100">
                <div className="information__wrapper animated-marque">
                    <div className="information__content">
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>

                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>

                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>
                        <div className="single-information">
                            <div className="icon"><img src="assets/img/animated-icon/star.png" alt="star" /></div>
                            <h6> Your <span>Trust</span>, Our <span>Priority</span>: Crafting a Future Together.</h6>
                        </div>

                    </div>
                </div>
            </div>

            <section className="service pt-100 pb-70">
                <div className="container">
                    <div className="section">
                        <div className="section__content">
                            <h6 className="section__sub">Which Services We Provide</h6>
                            <h3 className="section__title">Lets See what we provides</h3>
                        </div>
                        <div className="view__all">
                            <a href="service.html">View All Services</a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/graph.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Collaborative Initiatives</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/software.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Community Support</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/product.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Crowdsourced Solutions</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/ui.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Resource<br /> Sharing</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/brand.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Communication Focus</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/marketing.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Social<br />
                                                Networking</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/graphic.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Financial<br /> Security</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-xl-3 col-md-6">
                            <div className="service__single">
                                <div className="service__single--box">
                                    <div className="icon"><img src="assets/img/icon/uiux.svg" alt="" /></div>
                                    <div className="service__single--box-meta">
                                        <div className="meta-text">
                                            <a href="#">Financial Independence</a>
                                        </div>
                                        <div className="meta-linkbtn">
                                            <a href="#" className="link-btn"><i
                                                className="fa-sharp fa-light fa-arrow-right-long"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="container mt- mb-20">
                <div className="card bg-dark p-3 shadow">
                    <div className="row">
                        <div className="col-lg-6"><br /><br />
                            <h3 className="text-white text-center mt-5">Sign In</h3>

                            <div className="login__form input__form p-4">
                                <form action="#">

                                    <div className="form-group">
                                        <input type="email" className="form-control" id="exampleInputEmail1"
                                            placeholder="Enter Your Email" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="exampleInputPassword11"
                                            placeholder="Enter Your Password" />
                                    </div>


                                    <div className="login-button register-button">
                                        <button type="submit" className="main-btn">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="assets/images/img1.png" />
                        </div>
                    </div>
                </div>
            </div>


            <div style={myStyles}>
                <h5>📱✨ Exciting news ahead! 🚀 Stay tuned for our iOS and Android app! 🎉</h5>
            </div>




            {/* <div className="scroll active-scroll">
                <svg className="scroll__circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                    <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
                        style="transition: stroke-dashoffset 10ms linear 0s; stroke-dasharray: 307.919px, 307.919px; stroke-dashoffset: 244.073px;">
                    </path>
                </svg>
            </div> */}



        </div >


{/* 
      <div classNameName="mt-12 text-center">
            <h2 classNameName="text-sm text-gray-500">📱✨ Exciting news ahead! 🚀 Stay tuned for our iOS and Android app! 🎉</h2>
        </div>
        <div classNameName="relative mx-auto w-full max-w-md bg-dark px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10 border-2 border-blue-500 ">

    
    <div classNameName="w-full">
        <div classNameName="text-center">
            <h1 classNameName="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p classNameName="mt-2 text-gray-500">Sign in below to access your account</p>
        </div>
        <div classNameName="mt-5">
            <form onSubmit={handleLogin}>
            <p classNameNameName="text-red-700 text-center">{errormsg}</p>

                <div classNameName="relative mt-6">
                    <input type="email" id="email" value={formData.email} onChange={handleChange} name="email" placeholder="Email Address" classNameName="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autocomplete="NA" required />
                    <label for="email" classNameName="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
                </div>
                <div classNameName="relative mt-6">
                    <input type="password" autoComplete="off" id="password" value={formData.password} onChange={handleChange} name="password" placeholder="Password" classNameName="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" required />
                    <label for="password" classNameName="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
                </div>
                <div classNameName="my-6">
                    <button type="submit" classNameName="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none hover:bg-blue-800">{isLoading ? 'Processing...' : 'Sign in'}</button>
                </div>
                <p classNameName="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                    <a href="/register"
                        classNameName="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"> Sign
                        up
                    </a>.
                </p>
            </form>
        </div>
    </div>
</div>
     */}

    {/* ddddddddddddddddddd */}
        {/* <div classNameNameName="min-h-screen bg-gray-100 py-6 flex flex-col justify-center  sm:py-6">
  <div classNameNameName="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      classNameNameName="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    </div>
    <div classNameNameName="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    <form onSubmit={handleLogin}>
      <div classNameNameName="max-w-md mx-auto">
        <div>
          <h1 classNameNameName="text-2xl font-semibold">Login</h1> */}
           {/* <h1>{count1}</h1> */}
          {/* <button onClick={()=>dispatch(increment())}>add</button> */}
        {/* </div>
      
        <div classNameNameName="divide-y divide-gray-200">
          <div classNameNameName="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            <p classNameNameName="text-red-700">{errormsg}</p>
            <div classNameNameName="relative">
              <input autoComplete="off" id="email" value={formData.email} onChange={handleChange} name="email" type="text" classNameNameName="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
              <label htmlFor="email" classNameNameName="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
            </div>
            <div classNameNameName="relative">
              <input autoComplete="off" id="password" value={formData.password} onChange={handleChange} name="password" type="password" classNameNameName="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
              <label htmlFor="password" classNameNameName="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div classNameNameName="relative">
              <button type="submit" classNameNameName="bg-cyan-500 text-white rounded-md px-2 py-1">{isLoading ? 'Processing...' : 'Submit'}</button>
            </div>
          </div>
        </div>
      </div>
    </form>

      <div classNameNameName="w-full flex justify-center">
        
        <a classNameNameName="text-indigo-700 hover:text-pink-700 text-sm float-right" href="/register">Create Account</a> */}
        {/* <a classNameNameName="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">Forgot Password?</a><br></br> */}

      {/* </div>

    </div>
  </div>
</div> */}
    </>
   
    
  );
}
