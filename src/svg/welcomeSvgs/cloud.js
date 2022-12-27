import * as React from "react"
import { Dimensions, View } from "react-native";
import Svg, { G, Path, Rect } from "react-native-svg"

export default class Cloud extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const originalWidth = 623;
    const originalHeight = 322;
    const aspectRatio = originalWidth / originalHeight;
    const windowWidth = Dimensions.get("window").width * 1.2;

    return (
      <View style={[this.props.style, { width: windowWidth, aspectRatio }]} >
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          {...this.props}
          width="100%"
          height="100%"
          viewBox={`0 0 ${originalWidth} ${originalHeight}`}>
          <Path
            data-name="Path 9752"
            d="M31.884 322.606c-4.639-3.213-4.668-1.254-7.752-3.527-40.835-30.089-24.1-105.683 7.752-130.856 59.283-46.852 146.939 4.439 195.674 43.1-9.141-51.712 27.261-104.485 57-121.431C322.991 87.99 388.679 81.367 431.57 99.716c70.4 30.116 105.2 96.9 129.452 165.367 69.885-24.947 82.9 55.479 30.326 55.943-20.946.184-458.964 0-488.357 0-22.626 0-52.047-1.633-71.107 1.58Z"
            fill="#e3f4ff"
            opacity={0.3}
          />
          <G data-name="Group 3481" opacity={0.4} fill="#f5f5f5">
            <Path
              data-name="Path 9753"
              d="M131.06 26.265a8.178 8.178 0 0 0-13.112-6.533 10.348 10.348 0 0 0-9.382-5.992c-.043 0-.084.006-.127.007a17.23 17.23 0 0 0-33.755.029c-.237-.016-.472-.036-.712-.036a10.357 10.357 0 0 0 0 20.714h48.9a8.188 8.188 0 0 0 8.188-8.189Z"
            />
            <Path
              data-name="Path 9755"
              d="M403.234 38.541a12.247 12.247 0 0 0-4.347.806 26.947 26.947 0 0 0-50.1-1.624 14.7 14.7 0 1 0-10.027 25.44h64.469a12.311 12.311 0 1 0 0-24.622Z"
            />
          </G>
          <Path
            data-name="Line 129"
            fill="none"
            stroke="#2f2f2f"
            strokeWidth={2}
            d="M447.157 321.835h-415"
          />
        </Svg>
      </View>
    );
  }
}