import Svg, { Path } from "react-native-svg"
import React, { Component } from 'react'

const HomeIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={21.362}
      height={21.364}
      {...props}
    >
      <Path
        d="M20.788 9.293 12.071.577a1.966 1.966 0 0 0-2.781 0L.58 9.287l-.009.009a1.966 1.966 0 0 0 1.309 3.35h.408v6.413a2.3 2.3 0 0 0 2.3 2.3H8a.626.626 0 0 0 .626-.626V15.71a1.051 1.051 0 0 1 1.05-1.05h2.011a1.051 1.051 0 0 1 1.05 1.05v5.028a.626.626 0 0 0 .626.626h3.41a2.3 2.3 0 0 0 2.3-2.3v-6.415h.327a1.967 1.967 0 0 0 1.392-3.357Zm0 0"
        fill="#fff"
      />
    </Svg>
  );
}

export default HomeIcon;