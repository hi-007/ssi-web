// src/pages/HomePage.jsx

import { Col, Row } from "antd";
import Group1 from "@/assets/img/Group1.png"
import Group3 from "@/assets/img/Group3.png"
import Group7 from "@/assets/img/Group7.png"
import Group8 from "@/assets/img/Group8.png"
const HomePage = () => {
  const borderStyle = {
    borderLeft: "4px solid",
    borderImage: "linear-gradient(180deg, #24B3A3 0%, #2C92B7 100%)",
    borderImageSlice: 1,
    paddingLeft: "30px",
  };
  return (
    <>
      <div className="max-w-full">
        <div className="flex h-[587px] justify-between px-[10%] items-center" style={{background: 'linear-gradient(135.86deg, #EAF5FF -2.07%, #E4F5FF 43.32%, #C9E6F9 68.38%, #BFDBF4 92.49%)'}}>
          <div className="w-1/2">
            <div className="text-[88px] font-[700] text-[#1A3D93] leading-[94px] tracking-[0.1px] font-sarabun" style={borderStyle}>
            <p>Digital</p>
            <p>Credentials</p>
            </div>
            <p className="font-roboto font-[600] text-[#757575] text-[20px] leading-[40px] tracking-[0.1px] mt-10">ตราสัญลักษณ์ใบรับรองคุณวุฒิดิจิทัลเป็นสินทรัพย์ดิจิทัลที่ใช้เพื่อถ่ายทอดความสำเร็จหรือคุณวุฒิทางการเรียนรู้สำเร็จหรือคุณวุฒิทางการเรียนรู้</p>
            <button className="font-roboto font-[600] text-[16px] mt-6 p-2 w-[150px] bg-[#1A3D93] rounded-full text-white">ดาวน์โหลดแอป</button>
          </div>
          <div >
          <img src={Group1} alt="home1" className="w-[576px]"/>
          </div>
        </div>
        <div className="flex h-[347px] p-[10%] w-full justify-between items-center bg-white">
          <div className="flex flex-col items-center justify-center">
          <img src={Group3} alt="home3"/>
          <p>1. ดาวน์โหลดแอปลงบนมือถือ</p>
          </div>
          <div className="flex flex-col items-center justify-center">
          <img src={Group7} alt="home7"/>
          <p>2. เพิ่มตราสัญลักษณ์ใบรับรองคุณวุฒิดิจิทัล</p>
          </div>
          <div className="flex flex-col items-center justify-center">
          <img src={Group8} alt="home8"/>
          <p>3. ใช้ตราสัญลักษณ์ใบรับรองคุณวุฒิดิจิทัล</p>
          </div>
            
        </div>
      </div>
    </>
  );
};

export default HomePage;
