import { BadRequestException } from "@nestjs/common";
import axios from "axios";

export const sendOTP = async (phoneNumber: string) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const message = `Your OTP is ${otp}`;
  try {
    const res = await axios.post(
      `https://bindu-sms-gateway-server.4zjyot.easypanel.host/sms/send`,
      {
        message: {
          text: message,
          contactNumber: phoneNumber
        },
        applicationId: "8ba58242-d94e-4be6-ab1b-7b43f7fbff82"
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BINDUSMS_API_KEY
        }
      }
    );
    console.log(res.data);
    return otp;
  } catch (error) {
    console.log(error);
    return new BadRequestException("Error sending OTP");
  }
};
