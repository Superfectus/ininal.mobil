import Svg, { G, Path } from "react-native-svg"
import React, { Component } from 'react'

export default PersonIcon = (props) => {
  return (
    <Svg
      data-name="interface (2)"
      xmlns="http://www.w3.org/2000/svg"
      width={23.49}
      height={23.49}
      {...props}
    >
      <G data-name="Group 20">
        <Path
          data-name="Path 19"
          d="M11.745 0A11.745 11.745 0 1 0 23.49 11.745 11.758 11.758 0 0 0 11.745 0Zm0 3.426a5.628 5.628 0 1 1-5.628 5.627 5.634 5.634 0 0 1 5.628-5.627Zm0 18.107A9.768 9.768 0 0 1 3.924 17.6a18.428 18.428 0 0 1 7.821-1.945 18.43 18.43 0 0 1 7.821 1.945 9.768 9.768 0 0 1-7.821 3.932Z"
          fill="#e1e1e1"
        />
      </G>
    </Svg>
  );
}