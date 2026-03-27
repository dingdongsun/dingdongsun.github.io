export function generateCSS(state, {
    forPreview = false,
    forCodeView = false
} = {}) {
    const {
        fontFamily,
        fontUrl,
        fontWeight,
        fontSize,
        lineHeight,
        fontEffect,
        fontEffectColor,
        shadowX,
        shadowY,
        shadowBlur,
        fontBold,
        blockNickname,
        boxEffect,
        boxBorder,
        boxEffectColor,
        boxShadowX,
        boxShadowY,
        boxShadowBlur,
        chatBgColor,
        chatTextColor,
        bodyBgColor,
        enableFadeOut,
        fadeDuration,
        chatMarginBottom,
        userIconSize,
        showBadge,
        badgeTop, // 💡 추가
        stickerSize,
        stickerTop, // 💡 추가
        letterSpacing,
        paddingLeftRight,
        paddingTopBottom,
        showNotice,
        noticeText,
        noticeFontSize,
        noticeBgColor,
        noticeHeight,
        chatRadius,
        noticeRadius,
        showNickname,
        nicknameSuffixType,
        nicknameSuffixCustom,
        nicknameSuffixColor,
        noticeTextColor,
        nameBgColor,
        nameColor,
        nameColorCheck,
        align
    } = state;

    function rgbaToCss({ r, g, b, a }) {
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }

    const actualSuffix = nicknameSuffixType === 'custom' ? nicknameSuffixCustom : nicknameSuffixType;

    const bodyExtras = forCodeView
        ? 'margin: 0 auto;\n  overflow: hidden;'
        : '';
    const rootDiv = forCodeView
        ? '#'
        : '.';
    const bodySelector = forCodeView
        ? 'body'
        : '.preview-box';
    const chattingHeight = forCodeView
        ? '100vh'
        : '100%';
    const viewchattingHeight = forCodeView
        ? ''
        : `max-height: calc(80vh - 4rem - 77px - ${noticeHeight}px) !important;`;
    const mediachattingHeight = forCodeView
        ? ''
        : `
        @media screen and (max-width: 1400px) {
            .preview-panel [class^=live_overlay_chatting] {
                max-height: calc(500px - 4rem - 77px - ${noticeHeight}px) !important;
            }
        }
        `;

    const fontEffectMap = {
        'thin-outline': `
/* 일반 텍스트 및 꼬리말 (paint-order 방식으로 렉 최적화) */
[class^=live_chatting_message_text],
[class^=live_chatting_username_nickname] [class*=name_text],
[class*=live_chatting_username_container]::after {
  -webkit-text-stroke: 5px ${rgbaToCss(fontEffectColor)};
  paint-order: stroke fill;
}

/* 그라디언트 닉네임 (투명도 보존을 위해 기존 drop-shadow 방식 복구) */
[class*=live_chatting_username_has_gradient] [class^=live_chatting_username_nickname] {
  filter: drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 1px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px);
}

/* 그라디언트 내부 글자의 stroke는 강제 제거하여 그림자가 덮는 현상 방지 */
[class*=live_chatting_username_has_gradient] [class^=live_chatting_username_nickname] [class*=name_text] {
  -webkit-text-stroke: 0 !important;
}
`,
        'bold-outline': `
/* 일반 텍스트 및 꼬리말 */
[class^=live_chatting_message_text],
[class^=live_chatting_username_nickname] [class*=name_text],
[class*=live_chatting_username_container]::after {
  -webkit-text-stroke: 8px ${rgbaToCss(fontEffectColor)};
  paint-order: stroke fill;
}

/* 그라디언트 닉네임 (투명도 보존) */
[class*=live_chatting_username_has_gradient] [class^=live_chatting_username_nickname] {
  filter: drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 2px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0.2px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0.1px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px)
  drop-shadow(${rgbaToCss(fontEffectColor)} 0px 0px 0px);
}

[class*=live_chatting_username_has_gradient] [class^=live_chatting_username_nickname] [class*=name_text] {
  -webkit-text-stroke: 0 !important;
}
`,
        'shadow': `
/* 일반 텍스트 및 꼬리말 그림자 */
[class^=live_chatting_message_text],
[class^=live_chatting_username_nickname] [class*=name_text],
[class*=live_chatting_username_container]::after {
  filter: drop-shadow(${rgbaToCss(fontEffectColor)} ${shadowX}px ${shadowY}px ${shadowBlur}px);
}

/* 그라디언트 닉네임 그림자 */
[class*=live_chatting_username_has_gradient] [class^=live_chatting_username_nickname] {
  filter: drop-shadow(${rgbaToCss(fontEffectColor)} ${shadowX}px ${shadowY}px ${shadowBlur}px);
}
[class*=live_chatting_username_has_gradient] [class^=live_chatting_username_nickname] [class*=name_text] {
  filter: none !important;
}
`,
        'none': ''
    };

    const boxEffectMap = {
        'outline': `
  border: ${boxBorder}px solid ${rgbaToCss(boxEffectColor)}
`,
        'shadow': `
  box-shadow: ${rgbaToCss(boxEffectColor)} ${boxShadowX}px ${boxShadowY}px ${boxShadowBlur}px;
`,
        'none': ''
    };

    const fontEffect2Map = {
        'thin-outline': `
[class*=name_has_highlight] [class*=name_text] {
  -webkit-text-stroke: 5px ${rgbaToCss(fontEffectColor)} !important;
  paint-order: stroke fill;
}
`,
        'bold-outline': `
[class*=name_has_highlight] [class*=name_text] {
  -webkit-text-stroke: 8px ${rgbaToCss(fontEffectColor)} !important;
  paint-order: stroke fill;
}
`,
        'shadow': `
[class*=name_has_highlight] [class*=name_text] {
  filter: drop-shadow(${rgbaToCss(fontEffectColor)} ${shadowX}px ${shadowY}px ${shadowBlur}px) !important;
}
`,
        'none': ''
    };

    const alignMap = {
        left: `
      align-items: flex-start;
  `,
        center: `
      align-items: center;
  `,
        right: `
      align-items: flex-end;
  `,
    };

    // 💡 여기에 옵셔널 체이닝(?.)을 추가하여 undefined 에러를 방지합니다.
    const isCssImport = fontUrl?.includes('.css') || fontUrl?.includes('family=') || fontUrl?.includes('/css?');
    
    // 💡 수정된 부분: forPreview가 참일 때는 폰트 로드 구문을 빈 문자열로 반환하여 깜빡임 방지
    const fontFaceConfig = forPreview
        ? '' 
        : (isCssImport 
            ? `@import ${fontUrl};` 
            : `@font-face {
  font-family: '${(fontFamily || '').replace(/['"]/g, '')}'; /* 띄어쓰기가 있는 폰트명을 위해 따옴표 처리 */
  src: ${fontUrl};
  font-weight: ${fontWeight};
  font-style: normal;
  font-display: swap; /* 깜빡임 방지 */
}`);

    return `
${fontFaceConfig}


img,
svg {
    vertical-align: middle;
}
${bodySelector} {
  font-family: '${fontFamily.replace(/['"]/g, '')}';
  background-color: ${rgbaToCss(bodyBgColor)};
  
  font-weight: ${fontBold ? 'bold' : fontWeight};
  
  ${bodyExtras}
}
[class^=live_overlay_chatting] {
  height: ${chattingHeight};
  ${alignMap[align] || ''}
}
${showNotice
            ? `
${rootDiv}root {
  position: relative;
  padding-top: ${noticeHeight}px;
}
${rootDiv}root::before {
  content: '${noticeText}';
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${rgbaToCss(noticeTextColor)};
  background-color: ${rgbaToCss(noticeBgColor)};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: ${noticeFontSize}px !important;
  height: ${noticeHeight}px !important;
  border-radius: ${noticeRadius}px;
}
  
[class^=live_overlay_chatting] {
  height: calc(${chattingHeight} - ${noticeHeight}px);
  ${viewchattingHeight}
}

${mediachattingHeight}

`
            : ''}
[class^=live_chatting_message_wrapper] {
  font-size: ${fontSize}px !important;
  line-height: ${lineHeight}px !important;
  letter-spacing: ${letterSpacing}px !important;
  padding: ${paddingTopBottom}px ${paddingLeftRight}px !important;
}

/* 💡 수정된 부분: 뱃지 위치 조절 (top) */
[class^=live_chatting_username_wrapper] {
  vertical-align: middle;
  position: relative;
  top: ${badgeTop}px;
}

[class^=live_overlay_item] {
  ${enableFadeOut
            ? `
    opacity: 0;
    animation-name: chatting;
    animation-duration: ${fadeDuration}s;
    animation-direction: normal;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  `
            : ''}
  background-color: ${rgbaToCss(chatBgColor)};
  border-radius: ${chatRadius}px;
  margin-bottom: ${chatMarginBottom}px;
  transform: translateZ(0);
  will-change: transform;
  ${boxEffectMap[boxEffect] || ''}
}
  
${enableFadeOut
            ? `
@keyframes chatting {
    0%,
    100% {
        opacity: 0
    }
    1%,
    99% {
        opacity: 1
    }
}
@-webkit-keyframes chatting {
    0%,
    100% {
        opacity: 0
    }
    1%,
    99% {
        opacity: 1
    }
}
`
            : ''}
[class^=live_chatting_username_icon] img {
  width: ${userIconSize}px;
  height: ${userIconSize}px;
  position: relative;
}
[class^=live_chatting_username_icon] {
  vertical-align: top;
}
[class*=badge_container] {
  display: block;
}
${showBadge
            ? ''
            : `
[class^=live_chatting_username_wrapper] {
  display: none !important;
}
`}
${showNickname
            ? ''
            : `
[class*=live_chatting_username_container] {
  display: none !important;
}
  `}

${actualSuffix ? `
[class*=live_chatting_username_container]::after {
  content: "${actualSuffix}";
  white-space: pre;
  color: ${rgbaToCss(nicknameSuffixColor)};
}
${blockNickname ? `[class*=live_chatting_username_container]::after { display: none; }` : ''}
` : ''}

${blockNickname
            ? `
            [class^=live_chatting_message_wrapper] {
              padding: 0!important;
            }
            [class*=live_chatting_username_container] {
              display: block; 
              align-items: center;
              margin-right: 0!important;
              padding: ${paddingTopBottom}px ${paddingLeftRight}px !important;
              border-radius: ${chatRadius}px ${chatRadius}px 0 0;
              background-color: ${rgbaToCss(nameBgColor)}
            }
            [class*=live_chatting_message_text] {
              display: block;
              padding: ${
                nameBgColor.a === 0
                  ? `0px ${paddingLeftRight}px ${paddingTopBottom}px !important`
                  : `${paddingTopBottom}px ${paddingLeftRight}px !important`
              };
            }
  `
            : ''}
${nameColorCheck ? `
            [class*=live_chatting_username_nickname],
            [class*=live_chatting_username_container][class*=live_chatting_username_has_gradient] [class*=live_chatting_username_nickname] {
              color: ${rgbaToCss(nameColor)} !important;
              background: none!important;
            }
            [class*=name_has_highlight] {
              margin: 0;
              padding: 0;
            }
            [class*=name_has_highlight] [class*=name_text] {
                margin: 0px!important;
                padding: 0px!important;
                border-radius: 6px;
                background: none!important;
            }
                ${fontEffect2Map[fontEffect] || ''}
            ` : ''}
[class^=live_chatting_message_container] [class^=live_chatting_message_text] {
  color: ${rgbaToCss(chatTextColor)}!important;
  vertical-align: baseline;
}

/* 💡 수정된 부분: 이모티콘 위치 조절 (top) */
[class^=live_chatting_message_text] img {
  width: ${stickerSize}px;
  height: ${stickerSize}px;
  position: relative;
  top: ${stickerTop}px;
}
${fontEffectMap[fontEffect] || ''}
[class*=name_has_highlight] [class*=name_text] {
    margin: -2px;
    padding: 2px 4px;
    border-radius: 6px;
}
[class*=live_chatting_username_nickname] {
    font-weight: inherit;
}
`.trim();
}