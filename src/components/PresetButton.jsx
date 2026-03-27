import React from 'react';
import { chatStylePresets } from '../data/presets';
import useCssStore from '../store/useCssStore';

function PresetButtons() {
  const applyPreset = useCssStore((state) => state.applyPreset);

  return (
    <div className="preset-buttons">
      {/* 💡 Object.entries를 사용해 키(presetKey)와 프리셋 데이터(presetData)를 동시에 가져옵니다. */}
      {Object.entries(chatStylePresets).map(([presetKey, presetData]) => (
        <button 
          key={presetKey} 
          onClick={() => applyPreset(presetData)}
        >
          {/* 객체 안에 넣어둔 label 값을 버튼 이름으로 사용합니다. (없을 경우 fallback으로 presetKey 사용) */}
          {presetData.label || presetKey}
        </button>
      ))}
    </div>
  );
}

export default PresetButtons;