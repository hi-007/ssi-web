// src/pages/ProfilePage.jsx
import { useState } from "react";

import { Col, Row, Card, Modal, Space, QRCode } from "antd";
import Group6 from "../../assets/img/Group6.png";

import { FaFacebook, FaTwitter, FaWallet } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import Card2 from "../../components/Card2";

const ProfilePageVerify = () => {
  const [selectedMenu, setSelectedMenu] = useState("profile");

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      id: 1,
      icon: <FaWallet size={24} />,
      title: "ขอผ่าน Verifiable Credentials",
      description:
        "สแกน QR Code ผ่าน Wallet Pass Application เพื่อเพิ่ม Verifiable Credentials",
    },
    {
      id: 2,
      icon: <RiGovernmentLine size={24} />,
      title: "เข้ามาติดต่อที่ส่วนกลาง",
      description: "เข้ามาติดต่อเจ้าหน้าที่ที่สำนักงานใหญ่",
    },
    {
      id: 3,
      icon: <FaFacebook size={24} />,
      title: "ติดต่อผ่านช่องทาง Facebook",
      description: "ติดต่อผ่านเจ้าหน้าที่ทาง Facebook",
    },
    {
      id: 4,
      icon: <FaTwitter size={24} />,
      title: "ติดต่อผ่านช่องทาง Twitter",
      description: "ติดต่อผ่านเจ้าหน้าที่ทาง Twitter",
    },
  ];

  return (
    <>
      <div className="mx-auto max-w-screen-2xl sm:h-auto md:h-[70px] px-10">
        <div className="">
          <div className="text-profile p-4">
            <Row gutter={16}>
              <Col span={24}>
                <Card className="rounded-3xl w-full mb-4">
                  <p className="text-lg font-semibold"> ขอสติกเกอร์ที่จอดรถ</p>
                </Card>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Card className="rounded-3xl w-full">
                  <div className="flex flex-col items-center px-6">
                    <img src={Group6} alt="Logo" className="h-58" />
                  </div>
                  <div>
                    <div className="pt-4 ">
                      <h2 className="text-xl font-semibold text-gray-900">
                        รายละเอียดเพิ่มเติม
                      </h2>
                    </div>

                    <div className="pt-4">
                      <p>ข้อควรปฏิบัติ</p>
                      <p className="text-gray-400">
                        1. “ห้ามทำซ้ำหรือปลอมแปลงสติกเกอร์ติดรถยนต์
                        ผู้ฝ่าฝืนถือเป็นความผิดอย่างร้ายแรง ตามข้อบังคับฯ
                        ว่าด้วยวินัย พ.ศ. 2546
                        หากมีรถยนต์หลายคันให้ใช้วิธีการย้ายสติกเกอร์ไปยังรถที่ใช้งาน
                        เข้า – ออก
                      </p>
                    </div>
                    <div className="pt-4">
                      <p>หมายเหตุ:</p>
                      <p className="text-gray-400">
                        วันจันทร์ – ศุกร์ หลังเวลา 16.30 น. และวันหยุด วันเสาร์
                        – อาทิตย์ (วันหยุดนักขัตฤกษ์) สามารถจอดได้ที่
                        พื้นที่อาคารจอดรถเท่านั้น หากมีข้อสงสัย ติดต่อได้ที่
                        งานรักษาความปลอดภัย สำนักงานบริหารอาคารและสถานที่ โทร.
                        02-470-8207
                      </p>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={18}>
                <Card title="" bordered={false} className="rounded-3xl w-full">
                  <p className="text-lg font-semibold">
                    {" "}
                    ต้องการขอผ่านช่องทางใด
                  </p>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cards.map((card) => (
                      <Card2
                        key={card.id}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                        isSelected={selectedCard === card.id}
                        onClick={() => setSelectedCard(card.id)}
                      />
                    ))}
                  </div>
                </Card>
                <div class="flex justify-end mt-4">
                  <div>
                    <div>
                      <button
                        type="button"
                        class="w-32 mr-2 py-2.5 px-6 text-sm border border-[#1A3D93] rounded-full shadow-xs bg-white font-light text-body text-[#1A3D93] transition-all duration-500 hover:bg-gray-50"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={showModal}
                      type="button"
                      className="py-2.5 px-6 text-sm rounded-full bg-[#1A3D93] text-white cursor-pointer text-body font-light text-center shadow-xs transition-all duration-500 hover:bg-indigo-700"
                    >
                      สร้าง Verifiable Credentials
                    </button>
                  </div>
                </div>
                <div className="mt-4"></div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        title=""
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div className="flex flex-col items-center justify-center text-center text-profile">
            <p>กรุณาสแกน QR Code บทแอพ Wallet Pass Application </p>
            <p className="text-[#8F90A6]">
              สแกน QR Code เพื่อเพิ่ม Verifiable Credentials
            </p>
          </div>
        }
        width={370}
      >
        <div className="flex flex-col items-center justify-center text-center mt-8 mb-6">
          <Space>
            <QRCode type="svg" value="https://ant.design/" />
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePageVerify;
