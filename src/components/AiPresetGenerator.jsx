// src/components/AiPresetGenerator.jsx
import React, { useRef, useState } from 'react';
import useCssStore from '../store/useCssStore';
import { generatePresetFromGemini } from '../utils/geminiApi';
import { fontList } from './OptionPanel';
import { toast } from 'sonner';

const COOLDOWN_MS = 2000;
const MAX_RETRIES = 2;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isRateLimitError = (error) => {
    if (error?.status === 429) return true;
    if (error?.code === 'RATE_LIMIT') return true;

    const message = String(
        error?.userMessage || error?.apiMessage || error?.message || ''
    );

    return /RESOURCE_EXHAUSTED|rate limit|too many requests|429|quota/i.test(message);
};

export default function AiPresetGenerator() {
    const [prompt, setPrompt] = useState('');
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
    const [showApiKey, setShowApiKey] = useState(false);
    
    const [isLoading, setIsLoading] = useState(false);
    const lastRequestedAtRef = useRef(0);

    const applyPreset = useCssStore(state => state.applyPreset);
    const setFontFamily = useCssStore(state => state.setFontFamily);

    const handleApiKeyChange = (e) => {
        const val = e.target.value;
        setApiKey(val);
        localStorage.setItem('gemini_api_key', val);
    };

    const requestPresetWithRetry = async (userPrompt, fontNames, key) => {
        let lastError = null;
        const retryToastId = 'ai-preset-retry';

        for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
            try {
                if (attempt > 0) {
                    toast.loading(`요청이 많아 다시 시도 중입니다... (${attempt + 1}/${MAX_RETRIES + 1})`, {
                        id: retryToastId,
                    });
                }

                const result = await generatePresetFromGemini(userPrompt, fontNames, key);

                toast.dismiss(retryToastId);
                return result;
            } catch (error) {
                lastError = error;

                if (isRateLimitError(error)) {
                    toast.dismiss(retryToastId);
                    throw error;
                }

                const shouldRetry = attempt < MAX_RETRIES;

                if (!shouldRetry) {
                    toast.dismiss(retryToastId);
                    throw error;
                }

                const waitMs = 2000 * (attempt + 1);

                toast.loading(
                    `연결 지연. ${Math.ceil(waitMs / 1000)}초 후 다시 시도합니다...`,
                    { id: retryToastId }
                );

                await sleep(waitMs);
            }
        }

        toast.dismiss(retryToastId);
        throw lastError;
    };

    const handleGenerate = async () => {
        if (!prompt.trim() || isLoading) return;

        if (!apiKey.trim()) {
            toast.error("먼저 Gemini API 키를 입력해주세요.");
            return;
        }

        const now = Date.now();
        const elapsed = now - lastRequestedAtRef.current;

        if (elapsed < COOLDOWN_MS) {
            const remainSeconds = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
            toast.warning(`요청이 너무 빨라요. ${remainSeconds}초 후 다시 시도해주세요.`);
            return;
        }

        lastRequestedAtRef.current = now;
        setIsLoading(true);

        try {
            const fontNames = fontList.map(f => f.name.replace(/['"]/g, ''));
            const aiData = await requestPresetWithRetry(prompt, fontNames, apiKey);

            applyPreset(aiData);

            const selectedFont = fontList.find(
                f => f.name.replace(/['"]/g, '') === aiData.fontFamily.replace(/['"]/g, '')
            ) || fontList[0];

            const weights = selectedFont.weight || [];
            const defaultWeightObj = weights.find(w => w.value === 400) || weights[0];
            const url = defaultWeightObj ? defaultWeightObj.url : selectedFont.url;
            const weightVal = defaultWeightObj ? defaultWeightObj.value : 400;

            setFontFamily(selectedFont.name, url, weights, weightVal);

            // 알림 메시지에 사용자가 입력한 프롬프트 추가!
            toast.success(`AI가 '${prompt}'에 맞는 [${aiData.label}] 테마를 완성했습니다!`);
        } catch (error) {
            console.error(error);
            toast.error(
                error?.userMessage || '프리셋 생성에 실패했습니다. 잠시 후 다시 시도해주세요.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && (
                <div
                    style={{
                        position: 'fixed', inset: 0, zIndex: 9999,
                        background: 'rgba(255, 255, 255, 0.72)', backdropFilter: 'blur(3px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            minWidth: '220px', padding: '24px 28px', borderRadius: '16px',
                            background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px',
                        }}
                    >
                        <div
                            style={{
                                width: '36px', height: '36px',
                                border: '4px solid #e5e7eb', borderTop: '4px solid #111',
                                borderRadius: '50%', animation: 'aiPresetSpin 0.8s linear infinite',
                            }}
                        />
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#111', textAlign: 'center' }}>
                            AI 프리셋 생성 중...
                        </p>
                    </div>
                    <style>
                        {`@keyframes aiPresetSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
                    </style>
                </div>
            )}

            <div className="chatting_row">
                <label>
                    <span className="label">AI 매직 프리셋 생성</span>
                    <p className="desc">원하는 분위기를 입력하면 AI가 채팅창 프리셋을 자동으로 만들어드립니다.</p>

                    <div style={{ marginBottom: '16px', padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #e9ecef', marginTop: 12, }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: '#343a40' }}>Gemini API Key</span>
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#339af0', textDecoration: 'none', fontWeight: 600 }}>
                                [무료 발급받기]
                            </a>
                        </div>
                        
                        <details style={{ marginBottom: '12px', fontSize: '13px', color: '#495057' }}>
                            <summary style={{ cursor: 'pointer', fontWeight: 600, color: '#495057', marginBottom: '8px', outline: 'none' }}>
                                API 키 발급 방법이 궁금하신가요?
                            </summary>
                            <div style={{ background: '#e9ecef', padding: '12px 16px', borderRadius: '6px' }}>
                                <ol style={{ margin: 0, paddingLeft: '16px', lineHeight: 1.6 }}>
                                    <li>위의 <strong>[무료 발급받기]</strong> 링크를 눌러 구글 계정으로 로그인합니다. (처음 접속 시 약관 동의 필요)</li>
                                    <li>화면 우측 상단에 있는 <strong>[API 키 만들기]</strong> 버튼을 클릭합니다.</li>
                                    <li>'새 키 만들기' 창이 뜨면 프로젝트(예: Default Gemini Project)를 확인하고 <strong>[키 만들기]</strong> 버튼을 누릅니다.</li>
                                    <li>키 생성이 완료되어 목록에 추가되면, 우측 '결제 등급' 항목 옆에 있는 <strong>[복사 아이콘(문서 두 장 겹친 모양)]</strong>을 클릭합니다.</li>
                                    <li>복사된 키를 아래 입력창에 붙여넣어 주세요!</li>
                                </ol>
                            </div>
                        </details>

                        <div style={{ position: 'relative' }}>
                            <input
                                type={showApiKey ? "text" : "password"}
                                value={apiKey}
                                onChange={handleApiKeyChange}
                                placeholder="발급받은 API 키를 붙여넣어주세요"
                                style={{
                                    width: '100%', 
                                    padding: '10px 45px 10px 12px', 
                                    borderRadius: '6px',
                                    border: '1px solid #ced4da', 
                                    fontSize: '13px', 
                                    boxSizing: 'border-box'
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowApiKey(!showApiKey)}
                                style={{
                                    position: 'absolute',
                                    right: '8px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#495057',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    padding: '4px',
                                }}
                            >
                                {showApiKey ? "숨김" : "보기"}
                            </button>
                        </div>
                        
                        <div style={{ 
                            padding: '12px', 
                            background: '#fff3cd', 
                            borderLeft: '4px solid #ffc107', 
                            borderRadius: '4px',
                            color: '#664d03',
                            fontSize: '13px',
                            lineHeight: 1.5,
                            marginTop: 12
                        }}>
                            <strong style={{ display: 'block', marginBottom: '4px' }}>필독 안내사항</strong>
                            <ul style={{ margin: 0, paddingLeft: '18px' }}>
                                <li>키는 브라우저에만 안전하게 저장되며 서버로 전송되지 않습니다.</li>
                                <li>구글 정책에 따라 하루 무료 생성 횟수에 제한이 있을 수 있습니다.</li>
                            </ul>
                        </div>
                    </div>

                    <div
                        className="effectOptions"
                        style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: '10px' }}
                    >
                        <input
                            type="text"
                            value={prompt}
                            disabled={isLoading}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="어떤 분위기의 채팅창을 원하시나요? 예: 빈티지한 느낌, 형광색 사이버펑크, 귀여운 다이어리"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !isLoading && prompt.trim()) {
                                    handleGenerate();
                                }
                            }}
                            style={{ opacity: isLoading ? 0.6 : 1, cursor: isLoading ? 'not-allowed' : 'text' }}
                        />

                        <button
                            type="button"
                            onClick={handleGenerate}
                            disabled={isLoading || !prompt.trim()}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {isLoading ? '생성 중...' : 'AI 생성'}
                        </button>
                    </div>
                </label>
            </div>
        </>
    );
}