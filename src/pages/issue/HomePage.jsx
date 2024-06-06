// src/pages/HomePage.jsx

import { Col, Row } from "antd";
const HomePage = () => {
  return (
    <>
      <div className="max-w-xl mx-auto ">
        <Row>
          <Col span={24}>
            {" "}
            <div className="flex w-full rounded-lg bg-indigo-600 h-16 items-center justify-center text-white">
              0
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <div className="flex w-full rounded-lg bg-indigo-600 h-16 items-center justify-center text-white">
              1
            </div>
          </Col>
          <Col span={8}>
            {" "}
            <div className="flex w-full rounded-lg bg-indigo-600 h-16 items-center justify-center text-white">
              1
            </div>
          </Col>
          <Col span={8}>
            {" "}
            <div className="flex w-full rounded-lg bg-indigo-600 h-16 items-center justify-center text-white">
              1
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
