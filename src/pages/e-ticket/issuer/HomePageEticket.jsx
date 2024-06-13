// src/pages/HomePage.jsx
import EticketHome1 from "@/assets/img/EticketHome1.png";
import EticketHome2 from "@/assets/img/EticketHome2.png";
import EticketHome3 from "@/assets/img/EticketHome3.png";
import Carousel from "../../../components/Carousel";
const HomePageEticket = () => {
  const borderStyle = {
    borderLeft: "4px solid",
    borderImage: "linear-gradient(180deg, #24B3A3 0%, #2C92B7 100%)",
    borderImageSlice: 1,
    paddingLeft: "30px",
  };
  return (
    <>
      <div className="max-w-full bg-white">
        <div className="h-auto w-full"
        >
          <Carousel/>
        </div>
        <div className="h-[590px]">
        <div className="flex justify-between items-center">
          <p className="text-[40px] font-[700] font-sarabun mt-10 ml-[10%]">
            แนะนำ
          </p>
          <p className="text-[16px] text-[#1A3D93] font-[700] font-sarabun mt-10 mr-[10%]">
            ทั้งหมด
          </p>
        </div>
        <div className="flex h-[347px] px-[10%] mt-8 w-full justify-between bg-white">
          <div className="flex flex-col w-[30%]">
            <img
              src={EticketHome1}
              alt="home3"
              className="w-full"
            />
            <p className="mt-4 font-semibold leading-5">
            Bangkok Nights: A Symphony Under the Stars
            </p>
            <p className="mt-2 text-[#757575] leading-5">2 ธ.ค. 2566 - 7 ก.ย. 2567</p>
            <button className="mt-5 bg-[#7A66D6] py-2 rounded-full text-white">ซื้อบัตร</button>
          </div>
          <div className="flex flex-col w-[30%]">
            <img
              src={EticketHome2}
              alt="home7"
              className="w-full"
            />
            <p className="mt-4 font-semibold leading-5">
            Eclipse: Bangkok's Night Concert Extravaganza
            </p>
            <p className="mt-2 text-[#757575] leading-5">29 มิ.ย. 2567 - 30 มิ.ย. 2567</p>
            <button className="mt-5 bg-[#7A66D6] py-2 rounded-full text-white">ซื้อบัตร</button>
          </div>
          <div className="flex flex-col w-[30%]">
            <img
              src={EticketHome3 }
              alt="home8"
              className="w-full"
            />
            <p className="mt-4 font-semibold leading-5">
            Bangkok After Dark: A Night of Music and Celebration
            </p>
            <p className="mt-2 text-[#757575] leading-5">15 มิ.ย. 2567 - 16 มิ.ย. 2567</p>
            <button className="mt-5 bg-[#7A66D6] py-2 rounded-full text-white">ซื้อบัตร</button>
          </div>
        </div>
        <div className="flex">
          
        </div>
        </div>
        
      </div>
    </>
  );
};

export default HomePageEticket;
