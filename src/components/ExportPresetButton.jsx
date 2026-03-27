import useCssStore from '../store/useCssStore';

function ExportPresetButton() {
  const cssState = useCssStore(); // 전체 store 상태

  const handleExport = () => {
    const allKeys = Object.keys(cssState);
    const pureState = {};

    allKeys.forEach((key) => {
      if (typeof cssState[key] !== 'function') {
        pureState[key] = cssState[key];
      }
    });

    const json = JSON.stringify(pureState, null, 2);
    navigator.clipboard.writeText(json).then(() => {
      alert('현재 설정값이 클립보드에 복사되었습니다!');
    });
  };

  return (
    <div className="chatting_row">
      <button onClick={handleExport}>📋 현재 설정값 복사하기</button>
    </div>
  );
}

export default ExportPresetButton;