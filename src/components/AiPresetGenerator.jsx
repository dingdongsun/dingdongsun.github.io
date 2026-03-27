import React, { useState } from 'react';
import useCssStore from '../store/useCssStore';
import { generatePresetFromGemini } from '../utils/geminiApi';
import { fontList } from './OptionPanel';
import { toast } from 'sonner';

export default function AiPresetGenerator() {
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const applyPreset = useCssStore(state => state.applyPreset);
    const setFontFamily = useCssStore(state => state.setFontFamily);

    const handleGenerate = async () => {
        if (!prompt.trim() || isLoading) return;

        setIsLoading(true);

        try {
            const fontNames = fontList.map(f => f.name.replace(/['"]/g, ''));

            const aiData = await generatePresetFromGemini(prompt, fontNames);

            applyPreset(aiData);

            const selectedFont = fontList.find(
                f => f.name.replace(/['"]/g, '') === aiData.fontFamily.replace(/['"]/g, '')
            ) || fontList[0];

            const weights = selectedFont.weight || [];
            const defaultWeightObj = weights.find(w => w.value === 400) || weights[0];
            const url = defaultWeightObj ? defaultWeightObj.url : selectedFont.url;
            const weightVal = defaultWeightObj ? defaultWeightObj.value : 400;

            setFontFamily(selectedFont.name, url, weights, weightVal);

            setPrompt('');
            toast.success(`AI가 [${aiData.label}] 테마를 완성했습니다!`);
        } catch (error) {
            console.error(error);
            toast.error('프리셋 생성에 실패했습니다. API 키와 네트워크를 확인해주세요.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(255, 255, 255, 0.72)',
                        backdropFilter: 'blur(3px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            minWidth: '220px',
                            padding: '24px 28px',
                            borderRadius: '16px',
                            background: '#fff',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '14px',
                        }}
                    >
                        <div
                            style={{
                                width: '36px',
                                height: '36px',
                                border: '4px solid #e5e7eb',
                                borderTop: '4px solid #111',
                                borderRadius: '50%',
                                animation: 'aiPresetSpin 0.8s linear infinite',
                            }}
                        />
                        <p
                            style={{
                                margin: 0,
                                fontSize: '14px',
                                fontWeight: 600,
                                color: '#111',
                                textAlign: 'center',
                            }}
                        >
                            AI 프리셋 생성 중...
                        </p>
                        <p
                            style={{
                                margin: 0,
                                fontSize: '12px',
                                color: '#666',
                                textAlign: 'center',
                                lineHeight: 1.5,
                            }}
                        >
                            분위기에 맞는 채팅창 스타일을 만들고 있어요.
                        </p>
                    </div>

                    <style>
                        {`
                            @keyframes aiPresetSpin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}
                    </style>
                </div>
            )}

            <div className="chatting_row">
                <label>
                    <span className="label">AI 매직 프리셋 생성</span>
                    <p className="desc">원하는 분위기를 입력하면 AI가 채팅창 프리셋을 자동으로 만들어드려요.</p>
                    <p className="desc">예시: "빈티지한 느낌", "형광색 사이버펑크", "귀여운 다이어리"</p>

                    <div className="effectOptions" style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        gap: '10px'
                    }}>
                        <input
                            type="text"
                            value={prompt}
                            disabled={isLoading}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="어떤 분위기의 채팅창을 원하시나요?"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isLoading && prompt.trim()) {
                                    handleGenerate();
                                }
                            }}
                            style={{
                                opacity: isLoading ? 0.6 : 1,
                                cursor: isLoading ? 'not-allowed' : 'text',
                            }}
                        />

                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                            style={{
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {isLoading ? '생성 중...' : 'AI 프리셋 생성'}
                        </button>
                    </div>
                </label>
            </div>
        </>
    );
}