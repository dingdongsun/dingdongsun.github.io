// src/utils/geminiApi.js

const FIXED_VIEWER_NICKNAME = "시청자별명";
const FIXED_BODY_BG_COLOR = { r: 0, g: 0, b: 0, a: 0 };

const getSystemInstruction = (fontNames) => `
너는 방송용 채팅창 스타일 UI 디자이너다.
사용자의 요청 분위기, 감성, 가독성, 방송 오버레이 사용성을 종합적으로 판단해서
"완성형 채팅창 프리셋 JSON" 1개를 생성한다.

[최우선 규칙]
1. 반드시 순수 JSON 객체 1개만 응답한다.
2. 코드블록(\`\`\`), 설명문, 주석, 마크다운, 앞뒤 텍스트를 절대 포함하지 않는다.
3. 모든 필드는 반드시 빠짐없이 포함한다. 어떤 키도 생략하면 안 된다.
4. 사용자의 요청 분위기에 맞게 각 값을 스스로 판단해서 생성한다.
5. 아래 다섯 필드는 사용자의 요청과 관계없이 항상 고정값으로 출력한다.
   - "enableFadeOut": false
   - "showNotice": false
   - "fontBold": false
   - "bodyBgColor": { "r": 0, "g": 0, "b": 0, "a": 0 }
   - "viewerNickname": "시청자별명"
6. 위 다섯 필드는 절대 다른 값으로 바꾸지 말고, 반드시 JSON에 포함한다.
7. enableFadeOut / showNotice 가 false여도 관련 필드는 반드시 함께 생성한다.
   - fadeDuration
   - noticeText
   - noticeFontSize
   - noticeBgColor
   - noticeHeight
   - noticeRadius
   - noticeTextColor
8. fontFamily는 반드시 다음 목록 중 하나만 선택한다:
   [${fontNames.join(", ")}]

[가독성 / 대비 규칙]
1. 모든 텍스트와 배경 조합은 충분하고 명확한 대비를 가져야 한다.
2. 특히 chatTextColor 와 chatBgColor 는 한눈에 읽혀야 한다.
3. chatTextColor 와 chatBgColor 의 대비가 충분하면 fontEffect는 반드시 "none"을 우선 선택한다.
4. 대비가 약간 애매한 정도라면 먼저 chatTextColor, chatBgColor 자체를 더 잘 보이도록 조정하고, fontEffect 추가는 마지막 수단으로 사용한다.
5. 텍스트가 실제로 잘 안 읽힐 정도로 대비가 부족할 때만 fontEffect를 "thin-outline" 또는 "bold-outline"로 설정한다.
6. 위 경우 fontEffectColor 는 chatTextColor 또는 chatBgColor 와 명확히 대비되는 색으로 설정한다.
7. outline 보정이 필요할 때는
   - 밝은 글자에는 어두운 outline
   - 어두운 글자에는 밝은 outline
   을 우선 사용한다.
8. shadow는 글자가 번져 보일 수 있으므로 가독성 보정용으로 거의 사용하지 않는다.
9. chatTextColor / chatBgColor 뿐 아니라 아래 조합도 모두 대비가 충분해야 한다.
   - noticeTextColor ↔ noticeBgColor
   - nameColor ↔ nameBgColor
   - chatTextColor ↔ 실제 방송 배경 위 시인성
   - fontEffectColor ↔ chatTextColor
10. 대비가 애매하면 장식성보다 가독성을 우선하되, 가능하면 색상 조정으로 먼저 해결한다.
11. fontEffect는 기본적으로 자주 사용하지 않는다. 특별한 이유가 없으면 "none"을 사용한다.

[불리언 필드 생성 규칙]
1. 아래 불리언 값들은 AI가 사용자의 컨셉, 정보량, 가독성, 화면 복잡도를 함께 고려해서 true/false를 결정한다.
   - showBadge
   - showNickname
   - blockNickname
   - nameColorCheck
2. 단, enableFadeOut / showNotice / fontBold 만 예외적으로 항상 false 고정이다.
3. 불리언은 "보여도 된다"가 아니라 "정말 보여야 더 좋아지는가?"를 기준으로 판단한다.
4. 장식 요소는 기본적으로 보수적으로 사용한다.
5. showBadge는 귀여움, 게임풍, 캐릭터성, 장식성, 활발한 방송 분위기처럼
   시각적 포인트가 실제로 도움이 되는 경우에만 true로 한다.
6. 미니멀, 감성, 고급스러움, 깔끔함, 가독성 중심, 텍스트 중심 테마에서는
   showBadge를 우선 false로 고려한다.
7. showNickname은 채팅 참여자 구분이 중요한 테마에서는 true,
   메시지 자체의 몰입감이 더 중요한 테마에서는 false도 고려한다.
8. blockNickname은 닉네임을 배지처럼 강조하는 디자인이 컨셉상 필요할 때만 true로 한다.
9. nameColorCheck는 닉네임만 별도 강조색이 필요할 때만 true로 한다.
10. true로 설정한 불리언은 반드시 연관 필드까지 의미 있게 함께 설계한다.
11. false로 설정하더라도 해당 키와 관련 필드는 생략하지 말고 모두 출력한다.
12. 특별한 이유가 약하면 장식 요소(showBadge, blockNickname, nameColorCheck)는 false를 우선 고려한다.

[불리언별 연관 설계 규칙]
1. showBadge가 true이면
   - userIconSize와 badgeTop을 현재 컨셉에 맞게 조정한다.
   - 귀엽고 장식적인 테마는 조금 크게, 미니멀/텍스트 중심 테마는 절제된 값으로 설정한다.
2. showNickname이 true이면
   - 닉네임 표시가 전체 레이아웃에서 자연스럽도록 nameColorCheck, blockNickname, align, padding 등을 함께 고려한다.
3. showNickname이 false이면
   - blockNickname과 nameColorCheck는 보통 false가 자연스럽지만,
     전체 데이터 구조는 유지해야 하므로 키는 반드시 포함한다.
4. blockNickname이 true이면
   - nameBgColor를 단순 기본값이 아닌, 컨셉에 맞는 의미 있는 색으로 설정한다.
   - 닉네임 줄바꿈이 생겨도 보기 좋게 chatRadius, padding, align과 조화를 맞춘다.
5. nameColorCheck가 true이면
   - nameColor를 반드시 컨셉에 맞게 따로 설계한다.
   - nameBgColor와의 대비가 충분한 색을 사용한다.
6. nameColorCheck가 false이면
   - nameColor 필드도 반드시 포함하되, 과도한 의미를 부여하지 않아도 된다.
7. showNotice는 항상 false이지만
   - noticeText, noticeFontSize, noticeBgColor, noticeHeight, noticeRadius, noticeTextColor는 완성형 프리셋처럼 자연스럽게 생성한다.
   - noticeTextColor와 noticeBgColor의 대비는 반드시 충분해야 한다.
8. enableFadeOut은 항상 false이지만
   - fadeDuration은 여전히 자연스러운 기본값으로 생성한다.
9. fontBold는 항상 false이므로
   - 폰트 굵기 강조 대신 fontSize, letterSpacing, fontEffect, color 대비로 컨셉을 표현한다.

[스타일 설계 원칙]
1. 사용자가 말한 분위기(예: 빈티지, 사이버펑크, 귀여움, 미니멀, 감성적, 화려함)에 맞게
   색상, 폰트, 테두리, 그림자, 닉네임 표시 여부, 정렬, 패딩, 라운드값을 유기적으로 설계한다.
2. 채팅창은 실제 방송 오버레이에 쓰인다고 가정하고 가독성을 최우선으로 고려한다.
3. chatTextColor와 chatBgColor는 항상 충분한 대비를 가져야 한다.
4. fontEffect, boxEffect, nameBgColor, nameColor, notice 계열 색상은 전체 컨셉과 일관성 있게 만든다.
5. 지나치게 극단적인 수치 대신 실제로 보기 좋은 범위 안에서 자연스럽게 생성한다.
6. label은 사용자가 요청한 분위기를 잘 표현하는 짧고 직관적인 프리셋 이름으로 만든다.
7. 장식보다 시인성을 우선한다.

[fontEffect 규칙]
1. fontEffect는 아래 중 하나만 선택:
   "none", "shadow", "thin-outline", "bold-outline"
2. 기본값으로는 "none"을 가장 우선적으로 고려한다.
3. shadow는 글자가 번져 보이거나 흐려 보일 수 있으므로, 네온/발광/몽환 느낌이 정말 필요한 경우가 아니면 사용하지 않는다.
4. thin-outline 또는 bold-outline는 텍스트가 실제로 잘 안 보일 때만 제한적으로 사용한다.
5. 대비가 충분하면 outline을 추가하지 않는다.
6. 특별한 이유가 없다면 fontEffect는 "none"을 선택한다.
7. effect를 쓴다면 shadow보다 outline 계열을 우선 고려한다.
8. 굵은 장식 효과는 남발하지 말고, 전체 프리셋 중 포인트가 필요할 때만 사용한다.
9. chatTextColor 와 chatBgColor 대비가 충분하면 fontEffect는 "none"을 사용한다.

[기타 값 규칙]
1. 색상 객체는 반드시 아래 형식:
   { "r": 0~255, "g": 0~255, "b": 0~255, "a": 0~1 }
2. boxEffect는 아래 중 하나만 선택:
   "none", "outline", "shadow"
3. align은 아래 중 하나만 선택:
   "left", "center", "right"
4. boolean 필드는 true/false만 사용한다.
5. 숫자 필드는 숫자형으로만 작성한다.
6. 문자열 필드는 자연스러운 값으로 작성한다.

[절대 금지]
- enableFadeOut을 true로 출력하는 것
- showNotice를 true로 출력하는 것
- fontBold를 true로 출력하는 것
- bodyBgColor를 투명 이외의 값으로 출력하는 것
- viewerNickname을 "시청자별명" 이외의 값으로 출력하는 것
- 텍스트와 배경의 대비가 불명확한 조합을 만드는 것
- 대비가 부족한데도 outline 보정을 성급하게 남발하는 것
- 불리언을 대충 기본값으로만 채우고 연관 필드를 생각하지 않는 것
- shadow를 습관적으로 남발하는 것
- 키를 생략하는 것
- fontFamily를 목록 밖에서 선택하는 것

[출력 JSON 스키마]
{
  "label": "테마 이름",
  "fontFamily": "선택한 폰트 이름",
  "fontSize": 28,
  "fontBold": false,
  "lineHeight": 36,
  "fontEffect": "none",
  "fontEffectColor": { "r": 0, "g": 0, "b": 0, "a": 1 },
  "shadowX": 2,
  "shadowY": 2,
  "shadowBlur": 4,
  "boxEffect": "none",
  "boxBorder": 1,
  "boxEffectColor": { "r": 0, "g": 0, "b": 0, "a": 1 },
  "boxShadowX": 2,
  "boxShadowY": 2,
  "boxShadowBlur": 4,
  "chatBgColor": { "r": 255, "g": 255, "b": 255, "a": 0.8 },
  "chatTextColor": { "r": 0, "g": 0, "b": 0, "a": 1 },
  "bodyBgColor": { "r": 0, "g": 0, "b": 0, "a": 0 },
  "enableFadeOut": false,
  "fadeDuration": 30,
  "chatMarginBottom": 10,
  "showBadge": false,
  "userIconSize": 32,
  "badgeTop": 0,
  "stickerSize": 48,
  "stickerTop": 0,
  "showNotice": false,
  "noticeText": "방송 공지가 들어갑니다.",
  "noticeFontSize": 28,
  "noticeBgColor": { "r": 0, "g": 0, "b": 0, "a": 0.5 },
  "noticeHeight": 64,
  "chatRadius": 12,
  "noticeRadius": 12,
  "showNickname": true,
  "blockNickname": false,
  "viewerNickname": "시청자별명",
  "letterSpacing": 0,
  "noticeTextColor": { "r": 255, "g": 255, "b": 255, "a": 1 },
  "paddingTopBottom": 8,
  "paddingLeftRight": 13,
  "previewScale": 1,
  "nameBgColor": { "r": 255, "g": 255, "b": 255, "a": 0 },
  "nameColor": { "r": 0, "g": 0, "b": 0, "a": 1 },
  "nameColorCheck": false,
  "align": "left"
}
`;

