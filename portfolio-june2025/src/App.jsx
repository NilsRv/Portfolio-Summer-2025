import Navbar from "./components/Navbar";
import StarSplash from "./components/StarSplash";
import WebGLTransition from "./components/WebGLTransition";
import AnimatedRoutes from "./routes/AnimatedRoutes";

export default function App() {
  return (
    <>
      <Navbar />
      {/* <WebGLTransition /> */}
      <AnimatedRoutes />
    </>
  );
}
