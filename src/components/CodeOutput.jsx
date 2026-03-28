import React, { useState } from 'react';
import useCssStore from '../store/useCssStore';
import { generateCSS } from '../utils/generateCSS';
import { toast } from 'sonner';
import { Tooltip } from 'react-tooltip'

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

            <button
                data-tooltip-id="my-tooltip" data-tooltip-content="커피 한 잔의 응원이 큰 힘이 됩니다 ☕"
                onClick={handleSupport}
                style={{
                    backgroundColor: '#FEE500',
                    borderColor: '#FEE500',
                    color: '#191919',
                    fontWeight: 700
                }}
            >
                개발자에게 커피 사기
            </button>
            
            <button onClick={handleCopy}>
                {copied ? '복사 완료' : 'CSS 코드 복사'}
            </button>
            
            <Tooltip id="my-tooltip" />
        </div>
    );
}

export default CodeOutput;
