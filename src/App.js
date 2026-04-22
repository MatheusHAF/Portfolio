import React, { useRef } from "react";
import "./App.css";

import Lenis from '@studio-freight/lenis'
import { useEffect } from "react"

import SoftAurora from "./animations/SoftAurora";

import Navbar from "./components/NavbarMenu";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      smooth: true
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div className="App">
      <div className="div-background">
      <SoftAurora
        speed={1.0}
        scale={1.5}
        brightness={1}
        color1="#7E57C2"
        color2="#000000"
        noiseFrequency={2.5}
        noiseAmplitude={0.5}
        bandHeight={0.5}
        bandSpread={1}
        octaveDecay={0.1}
        layerOffset={0}
        colorSpeed={0.5}
        enableMouseInteraction
        mouseInfluence={0.2}
      />
    </div>  
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
