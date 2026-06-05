// Mobile preview — runs the homepage + PDP inside iOS device frames

const MobileApp = () => {
  return (
    <div className="mob-stage">
      <div className="mob-frames">
        {/* ----- Homepage ----- */}
        <div>
          <window.IOSDevice width={402} height={874}>
            <div style={{ paddingTop: 54, height: "100%" }}>
              <iframe
                src="Gripfeet.html"
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  background: "#fff",
                  display: "block",
                }}
                title="Gripfeet Homepage on iPhone"
              />
            </div>
          </window.IOSDevice>
        </div>

        {/* ----- PDP ----- */}
        <div>
          <window.IOSDevice width={402} height={874}>
            <div style={{ paddingTop: 54, height: "100%" }}>
              <iframe
                src="PDP.html?product=ank-soft-studio"
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  background: "#fff",
                  display: "block",
                }}
                title="Soft Studio PDP on iPhone"
              />
            </div>
          </window.IOSDevice>
        </div>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MobileApp />);
