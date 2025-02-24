import BgImg from "@/assets/svg/background.svg";

export default function BgGradient() {
  return (
    <div className="absolute top-0 left-0 right-0 h-screen flex items-center justify-center overflow-hidden z-0">
      <img
        src={BgImg}
        // className="[mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
      />
      {/* <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-background to-transparent z-10" /> */}
    </div>
  );
}
