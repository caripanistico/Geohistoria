import React, {useState} from "react";
import Images from "./images";
import "./styles.css";

export default function Imagenes() {

    const [selectedImg, setSelectedImg] = useState(Images[0]);

    return (
        <div className="Imagenes">
            <div className="container">
                <img src={selectedImg} alt="Selected" className="selected" />
                <div className="imgContainer">
                    {Images.map((img, index) => (
                        <img 
                            style={{border: selectedImg === img ? "4px solid black" : ""}} 
                            key={index} 
                            src={img} 
                            alt="imagen"
                            onClick={() => setSelectedImg(img)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}