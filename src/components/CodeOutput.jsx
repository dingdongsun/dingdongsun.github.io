import React, { useState } from 'react';
import useCssStore from '../store/useCssStore';
import { generateCSS } from '../utils/generateCSS';
import { toast } from 'sonner';

function simpleCssMinify(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')      // 주석 제거
        .replace(/\s+/g, ' ')                  // 연속 공백 하나로
        .replace(/;\}/g, '}')                  // 마지막 세미콜론 제거
        .trim();                               // 앞뒤 공백 제거
}

function CodeOutput() {
    const css = useCssStore((state) => generateCSS(state, { forCodeView: true }));
    const minifiedCss = simpleCssMinify(css);
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(minifiedCss);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast.error('복사에 실패했어요.');
        }
    };

    const handleSupport = () => {
        window.open('https://link.kakaopay.com/__/vvnloco', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className='coffee-button'>
            <button onClick={handleCopy}>
                {copied ? '복사 완료' : 'CSS 코드 복사'}
            </button>

            <button
                onClick={handleSupport}
                style={{
                    backgroundColor: '#FEE500',
                    borderColor: '#FEE500',
                    color: '#191919',
                    fontWeight: 700
                }}
            >
                개발자에게 커피 사주기
            </button>
        </div>
    );
}

export default CodeOutput;