const fallbackPreset = {
  label: "기본 테마",
  fontFamily: "",
  fontSize: 28,
  fontBold: false,
  lineHeight: 36,
  fontEffect: "none",
  fontEffectColor: { r: 0, g: 0, b: 0, a: 1 },
  shadowX: 2,
  shadowY: 2,
  shadowBlur: 4,
  boxEffect: "none",
  boxBorder: 1,
  boxEffectColor: { r: 0, g: 0, b: 0, a: 1 },
  boxShadowX: 2,
  boxShadowY: 2,
  boxShadowBlur: 4,
  chatBgColor: { r: 255, g: 255, b: 255, a: 0.8 },
  chatTextColor: { r: 0, g: 0, b: 0, a: 1 },
  bodyBgColor: FIXED_BODY_BG_COLOR,
  enableFadeOut: false,
  fadeDuration: 30,
  chatMarginBottom: 10,
  showBadge: false,
  userIconSize: 32,
  badgeTop: 0,
  stickerSize: 48,
  stickerTop: 0,
  showNotice: false,
  noticeText: "방송 공지가 들어갑니다.",
  noticeFontSize: 28,
  noticeBgColor: { r: 0, g: 0, b: 0, a: 0.5 },
  noticeHeight: 64,
  chatRadius: 12,
  noticeRadius: 12,
  showNickname: true,
  blockNickname: false,
  viewerNickname: FIXED_VIEWER_NICKNAME,
  letterSpacing: 0,
  noticeTextColor: { r: 255, g: 255, b: 255, a: 1 },
  paddingTopBottom: 8,
  paddingLeftRight: 13,
  previewScale: 1,
  nameBgColor: { r: 255, g: 255, b: 255, a: 0 },
  nameColor: { r: 0, g: 0, b: 0, a: 1 },
  nameColorCheck: false,
  align: "left",
};

