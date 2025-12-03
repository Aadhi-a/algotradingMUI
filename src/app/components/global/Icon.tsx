import ArrowLeftIcon from "@assets/icons/arrowLeftIcon";
import ArrowRightIcon from "@assets/icons/arrowRightIcon";
import chatsFilledIcon from "@assets/icons/chatsFilledIcon";
import chatsOutlineIcon from "@assets/icons/chatsOutlineIcon";
import ExamsFIcon from "@assets/icons/examsFIcon";
import ExamsOIcon from "@assets/icons/examsOIcon";
import EyeFilled from "@assets/icons/EyeFilled";
import EyeSecure from "@assets/icons/EyeSecure";
import HomeFIcon from "@assets/icons/homeFIcon";
import HomeOIcon from "@assets/icons/homeOIcon";
import MailFilled from "@assets/icons/MailFilled";
import NotificationIcon from "@assets/icons/notificationIcon";
import PowerOffIcon from "@assets/icons/powerOff";
import StudentsFIcon from "@assets/icons/studentsFIcon";
import StudentsOIcon from "@assets/icons/studentsOIcon";
import TeacherFIcon from "@assets/icons/teacherFIcon";
import TeacherOIcon from "@assets/icons/teacherOIcon";
import userFilledIcon from "@assets/icons/userFilledIcon";
import UserOutlineIcon from "@assets/icons/useroutlineIcon";
import React, { FC } from "react";
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

const icons = {
  homeFilled: HomeFIcon,
  homeOutline: HomeOIcon,
  notification: NotificationIcon,
  mailFilled: MailFilled,
  eyeFilled: EyeFilled,
  eyelock: EyeSecure,
  examsFilled: ExamsFIcon,
  examsOutline: ExamsOIcon,
  studentsFilled: StudentsFIcon,
  studentsOutline: StudentsOIcon,
  teacherFilled: TeacherFIcon,
  teacherOutline: TeacherOIcon,
  userOutline: UserOutlineIcon,
  userFilled: userFilledIcon,
  powerOff: PowerOffIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  chatsOutline: chatsOutlineIcon,
  chatsFilled: chatsFilledIcon,
};

type IconName = keyof typeof icons;

interface IconProps extends SvgProps {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
  color?: string;
  gradientColor?: [string, string];
}

const Icon: FC<IconProps> = ({
  name,
  size = 24,
  strokeWidth = 1.5,
  style,
  gradientColor,
  ...props
}) => {
  const IconComponent = icons[name];
  return (
    <IconComponent
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      style={style}
      gradientColor={gradientColor}
      {...props}
    />
  );
};

export default Icon;
