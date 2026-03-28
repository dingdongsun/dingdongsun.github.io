import React, { useState, useEffect } from 'react';
import useCssStore from '../store/useCssStore';
import { generateCSS } from '../utils/generateCSS';
import { toast } from 'sonner'; // App.jsx에 세팅된 토스트 라이브러리 사용
import fan from './img/fan_03.png';
import gold from './img/gold.png';
import icon1 from './img/icon1.png';
import bg1 from './img/bg1.jpg';
import bg2 from './img/bg2.jpg';
import bg3 from './img/bg3.jpg';

import './css/default.css';

function PreviewBox() {
    const cssState = useCssStore((state) => state);
    const viewerNickname = useCssStore((state) => state.viewerNickname);
    const cssCode = generateCSS(cssState, { forPreview: true });
    const previewScale = cssState.previewScale;
    const setPreviewScale = cssState.setPreviewScale;
    const applyPreset = cssState.applyPreset; // 프리셋 적용을 위한 store 함수
    const [bgImage, setBgImage] = useState(bg1);

    // 💡 프리셋 관련 State 추가
    const [presetName, setPresetName] = useState('');
    const [savedPresets, setSavedPresets] = useState([]);
    const [isPresetModalOpen, setIsPresetModalOpen] = useState(false);
    const [confirmModal, setConfirmModal] = useState({ isOpen: false, targetId: null });

    // 💡 초기 마운트 시 로컬스토리지에서 프리셋 불러오기
    useEffect(() => {
        const stored = localStorage.getItem('myChatPresets');
        if (stored) {
            try {
                setSavedPresets(JSON.parse(stored));
            } catch (error) {
                console.error("프리셋 데이터를 불러오는데 실패했습니다.", error);
            }
        }
    }, []);

    // 💡 프리셋 저장 함수
    const handleSavePreset = () => {
        if (!presetName.trim()) {
            toast.error('프리셋 이름을 입력해주세요.');
            return;
        }

        // Store 상태 중 함수(set 함수 등)를 제외한 순수 데이터만 추출
        const presetData = {};
        for (const key in cssState) {
            if (typeof cssState[key] !== 'function') {
                presetData[key] = cssState[key];
            }
        }

        const newPreset = {
            id: Date.now().toString(),
            name: presetName,
            data: presetData,
            date: new Date().toLocaleDateString()
        };

        const updatedPresets = [...savedPresets, newPreset];
        setSavedPresets(updatedPresets);
        localStorage.setItem('myChatPresets', JSON.stringify(updatedPresets));
        setPresetName('');
        toast.success(`'${presetName}' 프리셋이 저장되었습니다.`);
    };

    // 💡 프리셋 적용 함수
    const handleApplyPreset = (preset) => {
        applyPreset(preset.data);
        toast.success(`'${preset.name}' 프리셋이 적용되었습니다.`);
        setIsPresetModalOpen(false);
    };

    // 💡 프리셋 삭제 로직 (모달 노출)
    const requestDeletePreset = (id) => {
        setConfirmModal({ isOpen: true, targetId: id });
    };

    // 💡 삭제 최종 확인
    const confirmDelete = () => {
        const updatedPresets = savedPresets.filter(p => p.id !== confirmModal.targetId);
        setSavedPresets(updatedPresets);
        localStorage.setItem('myChatPresets', JSON.stringify(updatedPresets));
        setConfirmModal({ isOpen: false, targetId: null });
        toast.success('프리셋이 삭제되었습니다.');
        
        // 모두 삭제되었을 경우 모달 닫기
        if (updatedPresets.length === 0) {
            setIsPresetModalOpen(false);
        }
    };

    return (
        <div
            className="preview-panel"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative' // 모달 띄우기를 위해 relative 추가
            }}>
            <div className='preview-wrapper'>
                <div className='live-wrapper'>
                    <h2 style={{ color: bgImage === bg2 ? '#000000' : undefined }}>실시간 미리보기
                        <p>(배율은 반영되지 않습니다. obs등에서 직접 사이즈 조절해주세요.)</p>
                    </h2>
                    <style>{cssCode}</style>
                    <div className='preset-wrapper'>
                        <div className='button-wrapper' style={{ marginBottom: 12 }}>
                            <button onClick={() => setPreviewScale(0.5)}>0.5배</button>
                            <button onClick={() => setPreviewScale(0.75)}>0.75배</button>
                            <button onClick={() => setPreviewScale(1)}>1배</button>
                            <button onClick={() => setBgImage(bg1)}>기본 배경</button>
                            <button onClick={() => setBgImage(bg2)}>밝은 배경</button>
                            <button onClick={() => setBgImage(bg3)}>어두운 배경</button>
                        </div>
                        {/* 💡 프리셋 저장 UI 영역 추가 */}
                        <div className='preset-control-wrapper' style={{ marginBottom: 12, display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <input 
                                type="text" 
                                placeholder="프리셋 이름" 
                                value={presetName}
                                onChange={(e) => setPresetName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
                            />
                            <button onClick={handleSavePreset} style={{whiteSpace: 'nowrap'}}>저장하기</button>
                            {savedPresets.length > 0 && (
                                <button 
                                    onClick={() => setIsPresetModalOpen(true)}
                                    style={{ backgroundColor: '#333', borderColor: '#333', color: '#fff', whiteSpace: 'nowrap' }}
                                >
                                    내 프리셋 보기
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                
                <div className="preview-box">
                    <div className="root" style={{ transform: `scale(${previewScale})` }}>
                        <div className="live_overlay_chatting__gG7gu">
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr" style={{ marginRight: 6 }}><span className="live_chatting_username_wrapper__iJpJB"><span className="live_chatting_username_icon__6Dj7b"><span className="badge_container__a64XB"><img src={gold} alt="" width="28" height="28" /></span></span><span className="live_chatting_username_icon__6Dj7b"><span className="badge_container__a64XB"><img src={icon1} alt="" width="28" height="28" /></span></span><span className="live_chatting_username_icon__6Dj7b"><span className="badge_container__a64XB"><img src={fan} alt="" width="28" height="28" /></span></span></span><span className="live_chatting_username_nickname__dDbbj" style={{ color: `rgb(255, 255, 255)` }}><span className=""><span className="name_text__yQG50">{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH">님이 1,000치즈를 후원했습니다.<br />치즈후원테스트입니다.<img alt="" src="https://ssl.pstatic.net/static/nng/glive/icon/c_05.png?type=f60_60" /><img alt="" src="https://ssl.pstatic.net/static/nng/glive/icon/c_05.png?type=f60_60" /></span></div>
                                </div>
                            </div>
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr" style={{ marginRight: 6 }}><span className="live_chatting_username_wrapper__iJpJB"><span className="live_chatting_username_icon__6Dj7b"><span className="badge_container__a64XB"><img src={icon1} alt="" width="28" height="28" /></span></span></span><span className="live_chatting_username_nickname__dDbbj" style={{ color: `rgba(20, 21, 23, 0)` }}><span className=""><span className="name_text__yQG50">{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH">투명닉네임적용테스트</span></div>
                                </div>
                            </div>
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr" style={{ marginRight: 6 }}><span className="live_chatting_username_wrapper__iJpJB"><span className="live_chatting_username_icon__6Dj7b"><span className="badge_container__a64XB"><img src={icon1} alt="" width="28" height="28" /></span></span></span><span className="live_chatting_username_nickname__dDbbj" style={{ color: `rgb(201, 206, 220)` }}><span className="name_has_highlight__jLpxr"><span className="name_text__yQG50" style={{ backgroundColor: `rgb(62, 18, 82)` }}>{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH">하이라이트닉네임테스트</span></div>
                                </div>
                            </div>
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr live_chatting_username_has_gradient__zFzFH" style={{ marginRight: 6 }}><span className="live_chatting_username_wrapper__iJpJB"><span className="live_chatting_username_icon__6Dj7b"><span className="badge_container__a64XB"><img src={fan} alt="" width="28" height="28" /></span></span></span><span className="live_chatting_username_nickname__dDbbj" style={{ backgroundImage: `linear-gradient(to right, rgb(243, 230, 89), rgb(254, 122, 134))`, color: `rgb(243, 230, 89)` }}><span className=""><span className="name_text__yQG50">{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH">그라디언트닉네임테스트</span></div>
                                </div>
                            </div>
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr" style={{ marginRight: 6 }}><span className="live_chatting_username_nickname__dDbbj" style={{ color: `rgb(173, 210, 222)` }}><span className=""><span className="name_text__yQG50">{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH">안녕하세요. 형광팬 시청자 입니다. 긴글 테스트입니다. 긴글은 이렇게 들어갑니다. 하지만 너무나 만들고 향할 것 향할 없든 리가 꽃잎을 이렇게 생명이 일편단심 까닭입니다. 나는 무엇인지 백골이 까닭입니다. 살았었다 향해 소멸시키는 먼지와 가난한 붉은 가실 가을 이었다.<img alt="" src="https://ssl.pstatic.net/static/nng/glive/icon/c_05.png?type=f60_60" /><img alt="" src="https://ssl.pstatic.net/static/nng/glive/icon/c_05.png?type=f60_60" /></span></div>
                                </div>
                            </div>
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr" style={{ marginRight: 6 }}><span className="live_chatting_username_nickname__dDbbj" style={{ color: `rgb(173, 210, 222)` }}><span className=""><span className="name_text__yQG50">{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH">짧은글 테스트 입니다.</span></div>
                                </div>
                            </div>
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr" style={{ marginRight: 6 }}><span className="live_chatting_username_nickname__dDbbj" style={{ color: `rgb(173, 210, 222)` }}><span className=""><span className="name_text__yQG50">{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH"><img alt="" src="https://ssl.pstatic.net/static/nng/glive/icon/c_05.png?type=f60_60" /><img alt="" src="https://ssl.pstatic.net/static/nng/glive/icon/c_05.png?type=f60_60" /></span></div>
                                </div>
                            </div>
                            <div className="live_overlay_item__Sg18i live_overlay_message__lLCT1">
                                <div className="live_chatting_message_container__vrI-y live_chatting_message_is_overlay__cALCf">
                                    <div className="live_chatting_message_wrapper__xpYre"><span className="live_chatting_username_container__m1-i5 live_chatting_username_is_message__jvTvP live_chatting_username_is_overlay__A8Xmr" style={{ marginRight: 6 }}><span className="live_chatting_username_nickname__dDbbj" style={{ color: `rgb(173, 210, 222)` }}><span className=""><span className="name_text__yQG50">{viewerNickname}</span></span></span></span><span className="live_chatting_message_text__DyleH">짧은글 테스트 입니다.<img alt="" src="https://ssl.pstatic.net/static/nng/glive/icon/c_05.png?type=f60_60" /></span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 💡 프리셋 목록 모달 */}
            {isPresetModalOpen && (
                <div className="custom-modal-overlay">
                    <div className="custom-modal-content">
                        <h3>내 프리셋 목록</h3>
                        <ul className="preset-list">
                            {savedPresets.map(preset => (
                                <li key={preset.id}>
                                    <span className="preset-name">{preset.name} <small>({preset.date})</small></span>
                                    <div className="preset-actions">
                                        <button className="apply-btn" onClick={() => handleApplyPreset(preset)}>적용</button>
                                        <button className="delete-btn" onClick={() => requestDeletePreset(preset.id)}>삭제</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <button className="close-btn" onClick={() => setIsPresetModalOpen(false)}>닫기</button>
                    </div>
                </div>
            )}

            {/* 💡 커스텀 삭제 확인 모달 */}
            {confirmModal.isOpen && (
                <div className="custom-modal-overlay" style={{ zIndex: 1000 }}>
                    <div className="custom-modal-content confirm-modal">
                        <h3 style={{ color: '#ff4d4f', textAlign: 'center' }}>프리셋 삭제</h3>
                        <p style={{ textAlign: 'center', margin: '16px 0' }}>해당 프리셋을 정말 삭제하시겠습니까?</p>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button 
                                onClick={confirmDelete} 
                                style={{ background: '#ff4d4f', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                삭제
                            </button>
                            <button 
                                onClick={() => setConfirmModal({ isOpen: false, targetId: null })}
                                style={{ background: '#ddd', color: '#333', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                취소
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PreviewBox;