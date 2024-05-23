import Link from "next/link";

const NotFound = () => {
  return (
    <div className="">
      <div className="container h-[70vh]">
        <div className="wrapper">
          <div className="error">
            <div className="number">4</div>
            <div className="illustration">
              <div className="circle"></div>
              <div className="clip">
                <div className="paper">
                  <div className="face">
                    <div className="eyes">
                      <div className="eye eye__left"></div>
                      <div className="eye eye__right"></div>
                    </div>
                    <div className="cheeks cheeks__left"></div>
                    <div className="cheeks cheeks__right"></div>
                    <div className="mouth"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="number">4</div>
          </div>

          <div className="text">
            Oops. The page you&apos;re looking for doesn&apos;t exist.
          </div>
          <a className="button" href="/">
            Quay lại trang chủ
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
