// src/pages/HomePage.jsx
import Group1 from "@/assets/img/Group1.png";
import Group3 from "@/assets/img/Group3.png";
import Group7 from "@/assets/img/Group7.png";
import Group8 from "@/assets/img/Group8.png";
const HomePage = () => {
  const borderStyle = {
    borderLeft: "4px solid",
    borderImage: "linear-gradient(180deg, #24B3A3 0%, #2C92B7 100%)",
    borderImageSlice: 1,
    paddingLeft: "30px",
  };
  return (
    <>
      <div className="max-w-full bg-white">
        <div
          className="flex h-[587px] justify-between px-[10%] items-center"
          style={{
            background:
              "linear-gradient(135.86deg, #EAF5FF -2.07%, #E4F5FF 43.32%, #C9E6F9 68.38%, #BFDBF4 92.49%)",
          }}
        >
          <div className="w-1/2">
            <div style={borderStyle}>
              <p className="text-[88px] font-[700] text-[#1A3D93] leading-[94px] tracking-[0.1px] font-sarabun">
                Nova Hospital
              </p>
              <p className="text-[60px] font-[700] text-[#1A3D93] leading-[94px] tracking-[0.1px] font-sarabun whitespace-nowrap">
                International hospital
              </p>
            </div>
            <p className="font-roboto font-[600] text-[#757575] text-[20px] leading-[40px] tracking-[0.1px] mt-10">
              สถานพยาบาลผู้ให้บริการในระดับสากล ครอบคลุมการรักษาสุขภาพทุกด้าน
              โดยแพทย์ผู้เชี่ยวชาญ อุปกรณ์ทางการแพทย์ทันสมัย
            </p>
            <button className="font-roboto font-[600] text-[16px] mt-6 p-2 w-[150px] bg-[#1A3D93] rounded-full text-white">
              ดูข้อมูลเพิ่มเติม
            </button>
          </div>
          <div>
            <img src={Group1} alt="home1" className="w-[430px]" />
          </div>
        </div>
        <div>
          <p className="text-[48px] font-[700] text-[#1A3D93] font-sarabun mt-10 ml-[10%]">
            ข่าวประชาสัมพันธ์
          </p>
          <div className="flex font-sarabun ml-[10%] mt-3 gap-3">
            <button className="bg-[#1A3D93] text-white px-4 py-[5px] rounded-full">
              ทั้งหมด
            </button>
            <button className="bg-white border-[1.5px] border-[#363636] text-[#757575] px-4 py-[5px] rounded-full">
              ข่าวประชาสัมพันธ์
            </button>
            <button className="bg-white border-[1.5px] border-[#363636] text-[#757575] px-4 py-[5px] rounded-full">
              แพ็กเกจและโปรโมชั่น
            </button>
            <button className="bg-white border-[1.5px] border-[#363636] text-[#757575] px-4 py-[5px] rounded-full">
              ประกาศ
            </button>
          </div>
        </div>
        <div className="flex h-[347px] px-[10%] mt-8 w-full justify-between bg-white">
          <div className="flex flex-col w-[30%]">
            <img
              src={Group3}
              alt="home3"
              className="w-full max-h-[200px]"
            />
            <p className="mt-2 font-bold leading-5">
              การตรวจระดับไนตริกออกไซด์ ประเมินความเสี่ยง ภาวะหลอดลมอักเสบ FeNo
              Test
            </p>
            <p className="mt-2 text-[#757575] leading-5">เป็นการวัดระดับไนตริกออกไซด์ในลมหายใจออกทำได้โดยการเป่าลมหายใจออกทางปากช้าๆใส่เครื่องมือใช้เวลาประมาณ 10 ถึง 15 นาที</p>
          </div>
          <div className="flex flex-col w-[30%]">
            <img
              src={Group7}
              alt="home7"
              className="w-full max-h-[200px]"
            />
            <p className="mt-2 font-bold leading-5">
              เปิด walk in ฉีดวัคซีนป้องกันโรคไข้หวัดใหญ่ สำหรับผู้ประกันตน
              สิทธิ์ประกันสังคม
            </p>
            <p className="mt-2 text-[#757575] leading-5">วัคซีนป้องกันโรคไข้หวัดใหญ่ ชนิด 4 สายพันธ์ สำหรับผู้ใหญ่ อายุ 50 ปีขึ้นไป สำหรับผู้ประกันตน สิทธิ์ประกันสังคม</p>
          </div>
          <div className="flex flex-col w-[30%]">
            <img
              src={Group8}
              alt="home8"
              className="w-full max-h-[200px]"
            />
            <p className="mt-2 font-bold leading-5">
              ตรวจสุขภาพ Health Up Celebration (Buy 1 Get 1)
            </p>
            <p className="mt-2 text-[#757575] leading-5">โปรพิเศษ! ฉลองยอดดาวน์โหลด Health Up ครบ 500,000 ดาวน์โหลด ซื้อแพ็กเกจตรวจสุขภาพ Health Up Celebration 1 แพ็กเกจ</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
