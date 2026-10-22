

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-[1180px] px-5 ${className}`}>{children}</div>
);

export default Container;
