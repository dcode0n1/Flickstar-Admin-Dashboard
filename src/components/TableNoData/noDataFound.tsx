import React from "react";
import Lottie from "lottie-react";
import NotFoundJSON from "./animation_no_data.json";

const App = () =>
    <div className="flex items-center justify-center w-full bg-white">
        <Lottie animationData={NotFoundJSON} loop={true} className="w-60" />
    </div>

export default App

