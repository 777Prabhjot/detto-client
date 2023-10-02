const Toast = ({ msg, color }) => {
  return (
    <div className="fixed top-5 z-50 left-[40%]">
      {msg && (
        <div
          className="max-w-xs bg-red-500 text-sm text-white rounded-md shadow-lg dark:bg-gray-900 mb-3 ml-3 ml-3"
          role="alert"
          style={{ background: color && color }}
        >
          <div className="flex p-4">
            {msg}
            <div className="ml-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Toast;
