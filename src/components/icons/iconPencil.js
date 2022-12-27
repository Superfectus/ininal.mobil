import React from "react";
import Svg, {Path} from "react-native-svg";

function IconPencil(props) {

    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={props.width ? props.width : 18.003}
            height={props.height ? props.height : 18.002}
            {...props}
        >
            <Path
                d="M0 14.252v3.75h3.75l11.06-11.06-3.75-3.75Zm17.71-10.21a1 1 0 0 0 0-1.41L15.37.292a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
                fill={props.color ? props.color : "#006cff"}
            />
        </Svg>
    );
}

export default IconPencil;
