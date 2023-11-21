import React from "react";
import { createRoot } from "react-dom/client";
import Weather from "./components/weather";

const root = document.getElementById("root");
const rootInstance = createRoot(root);
rootInstance.render(<Weather />);
