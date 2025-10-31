import Spline from '@splinetool/react-spline';

export const SplineRobot = () => {
  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg">
      {/* Green glow from below */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-green-500/30 blur-3xl rounded-full animate-pulse"></div>
      
      {/* Spline 3D Robot */}
      <Spline
        scene="https://prod.spline.design/rU2-Ks0SC0T5od9B/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
};