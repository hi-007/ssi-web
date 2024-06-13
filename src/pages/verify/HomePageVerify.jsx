// src/pages/HomePage.jsx
import verifybg from "@/assets/img/vertex-home.png";
import verify1 from "@/assets/img/verify-1.png";
import verify2 from "@/assets/img/verify-2.png";
import verify3 from "@/assets/img/verify-3.png";
import { useNavigate } from "react-router-dom";
const HomePageVerify = () => {
  const navigate = useNavigate();
  const borderStyle = {
    borderLeft: "5px solid",
    borderImage: "linear-gradient(180deg, #7F2F14 0%, #EA5921 100%)",
    borderImageSlice: 1,
    paddingLeft: "30px",
  };
  return (
    <>
      <div className="max-w-full">
        <div
          className="flex h-[587px] justify-between pl-[10%] items-center gap-10"
          style={{
            background:
              "linear-gradient(117.6deg, #FFFFFF -32.93%, #E7C9CC 34.02%, #E77455 106.53%, #B86E75 106.54%)",
          }}
        >
          <div className="w-1/2">
            <div
              className="text-[88px] font-[700] text-[#DB4700] leading-[94px] tracking-wider font-sarabun"
              style={borderStyle}
            >
              <p>Vertex</p>
              <p>Building</p>
            </div>
            <p className="font-roboto font-[600] text-[#757575] text-[20px] leading-[40px] tracking-[0.1px] mt-10">
              องค์กรพัฒนาระบบ Car Parking เริ่มก่อตั้งเมื่อปี พ.ศ. 2534
              เพื่ออำนวยความสะดวกในการจอดรถในสถานที่ต่างๆ
            </p>
            <button className="font-roboto text-[16px] mt-6 p-2 w-[100px] bg-[#DB4700] rounded-full text-white">
              เริ่มต้น
            </button>
          </div>
          <div>
            <img src={verifybg} alt="home1" className="w-full h-[587px]" />
          </div>
        </div>
        <div className="flex justify-center bg-white pt-8 font-sarabun font-[700] text-[32px]">
          บริการ
        </div>
        <div className="flex h-[300px] px-[10%] w-full justify-between gap-10 items-center bg-white">
          <div
            className="w-[412px] h-[234px] border-[1px] border-[#E6E6E6] rounded-[10px] flex flex-col gap-4 justify-center items-center hover:bg-[#FFF2EB] hover:border-[#A33E19] cursor-pointer"
            style={{ boxShadow: "-2px 4px 12px 0px #D9D9D933" }}
            onClick={()=>{
              navigate("/profileverify");
            }}
          >
            <img src={verify1} alt="home3" />
            <p className="font-sarabun text-[20px] font-[700]">ระบบการลา</p>
          </div>
          <div
            className="w-[412px] h-[234px] border-[1px] border-[#E6E6E6] rounded-[10px] flex flex-col gap-4 justify-center items-center hover:bg-[#FFF2EB] hover:border-[#A33E19] cursor-pointer"
            style={{ boxShadow: "-2px 4px 12px 0px #D9D9D933" }}
          >
            <img src={verify2} alt="home7"/>
            <p className="font-sarabun text-[20px] font-[700]">ขอเบิกอุปกรณ์</p>
          </div>
          <div
            className="w-[412px] h-[234px] border-[1px] border-[#E6E6E6] rounded-[10px] flex flex-col gap-4 justify-center items-center hover:bg-[#FFF2EB] hover:border-[#A33E19] cursor-pointer"
            style={{ boxShadow: "-2px 4px 12px 0px #D9D9D933" }}
          >
            <img src={verify3} alt="home8" />
            <p className="font-sarabun text-[20px] font-[700]">ขอเอกสาร</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePageVerify;
