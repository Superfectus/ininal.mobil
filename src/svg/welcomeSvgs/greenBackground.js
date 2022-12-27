import * as React from "react"
import Svg, { G, Defs, Path, Rect } from "react-native-svg"

const GreenBackGround = (props) => (
    <Svg
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Defs></Defs>
        <G filter="url(#a)" data-name="blob-2">
            <Path
                data-name="blob-2"
                d="M144.317 309.263c30.593-91.754 99.193-169.494 178.62-188.203 79.305-19.226 170.015 20.978 233.309 74.028 63.88 53.45 100.338 119.745 132.44 182.21 32.227 62.978 60.558 122.013 61.976 182.296s-24.66 121.412-66.28 155.279c-41.75 33.353-100.092 39.159-168.023 57.188-67.599 17.4-145.382 46.627-211.746 22.202S183.172 691.252 151.928 599.074s-38.203-198.058-7.61-289.811Z"
                fill="#4d8d6e"
            />
        </G>
    </Svg>
)
export default GreenBackGround;