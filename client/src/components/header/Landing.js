import "../../App.scss";
import Slider from "../slider/Slider";
import CardSlider from "../cardslider/CardSlider";
import NavBar from "./NavBar";
import Info from "../info/Info";
import { ChangeTitle } from "../../utils/GenralFunctions";
import ReviewSlider from "./ReviewSlider";
import { Link } from "react-router-dom";
import Image from "../../assets/aabecd8a_34c0.png.avif";
const Landing = () => {
  ChangeTitle("Shopo | Shop Online");
  return (
    <div className="landing">
      {/* <NavBar /> */}
      <Slider />
      {/* <div className="promo-container">
        <div className="promo-wraper">
          <div className="promo-1">
            <img
              src="https://m2.alothemes.com/safira/media/wysiwyg/alothemes/demo1/banner-01.jpg"
              alt=" promo-1"
            />
            <div className="promo-detail">
              <div className="promo-first">Minimal Chair</div>
              <div className="promo-title">
                Melbourne
                <br /> Armchair
              </div>
              <div className="promoshop">
                Shop Now <AiFillPlayCircle className="promo-icon" />
              </div>
            </div>
          </div>
          <div className="promo-2">
            <img
              src="https://m2.alothemes.com/safira/media/wysiwyg/alothemes/demo1/banner-02.jpg"
              alt="promo2"
            />
            <div className="promo-detail">
              <div className="promo-first">New Design</div>
              <div className="promo-title">
                Dinning
                <br /> Chair
              </div>
              <div className="promoshop">
                Shop Now <AiFillPlayCircle className="promo-icon" />
              </div>
            </div>
          </div>
          <div className="promo-3">
            <img
              src="https://m2.aloth emes.com/safira/media/wysiwyg/alothemes/demo1/banner-03.jpg"
              alt="promo3"
            />
            <div className="promo-detail">
              <div className="promo-first">New Offers</div>
              <div className="promo-title">
                Special <br />
                Tabe Lamp
              </div>
              <div className="promoshop">
                Shop Now <AiFillPlayCircle className="promo-icon" />
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="info">
        <h2 className="producttitle">Featured Products</h2>
        <div className="discription">See What's Trending Right Now</div>
      </div>
      <CardSlider type={"Featured"} />
      {/* <div className="single-promo">
        <img
          src="https://m2.alothemes.com/safira/media/wysiwyg/alothemes/demo1/banner-04.jpg"
          alt=" promo-1"
        />
        <div className="promo-detail detail-single">
          <div className="single-first">Black Friday </div>
          <div className="single-title">
            On Desk Lapms, Floor Lamps and more.
          </div>
        </div>
      </div> */}

      <div className="promo-container">
        <div className="middle-promo">
          <img
            className="promo-img"
            src="https://images.lululemon.com/is/image/lululemon/4061_WQ3%20performance%20bottoms%20MRun_SeptWk2_HP_5_HalfMasonry_EN"
            alt=" promo-1"
          />
          <div className=" detail-middle">
            <div className="promo-title">Run the course.</div>
            <div className="promo-detail">
              Sweat less, stride further in men's running essentials that keep
              pushing you forward.
            </div>
            <button className="promo-btn">SHOP MEN'S JOGGERS</button>
          </div>
        </div>
        <div className="middle-promo">
          <img
            className="promo-img"
            src="https://images.lululemon.com/is/image/lululemon/4061_WQ3%20performance%20bottoms%20MRun_SeptWk2_HP_6_HalfMasonry_EN"
            alt="promo2"
          />
          <div className="detail-middle">
            <div className="promo-title ">Stay focused.</div>
            <div className="promo-detail">
              Go one step beyond with zero distractions in the anti-chafe,
              anti-odour Metal Vent Tech Shirt.
            </div>
            <button className="promo-btn">SHOP MEN'S TOPS</button>
          </div>
        </div>
      </div>
      <div className="info">
        <h2 className="producttitle">BestSelling Products</h2>
        <div className="discription">See The Most Popular Products</div>
      </div>
      <CardSlider type={"bestSelling"} />
      <Link to="/about">
        <div className="mission-wraper">
          <img src={Image} className="mission-image" />
          <div className="mission-text">
            <h1>We're on a Mission To Clean Up the Industry</h1>
            <p>Read about our progress in our latest Impact Report.</p>
            <button>Learn More</button>
          </div>
        </div>
      </Link>
      <ReviewSlider />
      {/* <div className="middlepart">
      <div className="leftpart">
        <h1 className="middletitle">MiddleTitle</h1>
        <div className="middledesc">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin velit
          quam, fermentum nec justo semper, euismod eleifend orci. Maecenas ut
          ultricies metus. Phasellus lobortis tincidunt nunc ac consectetur.
          Vestibulum tempus viverra lacinia. Integer quis tortor nunc
        </div>
        <div className="middlebtn">Find out more</div>
      </div>
      <div className="rightpart">
        <img
          className="middleimg"
          src="https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?ixlib=rb-1.2.1&ix
        id=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bnljfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=900&q=60"
        alt=""
        />
      </div>
    </div> */}
      <Info />
    </div>
  );
};

export default Landing;
