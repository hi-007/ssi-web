// src/pages/ProfilePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Col, Row, Card, Modal, Space, QRCode, Form, Spin, Drawer } from "antd";
import Avatarprofile from "@/assets/img/Avatarprofile.jpg";
import approvedAnimationGif from "@/assets/img/success.gif";
import EticketHome1 from "@/assets/img/EticketHome1.png";
import EticketHome2 from "@/assets/img/EticketHome2.png";
import EticketHome3 from "@/assets/img/EticketHome3.png";
import Eye from "@/assets/svg/eye.svg";
import IconImage from "@/assets/img/time.png";
import IconImage2 from "@/assets/img/location.png";
import IconImage3 from "@/assets/img/doc.png";
import IconImage4 from "@/assets/img/armchair-outline.png";
import {
  createInvitation,
  createOffer,
  deleteConnection,
  sendOffer,
} from "@/utils/agent";
const ProfilePageEticket = () => {
  //CALL VARIABLE FROM ENV
  const AgentUrl = import.meta.env.VITE_ISSUER_API;
  const AgentWss = import.meta.env.VITE_ISSUER_WSS;
  const AgentKey = import.meta.env.VITE_ISSUER_KEY;
  const CredDefId = import.meta.env.VITE_CREDDEF_GUIDE_LICENSE;
  const [form] = Form.useForm();
  const [index, setIndex] = useState(0);
  const [qrLink, setQrLink] = useState("");
  const [connection_id, setConnectionId] = useState("");
  //    const [person, setPerson] = useState({})
  const [credential, setCredentail] = useState({
    organization_address_state: "กรุงเทพมหานคร",
    organization_address_line: "1 ถนนโนวา",
    condition_note: "เป็นไข้สูง ควรพักผ่อนให้เพียงพอ งดทำงานเป็นเวลา 5-7 วัน",
    id: "0129023",
    patient_gender: "Male",
    context: "https://ict.moph.go.th/MC",
    patient_name_family: "ณ พัทลุง",
    provenance_signature_data: "",
    practitioner_name_given: "สมศักดิ์",
    organization_address_postal_code: "10400",
    organization_name: "Nova Hospital",
    patient_name_given: "หัสนัย",
    practitioner_id_value: "012345",
    patient_address_line: "127/4 หมู่ที่ 1 ",
    condition_code_display: "Not fit for work",
    patient_id_type: "NI",
    practitioner_name_prefix: "นายแพทย์",
    organization_address_district: "พญาไท",
    patient_address_county: "ประเทศไทย",
    organization_address_city: "สามเสนใน",
    patient_id_value: "1299300348981",
    period_start: "2024-06-15T00:00:00Z",
    patient_address_city: "ต.ปากน้ำ",
    practitioner_name_family: "ศรีสุข",
    patient_birth_date: "1980-01-01",
    provenance_signature_time: "2024-06-15T17:20:10Z",
    patient_name_prefix: "นาย",
    ondition_code: "102499006",
    organization_id_value: "54321",
    practitioner_id_type: "MD",
    patient_address_district: "เบตง",
    patient_address_postal_code: "90160",
    organization_address_county: "ประเทศไทย",
    provenance_author: "นายแพทย์ สมศักดิ์ ศรีสุข",
    period_end: "2024-06-20T23:59:59Z",
    patient_address_state: "ยะลา",
  });

  const { lastMessage, readyState } = useWebSocket(
    `${AgentWss}?apikey=${AgentKey}`
  );
  // const [abandon, setAbandon] = useState(false);
  const [offerSent, setOfferSent] = useState(false);
  //

  const [selectedMenu, setSelectedMenu] = useState("profile");
  const [loading, setLoading] = useState(false);
  const [isQrSuccess, setIsQrSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(1);

  const handleSubmit = async () => {
    setIndex(0);
    invite();
  };

  const invite = async () => {
    try {
      setLoading(true);
      const inv = await createInvitation(AgentUrl, AgentKey);
      setConnectionId(inv.connection_id);
      setQrLink(inv.invitation_url);
      setIndex((prevIndex) => prevIndex + 1);
      setLoading(false);
      console.log("invitation_url", inv.invitation_url);
    } catch (error) {
      console.error("Error creating invitation:", error);
    }
  };

  //const nextStep = () => {
  //    setIndex((i) => i + 1);
  //};

  /*
const handleScanQr = async () => {
    console.log(JSON.stringify(license));
    const offer = createOffer(connection_id, CredDefId, license);
    console.log(JSON.stringify(offer));
    const offerResult = await sendOffer(AgentUrl, offer);
    console.log(offerResult);
    setIndex(2);
};*/

  const sendCredentialOffer = async () => {
    setLoading(true);
    const offer = createOffer(connection_id, CredDefId, credential);
    console.log(JSON.stringify(offer));
    const result = await sendOffer(AgentUrl, AgentKey, offer);

    return result;
  };

  const credentialAck = () => {
    setLoading(false);
    setIndex(2);
  };

  /*
const credentialAbandon = () => {
    setLoading(false);
    setAbandon(true);
    setIndex(2);
};
*/
  const goBackStep0 = async () => {
    setIndex(0);
    //setAbandon(false);
    setOfferSent(false);
    setLoading(false);
    // If go back to first step, should remove invition to avoid abandon connection
    await deleteConnection(AgentUrl, AgentKey, connection_id);
  };

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data);
      console.log("ping data: ", data);
      if (data.topic != "ping") {
        console.log(data);
      }
      if (data.topic === "connections") {
        const state = data.payload.state;
        const conid = data.payload.connection_id;
        if (state == "active" && conid == connection_id) {
          console.log("Try to send credential offer.");
          sendCredentialOffer();
        }
      }
      if (
        data.topic === "issue_credential" &&
        connection_id === data.payload.connection_id
      ) {
        const state = data.payload.state;
        if (state === "request_received") {
          //setCredExId(data['payload']['credential_exchange_id'])
        }
        if (state === "offer_sent") {
          setOfferSent(true);
        }
        //if (state === 'credential_acked' && cred_ex_id === data['payload']['credential_exchange_id']) {
        if (state === "credential_acked") {
          credentialAck();
        }
        //if (state === 'abandoned' && cred_ex_id === data['payload']['credential_exchange_id']) {
        if (state === "abandoned") {
          console.log("It's abandon");
          // credentialAbandon();
        }
      }
    }
  }, [lastMessage, form]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

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

  const [showModalLogout, setShowModalLogout] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setShowModalLogout(true);
  };

  const confirmLogout = () => {
    setShowModalLogout(false);
    navigate("/loginPageIssue"); // Adjust this path according to your routing setup
  };

  const { confirm } = Modal;

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

  const renderCardContent = () => {
    switch (selectedMenu) {
      case "profile":
        return (
          <div>
            <Card
              title={
                <>
                  <p className="text-md font-semibold text-[#9E9E9E]">
                    ข้อมูลของฉัน
                  </p>
                </>
              }
              bordered={false}
              className="rounded-3xl w-full"
            >
              <div class="flex">
                <div class="flex-initial w-64 font-normal text-[#9E9E9E] text-md">
                  <p className="py-2 font-bold">ชื่อ-นามสกุล</p>
                  <p className="py-2 font-bold">เบอร์โทรศัพท์ (มือถือ)</p>
                  <p className="py-2 font-bold">อีเมล</p>
                </div>
                <div class="flex-initial w-32 font-normal text-md">
                  <p className="py-2">หัสนัย ณ พัทลุง</p>
                  <p className="py-2">09-4311-5619</p>
                  <p className="py-2">hassanai@gmail.com</p>
                </div>
              </div>
            </Card>

            <Card
              title={
                <>
                  <p className="text-md font-semibold text-[#9E9E9E]">
                    รายการสั่งซื้อ
                  </p>
                </>
              }
              bordered={false}
              className="rounded-3xl w-full mt-5"
            >
              <div class="grid grid-cols-4 gap-10">
                <div class="font-normal text-[#9E9E9E] text-md col-span-2">
                  <p class="py-2 font-bold">รายละเอียดคอนเสิร์ต</p>
                  <div class="flex items-center gap-5">
                    <img
                      src={EticketHome1}
                      alt="1"
                      className="w-[110px] h-[75px] rounded-md"
                    />
                    <div>
                      <p className="mt-4 font-bold leading-5 text-black text-[18px]">
                        Bangkok Nights: A Symphony Under the Stars
                      </p>
                      <p className="mt-2 text-[#757575] leading-5">
                        2 ธ.ค. 2566 - 7 ก.ย. 2567
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-5">
                    <img
                      src={EticketHome2}
                      alt="1"
                      className="w-[110px] h-[75px] rounded-md"
                    />
                    <div>
                      <p className="mt-4 font-bold leading-5 text-black text-[18px]">
                        Eclipse: Bangkok's Night Concert Extravaganza
                      </p>
                      <p className="mt-2 text-[#757575] leading-5">
                        29 มิ.ย. 2567 - 30 มิ.ย. 2567
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-5">
                    <img
                      src={EticketHome3}
                      alt="1"
                      className="w-[110px] h-[75px] rounded-md"
                    />
                    <div>
                      <p className="mt-4 font-bold leading-5 text-black text-[18px]">
                        Bangkok After Dark: A Night of Music and Celebration
                      </p>
                      <p className="mt-2 text-[#757575] leading-5">
                        15 มิ.ย. 2567 - 16 มิ.ย. 2567
                      </p>
                    </div>
                  </div>
                </div>

                <div class="text-[#8F90A6]">
                  <p class="py-2 font-bold text-[#9E9E9E]">
                    สถานที่จัดคอนเสิร์ต
                  </p>
                  <p class="py-5">เมืองทองธานี</p>
                  <p class="py-10">เมืองทองธานี</p>
                  <p class="py-5">เมืองทองธานี</p>
                </div>

                <div class="grid justify-items-end mt-6 mr-5">
                  <button
                    onClick={() => {
                      setSelectedTicket(1);
                      setOpenSideBar(true);
                    }}
                  >
                    <img src={Eye} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTicket(2);
                      setOpenSideBar(true);
                    }}
                  >
                    <img src={Eye} />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTicket(3);
                      setOpenSideBar(true);
                    }}
                  >
                    <img src={Eye} />
                  </button>
                </div>
                <Drawer
                  title="รายละเอียดตั๋ว"
                  placement="right"
                  closable
                  onClose={() => setOpenSideBar(false)}
                  open={openSideBar}
                >
                  <div>
                    {selectedTicket === 1 && (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={EticketHome1}
                          alt="11"
                          className="h-[200px] w-[160px]"
                        />
                        <p className="mt-4 font-semibold text-black text-[18px] px-5 text-center">
                          Bangkok Nights:
                          <br />A Symphony Under the Stars
                        </p>
                        <div className="flex flex-col items-start p-4 rounded-lg shadow-sm w-full bg-gray-100 mt-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                              <img
                                src={IconImage}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              2 ธ.ค. 2566 - 7 ก.ย. 2567, 14.15
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                              <img
                                src={IconImage2}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              เมืองทองธานี
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                              <img
                                src={IconImage3}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              No. 510000531099
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                              <img
                                src={IconImage4}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">B2, BB49</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start p-4 rounded-lg shadow-sm w-full bg-gray-100 mt-4">
                          <div className="flex justify-between items-center w-full">
                            <p className="text-sm text-gray-700">
                              จำนวนทั้งหมด
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              1 ใบ
                            </p>
                          </div>
                        </div>
                        <div className="absolute left-0 bottom-4 w-full border-t border-gray-300 pt-4">
                          <div className="flex justify-end pr-4">
                            <button
                              className="bg-[#7A66D6] text-white px-4 py-2 w-auto rounded-full font-roboto hover:bg-[#6b5ac3] transition"
                              onClick={() => {
                                showModal();
                                handleSubmit();
                              }}
                              type="button"
                            >
                              สร้าง Verifiable Credentials
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedTicket === 2 && (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={EticketHome2}
                          alt="11"
                          className="h-[200px] w-[160px]"
                        />
                        <p className="mt-4 font-semibold text-black text-[18px] px-5 text-center">
                          Eclipse:
                          <br />
                          Bangkok's Night Concert Extravaganza
                        </p>
                        <div className="flex flex-col items-start p-4 rounded-lg shadow-sm w-full bg-gray-100 mt-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              2 ธ.ค. 2566 - 7 ก.ย. 2567, 14.15
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage2}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              เมืองทองธานี
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage3}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              No. 510000531099
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage4}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">B2, BB49</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start p-4 rounded-lg shadow-sm w-full bg-gray-100 mt-4">
                          <div className="flex justify-between items-center w-full">
                            <p className="text-sm text-gray-700">
                              จำนวนทั้งหมด
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              1 ใบ
                            </p>
                          </div>
                        </div>
                        <div className="absolute left-0 bottom-4 w-full border-t border-gray-300 pt-4">
                          <div className="flex justify-end pr-4">
                            <button
                              className="bg-[#7A66D6] text-white px-4 py-2 w-auto rounded-full font-roboto hover:bg-[#6b5ac3] transition"
                              onClick={() => {
                                showModal();
                                handleSubmit();
                              }}
                              type="button"
                            >
                              สร้าง Verifiable Credentials
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                    {selectedTicket === 3 && (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          src={EticketHome3}
                          alt="11"
                          className="h-[200px] w-[160px]"
                        />
                        <p className="mt-4 font-semibold text-black text-[18px] px-5 text-center">
                          Bangkok After Dark:
                          <br />A Night of Music and Celebration
                        </p>
                        <div className="flex flex-col items-start p-4 rounded-lg shadow-sm w-full bg-gray-100 mt-4">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              2 ธ.ค. 2566 - 7 ก.ย. 2567, 14.15
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage2}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              เมืองทองธานี
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage3}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">
                              No. 510000531099
                            </p>
                          </div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 rounded-full bg-gray-200">
                            <img
                                src={IconImage4}
                                alt="Icon"
                                className="w-4 h-4 object-contain"
                              />
                            </div>
                            <p className="text-sm text-gray-700">B2, BB49</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start p-4 rounded-lg shadow-sm w-full bg-gray-100 mt-4">
                          <div className="flex justify-between items-center w-full">
                            <p className="text-sm text-gray-700">
                              จำนวนทั้งหมด
                            </p>
                            <p className="text-sm font-bold text-gray-900">
                              1 ใบ
                            </p>
                          </div>
                        </div>
                        <div className="absolute left-0 bottom-4 w-full border-t border-gray-300 pt-4">
                          <div className="flex justify-end pr-4">
                            <button
                              className="bg-[#7A66D6] text-white px-4 py-2 w-auto rounded-full font-roboto hover:bg-[#6b5ac3] transition"
                              onClick={() => {
                                showModal();
                                handleSubmit();
                              }}
                              type="button"
                            >
                              สร้าง Verifiable Credentials
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Drawer>
              </div>
            </Card>
          </div>
        );
      case "settings":
        return (
          <Card
            title="Settings"
            bordered={false}
            className="rounded-3xl w-full"
          >
            <p>Settings content</p>
            <p>Settings content</p>
            <p>Settings content</p>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="mx-auto max-w-screen-2xl sm:h-auto md:h-[70px] px-10">
        <div className="text-profile">
          <div className="text-profile p-4">
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
                      <p className="text-gray-400">hassanai@gmail.com</p>
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

              <Col span={18}>{renderCardContent()}</Col>
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
                  <QRCode type="svg" value={qrLink} size={256} />
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
                  <p>ออกเอกสารใบอนุญาตสำเร็จ</p>
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

export default ProfilePageEticket;
