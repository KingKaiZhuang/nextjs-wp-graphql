'use client';

import { FourSquare } from "react-loading-indicators";
import type { CSSProperties, JSX } from "react";

const Loader = (): JSX.Element => {
    return (
        <div style={containerStyle}>
            <div style={fadeInStyle}>
                <FourSquare
                    color={["#5fdaa8", "#327fcd", "#cd32cd", "#cd8032"]}
                    size="large"
                />
                <p style={textStyle}>載入中，請稍候...</p>
            </div>
        </div>
    );
};

// TypeScript 型別：CSSProperties
const containerStyle: CSSProperties = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const fadeInStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "fadeIn 0.6s ease-in-out",
};

const textStyle: CSSProperties = {
    marginTop: "20px",
    fontSize: "16px",
    color: "#555",
    letterSpacing: "1px",
};

export default Loader;