const safeParseJson = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error("AI 응답에서 JSON 객체를 찾지 못했습니다.");
    }
    return JSON.parse(match[0]);
  }
};

const getRawErrorMessage = (error) => {
  if (!error) return "";

  if (typeof error?.message === "string") return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
};

const getParsedApiError = (error) => {
  const rawMessage = getRawErrorMessage(error);

  try {
    const parsed = JSON.parse(rawMessage);
    return parsed?.error || null;
  } catch {
    return null;
  }
};

export const normalizeGeminiError = (error) => {
  const rawMessage = getRawErrorMessage(error);
  const apiError = getParsedApiError(error);

  const status =
    error?.status ||
    apiError?.code ||
    null;

  const apiStatus =
    apiError?.status ||
    error?.name ||
    "";

  const apiMessage =
    apiError?.message ||
    rawMessage ||
    "알 수 없는 오류가 발생했습니다.";

  const mergedText = `${apiStatus} ${apiMessage} ${rawMessage}`.toLowerCase();

  const isRateLimit =
    status === 429 ||
    mergedText.includes("resource_exhausted") ||
    mergedText.includes("rate limit") ||
    mergedText.includes("too many requests") ||
    mergedText.includes("quota");

  const isInvalidApiKey =
    mergedText.includes("api_key_invalid") ||
    mergedText.includes("api key not valid") ||
    mergedText.includes("invalid api key");

  const isBlocked =
    mergedText.includes("blocked") ||
    mergedText.includes("safety");

  const isNetwork =
    mergedText.includes("failed to fetch") ||
    mergedText.includes("networkerror") ||
    mergedText.includes("load failed") ||
    mergedText.includes("network request failed");

  let userMessage = "프리셋 생성에 실패했습니다. 잠시 후 다시 시도해주세요.";
  let code = "UNKNOWN_ERROR";

  if (isRateLimit) {
    userMessage = "요청이 너무 많아요. 잠시 후 다시 시도해주세요.";
    code = "RATE_LIMIT";
  } else if (isInvalidApiKey) {
    userMessage = "Gemini API 키가 올바르지 않습니다. API 키 설정을 확인해주세요.";
    code = "INVALID_API_KEY";
  } else if (isNetwork) {
    userMessage = "네트워크 연결이 불안정합니다. 인터넷 연결 상태를 확인해주세요.";
    code = "NETWORK_ERROR";
  } else if (isBlocked) {
    userMessage = "입력 내용이 정책상 제한되어 요청을 처리할 수 없습니다. 문구를 조금 바꿔서 다시 시도해주세요.";
    code = "SAFETY_BLOCKED";
  }

  return {
    name: "GeminiNormalizedError",
    status,
    code,
    apiStatus,
    apiMessage,
    rawMessage,
    isRateLimit,
    isInvalidApiKey,
    isNetwork,
    isBlocked,
    userMessage,
    originalError: error,
  };
};

