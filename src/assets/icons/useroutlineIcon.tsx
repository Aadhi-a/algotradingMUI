import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const UserOutlineIcon = (props: any) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G id="SVGRepo_bgCarrier" strokeWidth={0} />
    <G
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <G id="SVGRepo_iconCarrier">
      <Circle
        cx={12}
        cy={9}
        r={3}
        stroke={props.color}
        strokeWidth={props.strokeWidth}
      />
      <Circle
        cx={12}
        cy={12}
        r={10}
        stroke={props.color}
        strokeWidth={props.strokeWidth}
      />
      <Path
        d="M17.9691 20C17.81 17.1085 16.9247 15 11.9999 15C7.07521 15 6.18991 17.1085 6.03076 20"
        stroke={props.color}
        strokeWidth={props.strokeWidth}
        strokeLinecap="round"
      />
    </G>
  </Svg>
);
export default UserOutlineIcon;
