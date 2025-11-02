import Skeleton from "react-loading-skeleton";
import "./Skeleton.css";

export const FullPageSkeleton = () => {
  return (
    <div className="home-skeleton">
      {/* Navbar */}
      <nav className="home-skeleton__navbar">
        <div className="home-skeleton__logo">
          <Skeleton width={100} height={30} baseColor="#1c2541" highlightColor="#3a506b" />
        </div>
        <div className="home-skeleton__links">
          <Skeleton width={60} height={25} baseColor="#1c2541" highlightColor="#3a506b" />
          <Skeleton width={80} height={25} baseColor="#1c2541" highlightColor="#3a506b" />
          <Skeleton width={70} height={25} baseColor="#1c2541" highlightColor="#3a506b" />
        </div>
      </nav>

      {/* Hero Section */}
      <main className="home-skeleton__hero">
        <Skeleton
          width={400}
          height={60}
          baseColor="#1c2541"
          highlightColor="#3a506b"
          style={{ marginBottom: "20px" }}
        />
        <Skeleton
          count={3}
          width={600}
          height={20}
          baseColor="#1c2541"
          highlightColor="#3a506b"
          style={{ marginBottom: "10px" }}
        />
      </main>
    </div>
  );
};