export const generatePresetFromGemini = async (userPrompt, fontNames) => {
  // 내 Cloudflare Worker 주소를 .env에서 가져옵니다.
  const WORKER_URL = process.env.REACT_APP_WORKER_URL; 

  if (!WORKER_URL) {
    throw normalizeGeminiError(new Error("REACT_APP_WORKER_URL이 설정되지 않았습니다."));
  }

  // REST API 규격에 맞게 페이로드 작성
  const payload = {
    model: "gemini-2.5-flash", // Worker에서 사용할 모델
    systemInstruction: {
      parts: [{ text: getSystemInstruction(fontNames) }]
    },
    contents: [{
      role: "user",
      parts: [{
              text: `
사용자 요청:
${userPrompt}

반드시 지킬 것:
- enableFadeOut은 항상 false
- showNotice는 항상 false
- fontBold는 항상 false
- bodyBgColor는 항상 완전 투명
- viewerNickname은 항상 "시청자별명"
- 위 다섯 항목도 JSON에 반드시 포함
- chatBgColor와 chatTextColor의 대비는 반드시 명확해야 함
- 대비가 충분하면 fontEffect는 none 우선
- fontEffect는 기본적으로 자주 사용하지 말 것
- 대비가 조금 애매한 정도면 먼저 색상 자체를 조정하고, fontEffect 추가는 마지막 수단으로 사용할 것
- 텍스트가 실제로 잘 안 보일 때만 thin-outline 또는 bold-outline 사용
- 그 경우 fontEffectColor는 chatTextColor 또는 chatBgColor와 명확히 대비되는 색 사용
- noticeTextColor / noticeBgColor, nameColor / nameBgColor 도 대비가 명확해야 함
- shadow는 글자가 번져 보일 수 있으므로 거의 사용하지 말 것
- 특별한 이유가 없다면 fontEffect는 none 우선
- showBadge, showNickname, blockNickname, nameColorCheck 는 컨셉에 맞게 AI가 직접 판단
- 장식 요소는 기본적으로 보수적으로 판단
- showBadge는 귀엽고 장식적인 컨셉에서만 true를 고려
- 미니멀/깔끔/가독성 중심이면 showBadge를 우선 false로 고려
- true로 선택한 불리언은 연관 필드까지 같이 설계
- false로 선택한 불리언도 키는 반드시 포함
- 나머지 모든 필드는 빠짐없이 생성
      `,
      }]
    }],
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 1.0,
    }
  };

  try {
    // 구글 API 대신 내 Cloudflare Worker로 요청! (API 키는 필요 없음)
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    // 에러 발생 시 (429, 400 등)
    if (!response.ok) {
      throw data; // 에러 객체를 던지면 아래 catch에서 normalizeGeminiError가 처리함
    }

    // 응답 텍스트 추출 (REST API 응답 구조)
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!textResponse) {
      throw new Error("AI 응답이 올바르지 않습니다.");
    }

    const parsed = safeParseJson(textResponse);

    const selectedFontName = fontNames.includes(parsed.fontFamily)
      ? parsed.fontFamily
      : fontNames[0] || "";

    return {
      ...fallbackPreset,
      ...parsed,
      fontFamily: selectedFontName,
      enableFadeOut: false,
      showNotice: false,
      fontBold: false,
      bodyBgColor: FIXED_BODY_BG_COLOR,
      viewerNickname: FIXED_VIEWER_NICKNAME,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    const normalizedError = normalizeGeminiError(error);
    console.error("Normalized Gemini Error:", normalizedError);
    throw normalizedError;
  }
};