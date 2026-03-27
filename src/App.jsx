import React from 'react';
import OptionPanel from './components/OptionPanel';
import CodeOutput from './components/CodeOutput';
import PreviewBox from './components/PreviewBox';
import './index.css'
import logo from './logo.svg';
import { Toaster } from 'sonner';
function App() {
    return (
        <div className='main-wrapper'>
            <Toaster position="top-center" style={{fontFamily: 'Paperlogy'}} richColors />
            <h1 className='title'><img src={logo} alt='chzzk' height={36} style={{backgroundColor: 'black', padding: 6, borderRadius: 6, verticalAlign: 'middle', position: 'relative', top: -3}}/> 채팅창 CSS 커스터마이저 
            <CodeOutput /></h1>
            <div className='custom-view'>
                <div className='option-panel'>
                    <OptionPanel />
                    <div className="adfit-wrapper">
                        <ins className="kakao_ad_area" style={{display:'none'}}
                        data-ad-unit="DAN-Q8IGdpuqYxNw4U9w"
                        data-ad-width="320"
                        data-ad-height="100"></ins>
                        <script type="text/javascript" src="//t1.daumcdn.net/kas/static/ba.min.js" async></script>
                    </div>
                </div>
                <PreviewBox />
            </div>
        </div>
    );
}
export default App;