import React, { useRef } from "react";

const FileUpload = ({ setFile, accept, children }) => {
  const ref = useRef();

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};

export default FileUpload;
