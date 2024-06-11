// src/pages/ProfilePage.jsx
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import {
  Col,
  Row,
  Card,
  Modal,
  Space,
  QRCode,
  Form,
  Input,
  DatePicker,
  Upload,
  Button,
  Select,
  ConfigProvider,
} from "antd";
import {
  createInvitation,
  createPresentation,
  deleteConnection,
  getRevealedAttrs,
  sendPresentationRequest,
} from "@/utils/agent";
import { ImageConfig } from "../../config/ImageConfig";
import th_TH from "antd/es/locale/th_TH";
import { UploadOutlined } from "@ant-design/icons";
import Group6 from "../../assets/img/Group6.png";
import Avatarprofile from "@/assets/img/Avatarprofile.jpg";
import { FaFacebook, FaTwitter, FaWallet } from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import Card2 from "../../components/Card2";
import Verifiable from "../../assets/img/Verifiable.png"; // Import your PNG image
import Center from "../../assets/img/Center.png"; // Import your PNG image
import Facebook from "../../assets/img/Facebook.png"; // Import your PNG image
import X from "../../assets/img/X.png"; // Import your PNG image
import approvedAnimationGif from "@/assets/img/success.gif";
const { TextArea } = Input;
const { Option } = Select;
const ProfilePageVerify = () => {
  const AgentUrl = import.meta.env.VITE_VERIFIER_API;
  const AgentWss = import.meta.env.VITE_VERIFIER_WSS;
  const AgentKey = import.meta.env.VITE_VERIFIER_KEY;
  const CredDefId = import.meta.env.VITE_TOURIST_GUIDE_LICENSE_CREDDEFS_ID;
  const { lastMessage } = useWebSocket(`${AgentWss}?apikey=${AgentKey}`);
  const [start, setStart] = useState(true);
  const [index, setIndex] = useState(0);
  const [qrLink, setQrLink] = useState("");
  const [connection_id, setConnectionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [abandon, setAbandon] = useState(false);
  const [leaveType, setLeaveType] = useState();
  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    console.log('current index =', index);
  },[index])

  const Predicates = [];

  const getStart = async () => {
    setStart(false);
    setIndex(0);
    invite();
  };

  const invite = async () => {
    setLoading(true);
    const inv = await createInvitation(AgentUrl, AgentKey);
    setConnectionId(inv["connection_id"]);
    setQrLink(inv["invitation_url"]);
    console.log('invitation_url', qrLink);
    setLoading(false);
    setIndex((i) => i + 1);
  };

  const requestPresentation = async () => {
    setLoading(true);
    const proofName = "Verify Drug Prescription";
    const presentation = createPresentation(
      CredDefId,
      proofName,
      connection_id,
      RequiredAttributes,
      Predicates
    );
    //console.log(JSON.stringify(presentation))
    await sendPresentationRequest(AgentUrl, AgentKey, presentation);
    //console.log(JSON.stringify(presentResult))
    setIndex((i) => i + 1);
  };

  const goBackStep0 = async () => {
    setStart(true);
    setFormValues(null);
    setIndex(0);
    // If go back to first step, should remove invition to avoid abandon connection
    await deleteConnection(AgentUrl, AgentKey, connection_id);
  };

  const finish = () => {
    setLoading(false);
    setIndex(2);
  };

  const cancel = () => {
    setLoading(false);
    goBackStep0();
  };

  const requestDeclined = () => {
    setAbandon(true);
    setIndex(2);
    setLoading(false);
  };

  const credentialVerified = async (pres_ex_id) => {
    //setLoading(true)
    const revealed = await getRevealedAttrs(AgentUrl, AgentKey, pres_ex_id);
    setFormValues(revealed);
    //setIndex(2)
    setLoading(false);
    setIndex((i) => i + 1);
  };

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
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (lastMessage !== null) {
        // Checking webhook event from verifier agent.
        const data = JSON.parse(lastMessage.data);
        console.log('ping data', data);

        // Accessing nested properties using data.x.y pattern
        const topic = data?.topic;
        const state = data?.payload?.state;
        const connectionId = data?.payload?.connection_id;
        const presentationExchangeId = data?.payload?.presentation_exchange_id;

        if (topic === "connections") {
            if (state === "active" && connection_id === connectionId) {
                console.log("Try to request presentation.");
                requestPresentation();
            }
        }
        if (topic === "present_proof" && connection_id === connectionId) {
            if (state === "request_sent") {
                // Do something if request sent.
            }
            if (state === "abandoned") {
                requestDeclined();
            }
            if (state === "verified") {
                credentialVerified(presentationExchangeId);
            }
        }
    }
}, [start, index, qrLink, lastMessage]);


  const cards = [
    {
      id: 1,
      icon: <img src={Verifiable} alt="Verifiable" className="h-6 w-6" />,
      title: "ขอผ่าน Verifiable Credentials",
      description:
        "สแกน QR Code ผ่าน Wallet Pass Application เพื่อเพิ่ม Verifiable Credentials",
    },
    {
      id: 2,
      icon: <img src={Center} alt="Center" className="h-6 w-6" />,
      title: "เข้ามาติดต่อที่ส่วนกลาง",
      description: "เข้ามาติดต่อเจ้าหน้าที่ที่สำนักงานใหญ่",
    },
    {
      id: 3,
      icon: <img src={Facebook} alt="Facebook" className="h-6 w-6" />,
      title: "ติดต่อผ่านช่องทาง Facebook",
      description: "ติดต่อผ่านเจ้าหน้าที่ทาง Facebook",
    },
    {
      id: 4,
      icon: <img src={X} alt="X" className="h-6 w-6" />,
      title: "ติดต่อผ่านช่องทาง Twitter",
      description: "ติดต่อผ่านเจ้าหน้าที่ทาง Twitter",
    },
  ];

  const showConfirm = () => {
    confirm({
      title: "ยืนยันการออกจากระบบ",
      icon: <ExclamationCircleFilled />,
      content: "คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?",
      okText: "ยืนยัน",
      cancelText: "ยกเลิก",
      className: "text-profile",
      onOk() {
        navigate("/loginPageIssue"); // Adjust this path according to your routing setup
      },
      onCancel() {
        console.log("Cancel");
      },
      okButtonProps: {
        className: "bg-blue-900 hover:bg-blue-700 text-white",
      },
      cancelButtonProps: {
        className: "bg-gray-100 hover:bg-gray-300 text-gray-700",
      },
    });
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const customLocale = {
    ...th_TH,
    DatePicker: {
      ...th_TH.DatePicker,
      lang: {
        ...th_TH.DatePicker.lang,
        yearFormat: "BBBB",
        cellYearFormat: "BBBB",
      },
    },
  };

  const [fileList, setFileList] = useState([]);

  const fileAdd = (e, statename, setstatename) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...statename, newFile];
      setstatename(updatedList);
    }
  };

  const fileRemove = (file, statename, setstatename) => {
    const updatedList = [...statename];
    updatedList.splice(statename.indexOf(file), 1);
    setstatename(updatedList);
  };

  return (
    <>
      <div className="mx-auto max-w-screen-2xl sm:h-auto md:h-[70px] px-10">
        <div className="">
          <div className="text-profile p-4">
            <Row gutter={16}>
              <Col span={24}>
                <Card className="rounded-3xl w-full mb-4">
                  <p className="text-[24px] font-sarabun font-[700]">
                    ระบบการลา
                  </p>
                </Card>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={6}>
                <Card className="rounded-3xl w-full">
                  <div className="flex flex-col items-center px-6">
                    <img src={Avatarprofile} alt="Logo" className="h-58" />
                  </div>
                  <div>
                    <div className="text-center mt-4">
                      <h2 className="text-xl font-semibold text-gray-900">
                        หัสนัย ณ พัทลุง
                      </h2>
                      <p className="text-gray-400">hassanai@vertex.com</p>
                      <span className="bg-[#1A3D93] text-white text-sm px-3 py-1 rounded-full mt-2 inline-block">
                        ผู้ดูแลระบบ
                      </span>
                    </div>
                    <div className=" mt-4">
                      <ul className="flex-col gap-1 flex w-full">
                        <li>
                          <a
                            href="javascript:;"
                            onClick={() => setSelectedMenu("profile")}
                            className={`p-3 rounded-lg items-center inline-flex w-full ${
                              selectedMenu === "profile" ? "bg-blue-200" : ""
                            } hover:bg-gray-100`}
                          >
                            <div className="h-5 items-center gap-3 flex">
                              <div className="relative">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <g fill="none" stroke="currentColor">
                                    <path
                                      stroke-linejoin="round"
                                      d="M4 18a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
                                    />
                                    <circle cx="12" cy="7" r="3" />
                                  </g>
                                </svg>
                              </div>
                              <h2 className="text-gray-500 text-sm font-medium leading-snug">
                                ข้อมูลของฉัน
                              </h2>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="javascript:;"
                            onClick={() => setSelectedMenu("settings")}
                            className={`p-3 rounded-lg items-center inline-flex w-full ${
                              selectedMenu === "settings" ? "bg-[#C6E3F8]" : ""
                            } hover:bg-gray-100`}
                          >
                            <div className="h-5 items-center gap-3 flex">
                              <div className="relative">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 1024 1024"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M600.704 64a32 32 0 0 1 30.464 22.208l35.2 109.376c14.784 7.232 28.928 15.36 42.432 24.512l112.384-24.192a32 32 0 0 1 34.432 15.36L944.32 364.8a32 32 0 0 1-4.032 37.504l-77.12 85.12a357 357 0 0 1 0 49.024l77.12 85.248a32 32 0 0 1 4.032 37.504l-88.704 153.6a32 32 0 0 1-34.432 15.296L708.8 803.904c-13.44 9.088-27.648 17.28-42.368 24.512l-35.264 109.376A32 32 0 0 1 600.704 960H423.296a32 32 0 0 1-30.464-22.208L357.696 828.48a352 352 0 0 1-42.56-24.64l-112.32 24.256a32 32 0 0 1-34.432-15.36L79.68 659.2a32 32 0 0 1 4.032-37.504l77.12-85.248a357 357 0 0 1 0-48.896l-77.12-85.248A32 32 0 0 1 79.68 364.8l88.704-153.6a32 32 0 0 1 34.432-15.296l112.32 24.256c13.568-9.152 27.776-17.408 42.56-24.64l35.2-109.312A32 32 0 0 1 423.232 64H600.64zm-23.424 64H446.72l-36.352 113.088l-24.512 11.968a294 294 0 0 0-34.816 20.096l-22.656 15.36l-116.224-25.088l-65.28 113.152l79.68 88.192l-1.92 27.136a293 293 0 0 0 0 40.192l1.92 27.136l-79.808 88.192l65.344 113.152l116.224-25.024l22.656 15.296a294 294 0 0 0 34.816 20.096l24.512 11.968L446.72 896h130.688l36.48-113.152l24.448-11.904a288 288 0 0 0 34.752-20.096l22.592-15.296l116.288 25.024l65.28-113.152l-79.744-88.192l1.92-27.136a293 293 0 0 0 0-40.256l-1.92-27.136l79.808-88.128l-65.344-113.152l-116.288 24.96l-22.592-15.232a288 288 0 0 0-34.752-20.096l-24.448-11.904L577.344 128zM512 320a192 192 0 1 1 0 384a192 192 0 0 1 0-384m0 64a128 128 0 1 0 0 256a128 128 0 0 0 0-256"
                                  />
                                </svg>
                              </div>
                              <h2 className="text-gray-500 text-sm font-medium leading-snug">
                                ตั้งค่า
                              </h2>
                            </div>
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={showConfirm}
                            className={`p-3 rounded-lg items-center inline-flex w-full ${
                              selectedMenu === "logout" ? "bg-blue-200" : ""
                            } hover:bg-gray-100`}
                          >
                            <div className="h-5 items-center gap-3 flex">
                              <div className="relative">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="1.5"
                                    d="M13.496 21H6.5c-1.105 0-2-1.151-2-2.571V5.57c0-1.419.895-2.57 2-2.57h7M16 15.5l3.5-3.5L16 8.5m-6.5 3.496h10"
                                  />
                                </svg>
                              </div>
                              <h2 className="text-gray-500 text-sm font-medium leading-snug">
                                ออกจากระบบ
                              </h2>
                            </div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
              </Col>

              <Col span={18}>
                <ConfigProvider locale={customLocale}>
                  <Form
                    form={form}
                    onFinish={onFinish}
                    initialValues={{ remember: true }}
                    layout="vertical"
                    className="text-form"
                    size="large"
                  >
                    <Card
                      title=""
                      bordered={false}
                      className="rounded-3xl w-full"
                    >
                      <p className="text-lg font-semibold">แบบฟอร์มการขอลา</p>

                      {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
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
                  </div> */}
                      <Form.Item
                        name="leaveType"
                        label="ประเภทการลา"
                        rules={[
                          {
                            required: true,
                            message: "โปรดกรอกข้อมูล",
                          },
                        ]}
                        className="mt-5"
                      >
                        <Select placeholder="เลือกประเภทการลา" 
                          onChange={(value)=>{
                            setLeaveType(value);
                          }}>
                          <Option value="sick">ลาป่วย</Option>
                          <Option value="annual">ลาพักร้อน</Option>
                          <Option value="personal">ลากิจ</Option>
                          <Option value="maternity">ลาคลอดบุตร</Option>
                        </Select>
                      </Form.Item>

                      <Form.Item
                        name="dates"
                        label="วันที่"
                        rules={[
                          {
                            required: true,
                            message: "โปรดกรอกข้อมูล",
                          },
                        ]}
                      >
                        <DatePicker.RangePicker placeholder="ระบุวันที่" />
                      </Form.Item>

                      <Form.Item
                        name="reason"
                        label="เหตุผลการลา"
                        rules={[
                          {
                            required: true,
                            message: "โปรดกรอกข้อมูล",
                          },
                        ]}
                      >
                        <TextArea rows={4} placeholder="ระบุเหตุผลการลา" />
                      </Form.Item>

                      {/* <Form.Item
                        name="attachments"
                        label="เอกสารหลักฐาน"
                        rules={[
                          {
                            required: true,
                            message: "โปรดแนบเอกสาร",
                          },
                        ]}
                      >
                        
                        <div className="flex">
                          <label
                            htmlFor="img_files"
                            className={`py-2.5 px-6 ml-2 text-sm rounded-full text-white text-body font-light text-center shadow-xs transition-all duration-500 ${
                              fileList.length > 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-[#1A3D93] cursor-pointer hover:bg-indigo-700"
                            }`}
                          >
                            อัพโหลดไฟล์
                          </label>
                          <input
                            id="img_files"
                            type="file"
                            value=""
                            onChange={(e) => fileAdd(e, fileList, setFileList)}
                            accept=".jpg, .jpeg, .png"
                            className="opacity-0 pointer-events-none"
                          />
                        </div>

                        {fileList.length >= 0 ? (
                          <div className="drop-file-preview">
                            {fileList.map((item, index) => (
                              <div
                                key={index}
                                className="drop-file-preview__item"
                              >
                                <img
                                  src={
                                    ImageConfig[item.type.split("/")[1]] ||
                                    ImageConfig["default"]
                                  }
                                  alt=""
                                />
                                <div className="drop-file-preview__item__info">
                                  <a
                                    href={URL.createObjectURL(item)}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {item.name}
                                  </a>
                                  <p>{(item.size / 1000000).toFixed(3)} MB</p>
                                </div>
                                <span
                                  className="drop-file-preview__item__del"
                                  onClick={() =>
                                    fileRemove(item, fileList, setFileList)
                                  }
                                >
                                  <svg
                                    className="w-4 h-4 fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                  </svg>
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </Form.Item> */}
                      {leaveType === 'sick' && 
                      <div className="grid grid-cols-12 px-5 items-center rounded-lg">
                      <div className="col-span-7">
                        <p><span className="text-red-500">*</span> ใบรับรองแพทย์</p>
                      </div>
                      <div className="col-span-5 flex justify-end">
                        <button
                          onClick={() => {
                            getStart();
                            showModal();
                            // setIndex(1); //Mock
                          }}
                          type="button"
                          disabled={isConfirmed}
                          className={`py-2 px-5 text-sm rounded-full text-white text-body font-light text-center shadow-xs transition-all duration-500 ${
                            !isConfirmed
                              ? "bg-[#1A3D93] cursor-pointer hover:bg-indigo-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          Verify Credentials
                        </button>
                      </div>
                    </div>
                      }
                      
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
                          disabled={!isConfirmed}
                          className={`py-2.5 px-6 text-sm rounded-full text-white text-body font-light text-center shadow-xs transition-all duration-500 ${
                            isConfirmed
                              ? "bg-[#1A3D93] cursor-pointer hover:bg-indigo-700"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          ยืนยัน
                        </button>
                      </div>
                    </div>
                  </Form>
                </ConfigProvider>
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
        centered
        width={500}
        height={500}
        footer={false}
      >
        <div className="flex flex-col items-center justify-center text-center mt-8 mb-6">
          <Space>
            {loading ? (
              <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
            ) : index === 1 ? (
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <QRCode
                    type="svg"
                    value={qrLink}
                    size={256}
                  />
                </div>
                <div className="flex flex-col items-center justify-center text-center text-profile text-[16px] leading-[28px] mt-5">
                  <p>กรุณาสแกน QR Code บนแอพ Wallet Pass Application</p>
                  <p className="text-[#8F90A6] text-[14px]">
                    สแกน QR Code เพื่อเพิ่ม Verifiable Credentials
                  </p>
                </div>
              </div>
            ) : index === 1 && loading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <QRCode
                    type="svg"
                    value={qrLink}
                    size={256}
                    className={`${loading ? "opacity-50" : ""}`}
                  />
                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
                      <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center text-center text-profile text-[16px] leading-[28px] mt-5">
                  <p>โปรดรอสักครู่...</p>
                </div>
              </div>
            ) : index === 2 ? (
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <img
                    src={approvedAnimationGif}
                    alt="Approved"
                    style={{ width: 256, height: 256 }}
                  />
                </div>
                <div className="flex flex-col items-center justify-center text-center text-profile text-[16px] leading-[28px] mt-5">
                  <p>ยืนยันเอกสารสำเร็จ</p>
                </div>
              </div>
            ) : (
              ""
            )}
          </Space>
        </div>
      </Modal>
    </>
  );
};

export default ProfilePageVerify;
