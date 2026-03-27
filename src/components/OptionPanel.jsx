import React, { useEffect } from 'react';
import useCssStore from '../store/useCssStore';
import ColorPickerField from './ColorPickerField';
import PresetButton from './PresetButton';
// import ExportPresetButton from './ExportPresetButton';

const fontList = [
    {
        name: `'CookieRun-Regular'`,
        label: 'CookieRun',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/CookieRun-Regular.woff') format('woff')`
    },
    {
        name: 'Cafe24ProSlim',
        label: 'Cafe24 PRO SLIM',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/Cafe24PROSlim-Regular.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/Cafe24PROSlim-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/Cafe24PROSlim-Regular.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/Cafe24PROSlim-Bold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Single Day',
        label: 'DX단하루',
        url: `url('https://fonts.googleapis.com/css2?family=Single+Day&display=swap')`
    },
    {
        name: 'GothicA1',
        label: 'Gothic A1',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/GothicA1-Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'GMarketSans',
        label: 'G마켓 산스',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff') format('woff')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansBold.woff') format('woff')` },
        ]
    },
    {
        name: 'HbiosSys',
        label: 'HBIOS-SYS',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/HBIOS-SYS.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/HBIOS-SYS.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HsFallThought',
        label: 'HS가을생각체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSGaeulsenggak.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSGaeulsenggak.woff') format('woff')` },
        ]
    },
    {
        name: 'HsFallThought20',
        label: 'HS가을생각체2.0',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSGaeulSenggak20.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSGaeulSenggak20.woff') format('woff')` },
        ]
    },
    {
        name: 'HsWinterSnowFlower',
        label: 'HS겨울눈꽃체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSGyoulnoonkot.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSGyoulnoonkot.woff') format('woff')` },
        ]
    },
    {
        name: 'HsWinterSnowflake20',
        label: 'HS겨울눈꽃체2.0',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/HSGyeoulNoonkott20.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/HSGyeoulNoonkott20.woff') format('woff')` },
        ]
    },
    {
        name: 'HsGultokki',
        label: 'HS굴토끼체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/HSGooltokki.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/HSGooltokki.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HsDukkeobi',
        label: 'HS두꺼비체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2406@1.0/HSDuggobi.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2406@1.0/HSDuggobi.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HsBombaram20',
        label: 'HS봄바람체 2.0',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff') format('woff')` },
        ]
    },
    {
        name: 'HsBombaram21',
        label: 'HS봄바람체 2.1',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSBombaram21-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSBombaram21-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HsBombaram30',
        label: 'HS봄바람체 3.0',
        url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.1/HSBombaram3_Regular.woff') format('woff')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.1/HSBombaram3_Thin.woff') format('woff')` },
            { value: 400, url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.1/HSBombaram3_Regular.woff') format('woff')` },
        ]
    },
    {
        name: 'HsSantoki',
        label: 'HS산토끼체',
        url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/HS-Regular.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/HS-Regular.woff') format('woff')` },
        ]
    },
    {
        name: 'HsSantoki20',
        label: 'HS산토끼체2.0',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSSanTokki20-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HsSaemaul',
        label: 'HS새마을체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSSaemaul-Regular.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSSaemaul-Regular.woff') format('woff')` },
        ]
    },
    {
        name: 'HsSummerWaterLight',
        label: 'HS여름물빛체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSSummer.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSSummer.woff') format('woff')` },
        ]
    },
    {
        name: 'HsSummerWaterLight20',
        label: 'HS여름물빛체2.0',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSYeoleum20-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2405@1.0/HSYeoleum20-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HsYuji',
        label: 'HS유지체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSYuji-Regular.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/HSYuji-Regular.woff') format('woff')` },
        ]
    },
    {
        name: 'HsJibtokiRound',
        label: 'HS집토끼체 라운드',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSJiptokki-Round.woff2') format('woff2')`,
        weight: [
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSJiptokki-Round.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HsHouseRabbitBlack',
        label: 'HS집토끼체 블랙',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSJiptokki-Black.woff2') format('woff2')`,
        weight: [
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/HSJiptokki-Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'IbmPlexSans',
        label: 'IBM Plex Sans',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff')`,
        weight: [
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-ExtraLight.woff') format('woff')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Light.woff') format('woff')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Regular.woff') format('woff')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-Medium.woff') format('woff')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-07@1.0/IBMPlexSansKR-SemiBold.woff') format('woff')` },
        ]
    },
    {
        name: 'JMischievous',
        label: 'J개구쟁이',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JGaegujaengyi-Light-KO.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JGaegujaengyi-Light-KO.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JGaegujaengyi-Medium-KO.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JGaegujaengyi-Bold-KO.woff2') format('woff2')` },
        ]
    },
    {
        name: 'JSunflower',
        label: 'J해바라기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JHaebaragi-Light-KO.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JHaebaragi-Light-KO.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JHaebaragi-Medium-KO.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JHaebaragi-Bold-KO.woff2') format('woff2')` },
        ]
    },
    {
        name: `'KCC-Ganpan'`,
        label: 'KCC간판체',
        url: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/KCC-Ganpan.woff2') format('woff2')`
    },
    {
        name: 'KccAnchangho',
        label: 'KCC 안창호체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/KCC-Ahnchangho.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/KCC-Ahnchangho.woff2') format('woff2')` },
        ]
    },
    {
        name: 'KccHanbit',
        label: 'KCC한빛체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/KCC-Hanbit.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2403-2@1.0/KCC-Hanbit.woff2') format('woff2')` },
        ]
    },
    {
        name: 'LineSeed',
        label: 'LINE Seed',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Rg.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Th.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Rg.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2') format('woff2')` },
        ]
    },
    {
        name: 'NeoDunggeunGothicPro',
        label: 'Neo둥근고딕Pro',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/NeoDunggeunmoPro-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/NeoDunggeunmoPro-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'NeoDonggeunmo',
        label: 'Neo둥근모',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.3/NeoDunggeunmo.woff') format('woff')` },
        ]
    },
    {
        name: 'Orbit',
        label: 'Orbit',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/Orbit-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/Orbit-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Wanted Sans Variable',
        label: 'Wanted Sans',
        url: `url('https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.1/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css')`,
        weight: [
            { value: 400 },
            { value: 500 },
            { value: 600 },
            { value: 700 },
            { value: 800 },
            { value: 900 },
            { value: 950 },
        ]
    },
    {
        name: 'Gamja Flower',
        label: 'Yoon 감자꽃',
        url: `url('https://fonts.googleapis.com/css2?family=Gamja+Flower&display=swap')`
    },
    {
        name: 'Hi Melody',
        label: 'Yoon 하이멜로디',
        url: `url('https://fonts.googleapis.com/css2?family=Hi+Melody&display=swap')`
    },
    {
        name: 'GaramYeonGeot',
        label: '가람연꽃',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Garam.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Garam.woff') format('woff')` },
        ]
    },
    {
        name: 'GamulchiFreeGothic',
        label: '가물치 무료고딕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/AssacomFreeGothicTTF-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/AssacomFreeGothicTTF-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Gaseok',
        label: '가석체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/GasoekOne-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/GasoekOne-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Galmat',
        label: '갈맷글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Galmetgol.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Galmetgol.woff') format('woff')` },
        ]
    },
    {
        name: 'Galmuri11-Bold',
        label: '갈무리11',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri11-Bold.woff2') format('woff2')`,
        weight: [
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri11-Bold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Galmuri11Condensed',
        label: '갈무리11 Condensed',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri11-Condensed.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri11-Condensed.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Galmuri14',
        label: '갈무리14',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri14.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2506-1@1.0/Galmuri14.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Galmuri7',
        label: '갈무리7',
        url: `url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css')`
    },
    {
        name: 'Galmuri9',
        label: '갈무리9',
        url: `url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css')`
    },
    {
        name: 'GangBujangNim',
        label: '강부장님체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Kangbujang.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Kangbujang.woff') format('woff')` },
        ]
    },
    {
        name: 'StrongComfort',
        label: '강인한 위로',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kanginhan.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kanginhan.woff') format('woff')` },
        ]
    },
    {
        name: 'Black Han Sans',
        label: '검은고딕',
        url: `url('https://fonts.googleapis.com/css?family=Black+Han+Sans:400')`
    },
    {
        name: 'NotGothicButGoding',
        label: '고딕 아니고 고딩',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gothic_Goding.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gothic_Goding.woff') format('woff')` },
        ]
    },
    {
        name: 'GoryeoFont',
        label: '고려글꼴',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Koreageulggol.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Koreageulggol.woff') format('woff')` },
        ]
    },
    {
        name: 'Goseogu',
        label: '고서구체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/Goseogu-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/Goseogu-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'GowoonDodum',
        label: '고운돋움',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff') format('woff')` },
        ]
    },
    {
        name: 'GounBatang',
        label: '고운바탕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff') format('woff')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Bold.woff') format('woff')` },
        ]
    },
    {
        name: 'Gomsin',
        label: '곰신체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gomsin.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gomsin.woff') format('woff')` },
        ]
    },
    {
        name: 'CloudSans',
        label: '구름 산스',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408@1.0/goorm-sans-regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408@1.0/goorm-sans-regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408@1.0/goorm-sans-medium.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408@1.0/goorm-sans-bold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'CloudSansCode',
        label: '구름 산스 코드',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408@1.0/goorm-sans-code.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408@1.0/goorm-sans-code.woff2') format('woff2')` },
        ]
    },
    {
        name: 'KyuriSDiary',
        label: '규리의 일기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kyuri_diary.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kyuri_diary.woff') format('woff')` },
        ]
    },
    {
        name: 'GoldSilverAndJewels',
        label: '금은보화',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Geumeunbohwa.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Geumeunbohwa.woff') format('woff')` },
        ]
    },
    {
        name: 'Giranghaerang',
        label: '기랑해랑체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMKIRANGHAERANG.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMKIRANGHAERANG.woff') format('woff')` },
        ]
    },
    {
        name: 'JoyBrightness',
        label: '기쁨밝음',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/GibbemBalgeum.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/GibbemBalgeum.woff') format('woff')` },
        ]
    },
    {
        name: 'ClimateCrisisKorean',
        label: '기후위기-한글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-2030.woff2') format('woff2')`,
        weight: [
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-2050.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-2040.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-2030.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-2019.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-2010.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-2000.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-1990.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKR-1979.woff2') format('woff2')` },
        ]
    },
    {
        name: 'ClimateCrisisHangulVf',
        label: '기후위기-한글 VF',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKRVF.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2212@1.0/ClimateCrisisKRVF.woff2') format('woff2')` },
        ]
    },
    {
        name: 'KimYui',
        label: '김유이체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kimyooyee.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kimyooyee.woff') format('woff')` },
        ]
    },
    {
        name: 'FlowerScent',
        label: '꽃내음',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gootneaeum.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Gootneaeum.woff') format('woff')` },
        ]
    },
    {
        name: 'KkuBulLim',
        label: '꾸불림체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/BMkkubulimTTF-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/BMkkubulimTTF-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Edge',
        label: '끄트머리',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Ggeuteumuri.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Ggeuteumuri.woff') format('woff')` },
        ]
    },
    {
        name: 'Nanum Gothic',
        label: '나눔고딕',
        url: `url('http://fonts.googleapis.com/earlyaccess/nanumgothic.css')`
    },
    {
        name: 'Nanum Gothic Coding',
        label: '나눔고딕코딩',
        url: `url('https://fonts.googleapis.com/earlyaccess/nanumgothiccoding.css')`
    },
    {
        name: 'Nanum Myeongjo',
        label: '나눔명조',
        url: `url('https://fonts.googleapis.com/earlyaccess/nanummyeongjo.css')`
    },
    {
        name: 'NanumBarunGothic',
        label: '나눔바른고딕',
        url: `url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot')`,
        weight: [
            { value: 300, url: `url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot')` },
            { value: 400, url: `url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot')` },
            { value: 700, url: `url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot')` },
        ]
    },
    {
        name: 'NanumBarunPen',
        label: '나눔바른펜',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumBarunpen.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumBarunpen.woff') format('woff')` },
        ]
    },
    {
        name: 'Nanum Brush Script',
        label: '나눔손글씨붓',
        url: `url('https://fonts.googleapis.com/earlyaccess/nanumbrushscript.css')`
    },
    {
        name: 'Nanum Pen Script',
        label: '나눔손글씨펜',
        url: `url('https://fonts.googleapis.com/earlyaccess/nanumpenscript.css')`
    },
    {
        name: 'NanumSquare',
        label: '나눔스퀘어',
        url: `url('https://cdn.rawgit.com/moonspam/NanumSquare/master/nanumsquare.css')`,
        weight: [
            { value: 300 },
            { value: 400 },
            { value: 700 },
            { value: 800 },
        ]
    },
    {
        name: 'NanumSquareNeo',
        label: '나눔스퀘어 네오',
        url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff2)`,
        weight: [
            { value: 300, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff2)` },
            { value: 400, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-aLt.woff2)` },
            { value: 700, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-cBd.woff2)` },
            { value: 800, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-dEb.woff2)` },
            { value: 900, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/NanumSquareNeo/NanumSquareNeoTTF-eHv.woff2)` },
        ]
    },
    {
        name: 'NanumSquareRound',
        label: '나눔스퀘어라운드',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NanumSquareRound.woff') format('woff')` },
        ]
    },
    {
        name: 'NanumHuman',
        label: '나눔휴먼',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2501-1@1.1/NanumHumanTTFRegular.woff2') format('woff2')`,
        weight: [
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2501-1@1.1/NanumHumanTTFExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2501-1@1.1/NanumHumanTTFLight.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2501-1@1.1/NanumHumanTTFRegular.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2501-1@1.1/NanumHumanTTFBold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2501-1@1.1/NanumHumanTTFExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2501-1@1.1/NanumHumanTTFHeavy.woff2') format('woff2')` },
        ]
    },
    {
        name: 'IWillOvercome',
        label: '나는 이겨낸다',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/I_survive.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/I_survive.woff') format('woff')` },
        ]
    },
    {
        name: 'WoodGarden',
        label: '나무정원',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Treegarden.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Treegarden.woff') format('woff')` },
        ]
    },
    {
        name: 'MyWifeSHandwriting',
        label: '나의 아내 손글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/My_wife_writing.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/My_wife_writing.woff') format('woff')` },
        ]
    },
    {
        name: `'NEXON Lv1 Gothic OTF'`,
        label: '넥슨 고딕',
        url: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-04@2.1/NEXON Lv1 Gothic OTF.woff') format('woff')`
    },
    {
        name: 'DongheeWhoIsTryingHard',
        label: '노력하는 동희',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hardworking_donghee.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hardworking_donghee.woff') format('woff')` },
        ]
    },
    {
        name: 'NoonnuBasicGothic',
        label: '눈누 기초고딕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noon-2410@1.0/NoonnuBasicGothicRegular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noon-2410@1.0/NoonnuBasicGothicRegular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'NeuriNeuri',
        label: '느릿느릿체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/SlowSlow.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/SlowSlow.woff') format('woff')` },
        ]
    },
    {
        name: 'TrumpetCreeper',
        label: '능소화',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/GrandifloraOne-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/GrandifloraOne-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'StartOver',
        label: '다시 시작해',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Restart.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Restart.woff') format('woff')` },
        ]
    },
    {
        name: 'Dazin',
        label: '다진체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Dajin.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Dajin.woff') format('woff')` },
        ]
    },
    {
        name: 'Dachaesarang',
        label: '다채사랑',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Dache_love.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Dache_love.woff') format('woff')` },
        ]
    },
    {
        name: 'Dahaeng',
        label: '다행체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Daheng.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Daheng.woff') format('woff')` },
        ]
    },
    {
        name: 'MoonHalo',
        label: '달무리',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/dalmoori.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2102-01@1.0/dalmoori.woff') format('woff')` },
        ]
    },
    {
        name: 'LunarOrbit',
        label: '달의궤도',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Orbit_of_moon.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Orbit_of_moon.woff') format('woff')` },
        ]
    },
    {
        name: 'DaegwangYuri',
        label: '대광유리',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Deagwang_mirror.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Deagwang_mirror.woff') format('woff')` },
        ]
    },
    {
        name: 'DaehanMingukYeolsa',
        label: '대한민국 열사체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Korea_hero.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Korea_hero.woff') format('woff')` },
        ]
    },
    {
        name: 'DaehwaNanum',
        label: '대화나눔체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/DAEHWA_NANUM_R.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/DAEHWA_NANUM_L.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/DAEHWA_NANUM_R.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_1@1.0/DAEHWA_NANUM_B.woff2') format('woff2')` },
        ]
    },
    {
        name: `'TheJamsil5Bold'`,
        label: '더잠실체',
        url: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302_01@1.0/TheJamsil5Bold.woff2') format('woff2')`
    },
    {
        name: 'DosGothic',
        label: '도스고딕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSGothic.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSGothic.woff') format('woff')` },
        ]
    },
    {
        name: 'DosMyungjo',
        label: '도스명조',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSMyungjo.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSMyungjo.woff') format('woff')` },
        ]
    },
    {
        name: 'DosSammul',
        label: '도스샘물',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSSaemmul.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/DOSSaemmul.woff') format('woff')` },
        ]
    },
    {
        name: 'DosStory',
        label: '도스이야기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSIyagiMedium.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSIyagiMedium.woff2') format('woff2')` },
        ]
    },
    {
        name: 'DosHandwriting',
        label: '도스필기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSPilgiMedium.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/DOSPilgiMedium.woff2') format('woff2')` },
        ]
    },
    {
        name: 'DosHangul',
        label: '도스한글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/DosKor.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2206-02@1.0/DosKor.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Dohyun',
        label: '도현체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMDOHYEON.woff') format('woff')` },
        ]
    },
    {
        name: 'DongguraemiFoundation',
        label: '동그라미재단',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/ThecircleM.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/ThecircleM.woff') format('woff')` },
        ]
    },
    {
        name: 'Donggle',
        label: '동글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108_2@1.0/Dongle-Regular.woff') format('woff')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108_2@1.0/Dongle-Light.woff') format('woff')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108_2@1.0/Dongle-Regular.woff') format('woff')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108_2@1.0/Dongle-Bold.woff') format('woff')` },
        ]
    },
    {
        name: 'DongwhaTtobbok',
        label: '동화또박',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Fairytale_ddobak.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Fairytale_ddobak.woff') format('woff')` },
        ]
    },
    {
        name: 'RoundedFixedsys',
        label: '둥근모꼴+ Fixedsys',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/DungGeunMo.woff') format('woff')` },
        ]
    },
    {
        name: 'RoundRelationship',
        label: '둥근인연',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Round_destiny.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Round_destiny.woff') format('woff')` },
        ]
    },
    {
        name: 'WarmFarewell',
        label: '따뜻한 작별',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Warm_farewell.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Warm_farewell.woff') format('woff')` },
        ]
    },
    {
        name: 'Ttaakdandan',
        label: '따악단단',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Ddakdandan.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Ddakdandan.woff') format('woff')` },
        ]
    },
    {
        name: 'MomToHerDaughter',
        label: '딸에게 엄마가',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/mom_to_daughter.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/mom_to_daughter.woff') format('woff')` },
        ]
    },
    {
        name: 'Ttobakttobaki',
        label: '또박또박',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Ddobakddobak.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Ddobakddobak.woff') format('woff')` },
        ]
    },
    {
        name: 'Ridibatang',
        label: '리디바탕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/RIDIBatang.woff') format('woff')` },
        ]
    },
    {
        name: 'Mago',
        label: '마고체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Mago.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Mago.woff') format('woff')` },
        ]
    },
    {
        name: 'MaruBuri',
        label: '마루 부리',
        url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2)`,
        weight: [
            { value: 200, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-ExtraLight.woff2)` },
            { value: 300, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Light.woff2)` },
            { value: 400, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Regular.woff2)` },
            { value: 600, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-SemiBold.woff2)` },
            { value: 700, url: `url(https://hangeul.pstatic.net/hangeul_static/webfont/MaruBuri/MaruBuri-Bold.woff2)` },
        ]
    },
    {
        name: 'Masitneun',
        label: '맛있는체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yammy.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yammy.woff') format('woff')` },
        ]
    },
    {
        name: 'Monoplexkr',
        label: '모노플렉스KR',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Text.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MonoplexkrItalic',
        label: '모노플렉스KR Italic',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Italic.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-ThinItalic.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-ExtraLightItalic.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-LightItalic.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-Italic.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-MediumItalic.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-SemiBoldItalic.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-BoldItalic.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-kr@1.0/MonoplexKR-TextItalic.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MonoplexNerd',
        label: '모노플렉스Nerd',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Text.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MonoplexNerdItalic',
        label: '모노플렉스Nerd Italic',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Italic.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-ThinItalic.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-ExtraLightItalic.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-LightItalic.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-Italic.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-MediumItalic.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-SemiBoldItalic.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-BoldItalic.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-nerd@1.0/MonoplexKRNerd-TextItalic.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MonoplexWide',
        label: '모노플렉스Wide',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Text.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MonoplexWideItalic',
        label: '모노플렉스Wide Italic',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Italic.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-ThinItalic.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-ExtraLightItalic.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-LightItalic.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-Italic.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-MediumItalic.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-SemiBoldItalic.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-BoldItalic.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-wide@1.0/MonoplexKRWide-TextItalic.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MonoplexWideNerd',
        label: '모노플렉스WideNerd',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Text.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MonoplexWidenerdItalic',
        label: '모노플렉스WideNerd Italic',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Italic.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-ThinItalic.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-ExtraLightItalic.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-LightItalic.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-Italic.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-MediumItalic.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-SemiBoldItalic.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-BoldItalic.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_Monoplex-widenerd@1.0/MonoplexKRWideNerd-TextItalic.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Moirai',
        label: '모이라이',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/MoiraiOne-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/MoiraiOne-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Mongdol',
        label: '몽돌',
        url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mongdol.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mongdol.woff') format('woff')` },
        ]
    },
    {
        name: 'Mugunghwa',
        label: '무궁화',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mugunghwa.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mugunghwa.woff') format('woff')` },
        ]
    },
    {
        name: 'Muzinjang',
        label: '무진장체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mujinjang.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mujinjang.woff') format('woff')` },
        ]
    },
    {
        name: 'Mulmaru',
        label: '물마루',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/Mulmaru.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MulmaruMono',
        label: '물마루 Mono',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/MulmaruMono.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-4@1.1/MulmaruMono.woff2') format('woff2')` },
        ]
    },
    {
        name: 'MiniHandwriting',
        label: '미니 손글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mini_handwriting.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mini_handwriting.woff') format('woff')` },
        ]
    },
    {
        name: 'MiraenaMu',
        label: '미래나무',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Future_tree.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Future_tree.woff') format('woff')` },
        ]
    },
    {
        name: 'Mirae',
        label: '미래로글꼴',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/MiraeroNormal.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/MiraeroNormal.woff') format('woff')` },
        ]
    },
    {
        name: 'MinSans',
        label: '민산스',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Regular.woff') format('woff')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Thin.woff') format('woff')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/MinSans-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Light.woff') format('woff')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Regular.woff') format('woff')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Medium.woff') format('woff')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/MinSans-Bold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Bold.woff') format('woff')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/MinSans-ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2201-2@1.0/MinSans-Black.woff') format('woff')` },
        ]
    },
    {
        name: 'Mingigeok',
        label: '밍기적체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105@1.1/Mingijuk.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105@1.1/Mingijuk.woff') format('woff')` },
        ]
    },
    {
        name: 'RightMind',
        label: '바른정신',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Bareun_mental.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Bareun_mental.woff') format('woff')` },
        ]
    },
    {
        name: 'BareHippie',
        label: '바른히피',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Bareun_hipi.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Bareun_hipi.woff') format('woff')` },
        ]
    },
    {
        name: 'TwinkleTwinkleStar',
        label: '반짝반짝 별',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Shining_star.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Shining_star.woff') format('woff')` },
        ]
    },
    {
        name: 'BaeEunhye',
        label: '배은혜체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Beeunhye.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Beeunhye.woff') format('woff')` },
        ]
    },
    {
        name: 'AngelInWhite',
        label: '백의의 천사',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/White_angel.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/White_angel.woff') format('woff')` },
        ]
    },
    {
        name: 'Willow',
        label: '버드나무',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bud_tree.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bud_tree.woff') format('woff')` },
        ]
    },
    {
        name: 'Beomsom',
        label: '범솜체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bumsom.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bumsom.woff') format('woff')` },
        ]
    },
    {
        name: 'BagelFat',
        label: '베이글팻',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/BagelFatOne-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/BagelFatOne-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Noto Sans KR',
        label: '본고딕 (Noto Sans)',
        url: `url('https://fonts.googleapis.com/earlyaccess/notosanskr.css')`,
        weight: [
            { value: 100 },
            { value: 200 },
            { value: 300 },
            { value: 400 },
            { value: 500 },
            { value: 600 },
            { value: 700 },
            { value: 800 },
            { value: 900 },
        ]
    },
    {
        name: 'BonmyeongjoSourceHanSerif',
        label: '본명조 (Source Han Serif)',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NotoSerifKR.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NotoSerifKR.woff') format('woff')` },
        ]
    },
    {
        name: 'BujangnimNunchi',
        label: '부장님 눈치체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bujangnim_nunchi.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bujangnim_nunchi.woff') format('woff')` },
        ]
    },
    {
        name: 'Polaris',
        label: '북극성',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Polar_Star.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Polar_Star.woff') format('woff')` },
        ]
    },
    {
        name: 'BookendBatang',
        label: '북엔드 바탕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-2@1.0/TTBookendBatangR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-2@1.0/TTBookendBatangR.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-2@1.0/TTBookendBatangSB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Bisang',
        label: '비상체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bisang.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Bisang.woff') format('woff')` },
        ]
    },
    {
        name: 'PanguniMomHandwriting',
        label: '빵구니맘 손글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Bbang_gunimom.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Bbang_gunimom.woff') format('woff')` },
        ]
    },
    {
        name: 'ILoveYouSon',
        label: '사랑해 아들',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Love_son.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Love_son.woff') format('woff')` },
        ]
    },
    {
        name: 'SandollSamlipHobbangBasic',
        label: '산돌 삼립호빵체 Basic',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Basic.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Basic.woff') format('woff')` },
        ]
    },
    {
        name: 'SandollSamlipHobbangOutline',
        label: '산돌 삼립호빵체 Outline',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/SDSamliphopangche_Outline.woff') format('woff')` },
        ]
    },
    {
        name: 'Sanhayeop',
        label: '산하엽',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/Diphylleia-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_JAMO@1.0/Diphylleia-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'ThreeKingdoms3Font',
        label: '삼국지3글꼴',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/Sam3KRFont.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_eight@1.0/Sam3KRFont.woff') format('woff')` },
        ]
    },
    {
        name: 'Samyukdae',
        label: '삼육대체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/TTSahmyookUniversityR.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/TTSahmyookUniversityL.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.0/TTSahmyookUniversityR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'ShanghaiChanmi',
        label: '상해찬미체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Sanghea_chanmi.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Sanghea_chanmi.woff') format('woff')` },
        ]
    },
    {
        name: `'SeoulAlrimTTF-Heavy'`,
        label: '서울알림체',
        url: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/SeoulAlrimTTF-Heavy.woff2') format('woff2')`
    },
    {
        name: 'SeopyeongwonKkeokggak',
        label: '서평원 꺾깎체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SLEIGothicTTF.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2104@1.0/SLEIGothicTTF.woff') format('woff')` },
        ]
    },
    {
        name: 'Sungsil',
        label: '성실체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Sungsil.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Sungsil.woff') format('woff')` },
        ]
    },
    {
        name: 'WorldSHangul',
        label: '세계적인 한글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Global_Hangul.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Global_Hangul.woff') format('woff')` },
        ]
    },
    {
        name: 'Segusugu',
        label: '세구세구체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/SeguSegu-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/SeguSegu-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Sea',
        label: '세아체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Se-a.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Se-a.woff') format('woff')` },
        ]
    },
    {
        name: 'Sehwa',
        label: '세화체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Se-hwa.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Se-hwa.woff') format('woff')` },
        ]
    },
    {
        name: 'Somi',
        label: '소미체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Somi.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Somi.woff') format('woff')` },
        ]
    },
    {
        name: 'TheFirefighterSPrayer',
        label: '소방관의 기도',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Firefighter_prayer.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Firefighter_prayer.woff') format('woff')` },
        ]
    },
    {
        name: 'Sonpyeonji',
        label: '손편지체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Handletter.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Handletter.woff') format('woff')` },
        ]
    },
    {
        name: 'SolmoeKimDaegeon',
        label: '솔뫼 김대건체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/kdg_Light.woff') format('woff')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/kdg_Light.woff') format('woff')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts-20-12@1.0/kdg_Medium.woff') format('woff')` },
        ]
    },
    {
        name: 'Songmyeong',
        label: '송명',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JSongMyung-Regular-KO.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/JSongMyung-Regular-KO.woff2') format('woff2')` },
        ]
    },
    {
        name: 'ShyCollegeStudent',
        label: '수줍은 대학생',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Shy_college_student.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Shy_college_student.woff') format('woff')` },
        ]
    },
    {
        name: 'Sweet',
        label: '스위트',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Heavy.woff2') format('woff2')` },
        ]
    },
    {
        name: 'StunningSans',
        label: '스터닝 산스',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-2@1.0/STUNNING-Bd.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-2@1.0/STUNNING-Bd.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Spoqa Han Sans',
        label: '스포카 한 산스',
        url: `url('https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSans-kr.css')`,
        weight: [
            { value: 100 },
            { value: 300 },
            { value: 400 },
            { value: 700 }
        ]
    },
    {
        name: 'SpokaHanSansNeo',
        label: '스포카 한 산스 네오',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Thin.woff') format('woff')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Light.woff') format('woff')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Regular.woff') format('woff')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Medium.woff') format('woff')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/SpoqaHanSansNeo-Bold.woff') format('woff')` },
        ]
    },
    {
        name: 'SiwooIsCute',
        label: '시우 귀여워',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Cut_siu.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Cut_siu.woff') format('woff')` },
        ]
    },
    {
        name: 'NewlywedCouple',
        label: '신혼부부',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Newly_married.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Newly_married.woff') format('woff')` },
        ]
    },
    {
        name: 'Agisarang',
        label: '아기사랑체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Baby_love.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Baby_love.woff') format('woff')` },
        ]
    },
    {
        name: 'AreumdriFlowerTree',
        label: '아름드리 꽃나무',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Flower_tree.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Flower_tree.woff') format('woff')` },
        ]
    },
    {
        name: 'AppaGilssi',
        label: '아빠글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Father_handwriting.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Father_handwriting.woff') format('woff')` },
        ]
    },
    {
        name: 'DadSLoveLetter',
        label: '아빠의 연애편지',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Father_loveletter.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Father_loveletter.woff') format('woff')` },
        ]
    },
    {
        name: 'AstaSans',
        label: '아스타산스',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/AstaSans-Regular.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/AstaSans-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/AstaSans-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/AstaSans-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/AstaSans-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/AstaSans-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/AstaSans-ExtraBold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'AinmamHandwriting',
        label: '아인맘 손글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Ainmom.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Ainmom.woff') format('woff')` },
        ]
    },
    {
        name: 'AuntieFreedom',
        label: '아줌마 자유',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Jayoo.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Jayoo.woff') format('woff')` },
        ]
    },
    {
        name: 'Ankyongjabi',
        label: '안경잡이체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/FOUREYES.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/FOUREYES.woff') format('woff')` },
        ]
    },
    {
        name: 'Anssang',
        label: '안쌍체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Anssang.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Anssang.woff') format('woff')` },
        ]
    },
    {
        name: 'Amsterdam',
        label: '암스테르담',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Amsterdam.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Amsterdam.woff') format('woff')` },
        ]
    },
    {
        name: 'OvertimeKimJooIm',
        label: '야근하는 김주임',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kimjuim.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Kimjuim.woff') format('woff')` },
        ]
    },
    {
        name: 'Yanolja',
        label: '야놀자야체',
        url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/YanoljaYacheR.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/YanoljaYacheR.woff') format('woff')` },
        ]
    },
    {
        name: 'BaekGeumRyeTheVegetableVendor',
        label: '야채장수 백금례',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Beakeumrye.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Beakeumrye.woff') format('woff')` },
        ]
    },
    {
        name: 'MomSLove',
        label: '엄마사랑',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Love_mom.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Love_mom.woff') format('woff')` },
        ]
    },
    {
        name: 'Eonggeongkwi',
        label: '엉겅퀴체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Unggungqui.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Unggungqui.woff') format('woff')` },
        ]
    },
    {
        name: `'S-CoreDream-3Light'`,
        label: '에스코어드림',
        url: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff')`
    },
    {
        name: 'A2z',
        label: '에이투지체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-4Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-1Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-2ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-3Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-4Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-5Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-6SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-7Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-8ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-6@1.0/에이투지체-9Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Elice DX Neolli',
        label: '엘리스 DX널리체',
        url: `url('https://font.elice.io/css?family=Elice+DX+Neolli')`
    },
    {
        name: 'AliceDigitalLearning',
        label: '엘리스디지털배움체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_elice@1.0/EliceDigitalBaeum-Bd.woff2') format('woff2')` },
        ]
    },
    {
        name: 'EllisDigitalCoding',
        label: '엘리스 디지털코딩체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_220508@1.0/EliceDigitalBaeum_Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_220508@1.0/EliceDigitalBaeum_Regular.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_220508@1.0/EliceDigitalBaeum_Bold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SummerFont',
        label: '여름글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Summer_letter.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Summer_letter.woff') format('woff')` },
        ]
    },
    {
        name: 'Yeonseong',
        label: '연성체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMYEONSUNG.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMYEONSUNG.woff') format('woff')` },
        ]
    },
    {
        name: 'Yeonji',
        label: '연지체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yunji.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yunji.woff') format('woff')` },
        ]
    },
    {
        name: 'SparklingAtNineteen',
        label: '열아홉의 반짝임',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Syning_19.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_10@1.0/Syning_19.woff') format('woff')` },
        ]
    },
    {
        name: 'YeolIl',
        label: '열일체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hardworking.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hardworking.woff') format('woff')` },
        ]
    },
    {
        name: 'Yeongdo',
        label: '영도체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/Yeongdo-Rg.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/Yeongdo-Rg.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/Yeongdo-Bd.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2410-1@1.2/Yeongdo-Hv.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Yedang',
        label: '예당체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yedang.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yedang.woff') format('woff')` },
        ]
    },
    {
        name: 'PrettyMinkyung',
        label: '예쁜 민경체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mingyung.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Mingyung.woff') format('woff')` },
        ]
    },
    {
        name: 'Okbi',
        label: '옥비체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Okbi.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Okbi.woff') format('woff')` },
        ]
    },
    {
        name: 'Wild',
        label: '와일드',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Wild.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Wild.woff') format('woff')` },
        ]
    },
    {
        name: 'GrandmotherSHandwriting',
        label: '외할머니글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Grandma_wring.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Grandma_wring.woff') format('woff')` },
        ]
    },
    {
        name: 'LeftHandedPeopleAreBeautifulToo',
        label: '왼손잡이도 예뻐',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Pretty_Left_handed.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Pretty_Left_handed.woff') format('woff')` },
        ]
    },
    {
        name: 'MyDaughterSHandwriting',
        label: '우리딸 손글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Daughter_handwriting.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Daughter_handwriting.woff') format('woff')` },
        ]
    },
    {
        name: `'ONE-Mobile-POP'`,
        label: '원스토어 모바일POP체',
        url: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/ONE-Mobile-POP.woff') format('woff')`
    },
    {
        name: 'Wave',
        label: '웨이브 파도체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/WavvePADO-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/WavvePADO-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'WindowsKorean',
        label: '윈도한글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/WinKor.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-1@1.0/WinKor.woff2') format('woff2')` },
        ]
    },
    {
        name: 'UniThingdangdingdang',
        label: '유니 띵땅띵땅',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yuni_ddingddang.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/Yuni_ddingddang.woff') format('woff')` },
        ]
    },
    {
        name: 'Euljiro10YearsLater',
        label: '을지로10년후체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/BMEuljiro10yearslater.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/BMEuljiro10yearslater.woff') format('woff')` },
        ]
    },
    {
        name: 'Euljiro',
        label: '을지로체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/BMEULJIRO.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.0/BMEULJIRO.woff') format('woff')` },
        ]
    },
    {
        name: 'MeaningfulKorean',
        label: '의미있는 한글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Meaningful_hanguel.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_07@1.0/Meaningful_hanguel.woff') format('woff')` },
        ]
    },
    {
        name: 'Iropke Batang',
        label: '이롭게바탕체',
        url: `url('https://cdn.jsdelivr.net/font-iropke-batang/1.2/font-iropke-batang.css')`
    },
    {
        name: 'StoryBold',
        label: '이야기 굵은체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2512-1@1.0/IyagiGGC.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2512-1@1.0/IyagiGGC.woff') format('woff')` },
        ]
    },
    {
        name: 'Jabosimjiu',
        label: '자부심지우',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Pride_jiu.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Pride_jiu.woff') format('woff')` },
        ]
    },
    {
        name: 'YouAreDoingGreat',
        label: '잘하고 있어',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Doing_well.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Doing_well.woff') format('woff')` },
        ]
    },
    {
        name: 'Jangmi',
        label: '장미체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Rose.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Rose.woff') format('woff')` },
        ]
    },
    {
        name: 'Dotted',
        label: '점꼴체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Dot_font.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_03@1.0/Dot_font.woff') format('woff')` },
        ]
    },
    {
        name: 'JeongEun',
        label: '정은체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Jungeun.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Jungeun.woff') format('woff')` },
        ]
    },
    {
        name: 'Juache',
        label: '주아체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/BMJUA.woff') format('woff')` },
        ]
    },
    {
        name: 'MiddleSchoolStudent',
        label: '중학생',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Middleschool_student.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_08@1.0/Middleschool_student.woff') format('woff')` },
        ]
    },
    {
        name: 'JinjuParkKyeongA',
        label: '진주 박경아체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Parkgyunga.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Parkgyunga.woff') format('woff')` },
        ]
    },
    {
        name: 'IronPenmanship',
        label: '철필글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Chulpil_writing.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Chulpil_writing.woff') format('woff')` },
        ]
    },
    {
        name: 'ElementaryHope',
        label: '초딩희망',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Choding_hope.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Choding_hope.woff') format('woff')` },
        ]
    },
    {
        name: 'ChilchilgongBalsache',
        label: '칠칠공 발사체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/770Balsa.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2505-1@1.0/770Balsa.woff2') format('woff2')` },
        ]
    },
    {
        name: 'KakaoSmallFont',
        label: '카카오 작은글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoSmallSans-Regular.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoSmallSans-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoSmallSans-Regular.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoSmallSans-Bold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'KakaoBigFont',
        label: '카카오 큰글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoBigSans-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoBigSans-Regular.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoBigSans-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2503@1.0/KakaoBigSans-ExtraBold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Cafe24ProUp',
        label: '카페24 PRO UP',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2507-1@1.0/Cafe24PROUP.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2507-1@1.0/Cafe24PROUP.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Cafe24Gowoonbam',
        label: '카페24 고운밤',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Oneprettynight.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24Danjeonghae',
        label: '카페24 단정해',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Danjunghae.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Danjunghae.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24Dangdanghae',
        label: '카페24 당당해',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.2/Cafe24Dangdanghae.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.2/Cafe24Dangdanghae.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24Dongdong',
        label: '카페24 동동',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Dongdong.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Dongdong.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24DongdongLight',
        label: '카페24 동동 Light',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2603-1@1.0/Cafe24DongdongLight.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2603-1@1.0/Cafe24DongdongLight.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Cafe24MoyaMoya',
        label: '카페24 모야모야',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/Cafe24Moyamoya-Regular-v1.0.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/Cafe24Moyamoya-Regular-v1.0.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Cafe24MoyaMoyaFace',
        label: '카페24 모야모야 Face',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/Cafe24Moyamoya-Face-v1.0.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_231029@1.1/Cafe24Moyamoya-Face-v1.0.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Cafe24ShiningStar',
        label: '카페24 빛나는별',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Shiningstar.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Shiningstar.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24SsongSsong',
        label: '카페24 숑숑',
        url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Syongsyong.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Syongsyong.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24SuperMagic',
        label: '카페24슈퍼매직',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Regular-v1.0.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Regular-v1.0.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/Cafe24Supermagic-Bold-v1.0.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Cafe24Simple',
        label: '카페24 심플해',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Simplehae.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Simplehae.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24Surround',
        label: '카페24 써라운드',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24Ssurround.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24SurroundAir',
        label: '카페24 써라운드에어',
        url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_2105_2@1.0/Cafe24SsurroundAir.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24Ssukssuk',
        label: '카페24 쑥쑥',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Ssukssuk.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_twelve@1.1/Cafe24Ssukssuk.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24SsuksukLight',
        label: '카페24 쑥쑥 Light',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2603-1@1.0/Cafe24SsukssukLight.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2603-1@1.0/Cafe24SsukssukLight.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Cafe24Anemone',
        label: '카페24 아네모네',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Cafe24Ohsquare.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/Cafe24Ohsquare.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24AnemoneAir',
        label: '카페24 아네모네 에어',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/Cafe24Ohsquareair.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/Cafe24Ohsquareair.woff') format('woff')` },
        ]
    },
    {
        name: 'Cafe24ClassicType',
        label: '카페24 클래식타입',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Cafe24ClassicType-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2210-2@1.0/Cafe24ClassicType-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Kalguksu',
        label: '칼국수',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Kalguksu.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Kalguksu.woff') format('woff')` },
        ]
    },
    {
        name: 'KerisBaeum',
        label: '케리스 배움체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISBAEUM_R.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISBAEUM_L.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISBAEUM_R.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISBAEUM_B.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISBAEUM_EB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'KerisKedyuche',
        label: '케리스 케듀체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISKEDU_R.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISKEDU_R.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISKEDU_B.woff2') format('woff2')` },
        ]
    },
    {
        name: 'KerisKeduLine',
        label: '케리스 케듀체 Line',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISKEDU_Line.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2601-3@1.0/KERISKEDU_Line.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Coco',
        label: '코코체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Coco.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_02@1.0/Coco.woff') format('woff')` },
        ]
    },
    {
        name: 'Tmon',
        label: '티몬체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/TmonMonsori.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/TmonMonsori.woff') format('woff')` },
        ]
    },
    {
        name: 'Paperozi',
        label: '페이퍼로지',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-1Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-2ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-3Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-4Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-5Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-6SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-7Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-8ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-3@1.0/Paperlogy-9Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'PyeojinGothic',
        label: '펴진고딕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2504-1@1.0/PyeojinGothic-Regular.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2504-1@1.0/PyeojinGothic-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2504-1@1.0/PyeojinGothic-Regular.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2504-1@1.0/PyeojinGothic-Bold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Presentation',
        label: '프리젠테이션',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-4Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-1Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-2ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-3Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-4Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-5Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-6SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-7Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-8ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-9Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Pretendard',
        label: '프리텐다드',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Regular.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Medium.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/pretendard@1.0/Pretendard-Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HandwritingAsOne',
        label: '하나되어 손글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Become_one.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_01@1.0/Become_one.woff') format('woff')` },
        ]
    },
    {
        name: 'HanaHandwriting',
        label: '하나손글씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Hana_handwriting.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Hana_handwriting.woff') format('woff')` },
        ]
    },
    {
        name: 'Haram',
        label: '하람체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Haram.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Haram.woff') format('woff')` },
        ]
    },
    {
        name: 'SchoolSafeAutumnTrip',
        label: '학교안심 가을소풍',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGaeulsopungL.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGaeulsopungL.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGaeulsopungB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyStraightTitle',
        label: '학교안심 곧은제목',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGodeunjemokB.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGodeunjemokB.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGodeunjemokM.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyDinosaurEgg',
        label: '학교안심 공룡알',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimGongryongalR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimGongryongalR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyCloud',
        label: '학교안심 구름',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimGureumR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimGureumR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyPictureDiary',
        label: '학교안심 그림일기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimGeurimilgiTTF-R.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimGeurimilgiTTF-R.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeLittleOne',
        label: '학교안심 꼬꼬마',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimKkokkomaR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimKkokkomaR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeTwist',
        label: '학교안심 꽈배기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimKkwabaegiR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimKkwabaegiR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyKid',
        label: '학교안심 꾸러기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGgooreogiR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimGgooreogiR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeOuting',
        label: '학교안심 나들이',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimNadeuriTTF-L.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimNadeuriTTF-L.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimNadeuriTTF-B.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeTree',
        label: '학교안심 나무',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimNamuR.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimNamuL.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimNamuR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyWing',
        label: '학교안심 날개',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimNalgaeR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimNalgaeR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyMagnifier',
        label: '학교안심 돋보기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimDotbogiR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimDotbogiR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeStoneWall',
        label: '학교안심 돌담',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimDoldamL.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimDoldamL.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimDoldamM.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimDoldamB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyRoundedSmile',
        label: '학교안심 둥근미소',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-R.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-R.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyTteokbokki',
        label: '학교안심 떡볶이',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimTTeokbokkiB.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimTTeokbokkiB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeVaultingBox',
        label: '학교안심 뜀틀',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimTtwimteulR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimTtwimteulR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyRecorder',
        label: '학교안심 리코더',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimRikodeoR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimRikodeoR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyManitto',
        label: '학교안심 마니또',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimManitoR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimManitoR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyWizard',
        label: '학교안심 마법사',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMabeopsaR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMabeopsaR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetySunnyDay',
        label: '학교안심 맑은날',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimMalgeunnalM.woff2') format('woff2')`,
        weight: [
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimMalgeunnalM.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimMalgeunnalB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeAdventurer',
        label: '학교안심 모험가',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMoheomgaR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMoheomgaR.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMoheomgaB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeMonggleMonggle',
        label: '학교안심 몽글몽글',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMonggeulmonggeulR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMonggeulmonggeulR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyStubbyChalk',
        label: '학교안심 몽당분필',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimMondangbunfilR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimMondangbunfilR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyWave',
        label: '학교안심 물결',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMulgyeolR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMulgyeolR.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimMulgyeolB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyDandelionSpore',
        label: '학교안심 민들레홀씨',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimMindeulleholssiR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimMindeulleholssiR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyGoodSupport',
        label: '학교안심 바른돋움',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBareondotumR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBareondotumR.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBareondotumB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyFoundation',
        label: '학교안심 바른바탕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBareonbatangR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBareonbatangR.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBareonbatangB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyHalfMoon',
        label: '학교안심 반달',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimBandalL.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimBandalL.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeDictation',
        label: '학교안심 받아쓰기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimBadasseugiTTF-L.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimBadasseugiTTF-L.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyStarrySky',
        label: '학교안심 별빛하늘',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimByeolbichhaneulTTF-L.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimByeolbichhaneulTTF-L.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimByeolbichhaneulTTF-B.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeBoardMarker',
        label: '학교안심 보드마카',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimBoadmarkerR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimBoadmarkerR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetySpringBreak',
        label: '학교안심 봄방학',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBombanghakR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBombanghakR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyChalk',
        label: '학교안심 분필',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBunpilR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimBunpilR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyBrushPen',
        label: '학교안심 붓펜',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimButpenL.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimButpenL.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimButpenM.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimButpenB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeLocker',
        label: '학교안심 사물함',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimSamulhamR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimSamulhamR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeSansDoodum',
        label: '학교안심 산뜻돋움',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimSantteutdotumL.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimSantteutdotumL.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimSantteutdotumM.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetySans',
        label: '학교안심 산뜻바탕',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimSantteutbatangL.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimSantteutbatangL.woff2') format('woff2')` },
            { value: 500, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimSantteutbatangM.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyCertificate',
        label: '학교안심 상장',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimSangjangR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimSangjangR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyColoredPencil',
        label: '학교안심 색연필',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimSaekyeonpilR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimSaekyeonpilR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyShower',
        label: '학교안심 소나기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimSonagiR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimSonagiR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetySusukkang',
        label: '학교안심 수수깡',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimSusukkangL.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimSusukkangL.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetySketchbook',
        label: '학교안심 스케치북',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimSketchbookR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimSketchbookR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetySchedule',
        label: '학교안심 시간표',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimSiganpyoR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimSiganpyoR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyNotification',
        label: '학교안심 알림장',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimAllimjangTTF-R.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimAllimjangTTF-R.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimAllimjangTTF-B.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyAquariumDecor',
        label: '학교안심 어항꾸미기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimEohangkkumigiB.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimEohangkkumigiB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeTravel',
        label: '학교안심 여행',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimYeohaengR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimYeohaengR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyOcarina',
        label: '학교안심 오카리나',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimOcarinaR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimOcarinaR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeUmbrella',
        label: '학교안심 우산',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimUsanR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimUsanR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeUniverse',
        label: '학교안심 우주',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimWoojuR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-2@1.0/HakgyoansimWoojuR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafePlayground',
        label: '학교안심 운동장',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimUndongjangL.woff2') format('woff2')`,
        weight: [
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimUndongjangL.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyMilkyWay',
        label: '학교안심 은하수',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimEunhasuR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimEunhasuR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyRelay',
        label: '학교안심 이어달리기',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimYieodalligiL.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimYieodalligiL.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolPeaceOfMindNature',
        label: '학교안심 자연',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimJayeonR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimJayeonR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyFreeTime',
        label: '학교안심 자유시간',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimJayusiganR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2508-2@1.0/HakgyoansimJayusiganR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafeLunchtime',
        label: '학교안심 점심시간',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimJeomsimsiganB.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimJeomsimsiganB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyEraser',
        label: '학교안심 지우개',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimJiugaeR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimJiugaeR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyBookmark',
        label: '학교안심 책갈피',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimChaekgalpiR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2510-1@1.0/HakgyoansimChaekgalpiR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyAttendanceBook',
        label: '학교안심 출석부',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimChulseokbuTTF-L.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimChulseokbuTTF-L.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimChulseokbuTTF-B.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyChalkboardEraser',
        label: '학교안심 칠판지우개',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimChilpanjiugaeTTF-L.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimChilpanjiugaeTTF-L.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimChilpanjiugaeTTF-B.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyMustache',
        label: '학교안심 콧수염',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimKossuyeomR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimKossuyeomR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyKidariBalloon',
        label: '학교안심 키다리풍선',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimKidaripungseonL.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimKidaripungseonL.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyToss',
        label: '학교안심 투호',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimTuhoR.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimTuhoR.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyPuzzleBlack',
        label: '학교안심 퍼즐 블랙',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimPuzzleTTF-Black.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimPuzzleTTF-Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyPuzzleOutline',
        label: '학교안심 퍼즐 아웃라인',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimPuzzleTTF-Outline.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimPuzzleTTF-Outline.woff2') format('woff2')` },
        ]
    },
    {
        name: 'SchoolSafetyPoster',
        label: '학교안심 포스터',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimPosterB.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2511-1@1.0/HakgyoansimPosterB.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HangulJaemin',
        label: '한글재민체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jaemin.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10-21@1.0/Jaemin.woff') format('woff')` },
        ]
    },
    {
        name: 'HangulJaemin30',
        label: '한글재민체3.0',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Hangeuljaemin4-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2307-1@1.1/Hangeuljaemin4-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HangulJaemin60',
        label: '한글재민체 6.0',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2507-1@1.0/Hangeuljaemin6TTF-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/2507-1@1.0/Hangeuljaemin6TTF-Regular.woff2') format('woff2')` },
        ]
    },
    {
        name: 'Hanna',
        label: '한나체',
        url: `url('https://fonts.googleapis.com/earlyaccess/hanna.css')`
    },
    {
        name: 'HannaAir',
        label: '한나체 Air',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.0/BMHANNAAir.woff') format('woff')` },
        ]
    },
    {
        name: 'HannaPro',
        label: '한나체Pro',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.0/BMHANNAPro.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_seven@1.0/BMHANNAPro.woff') format('woff')` },
        ]
    },
    {
        name: 'Hanyun',
        label: '한윤체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Hanyoon.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Hanyoon.woff') format('woff')` },
        ]
    },
    {
        name: 'GrandpaSSharing',
        label: '할아버지의나눔',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Grandpa_sharing.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Grandpa_sharing.woff') format('woff')` },
        ]
    },
    {
        name: 'Hamlet',
        label: '함렛',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Regular.woff2') format('woff2')`,
        weight: [
            { value: 100, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Thin.woff2') format('woff2')` },
            { value: 200, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-ExtraLight.woff2') format('woff2')` },
            { value: 300, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Light.woff2') format('woff2')` },
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Regular.woff2') format('woff2')` },
            { value: 600, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-SemiBold.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Bold.woff2') format('woff2')` },
            { value: 800, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-ExtraBold.woff2') format('woff2')` },
            { value: 900, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/Hahmlet-Black.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HappinessSans',
        label: '해피니스 산스',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Regular.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Regular.woff2') format('woff2')` },
            { value: 700, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Bold.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HappinessSansTitle',
        label: '해피니스 산스 Title',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Title.woff2') format('woff2')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2205@1.0/Happiness-Sans-Title.woff2') format('woff2')` },
        ]
    },
    {
        name: 'HappyDobi',
        label: '행복한 도비',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Happy_dobi.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_05@1.0/Happy_dobi.woff') format('woff')` },
        ]
    },
    {
        name: 'Hyeoki',
        label: '혁이체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hyukee.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hyukee.woff') format('woff')` },
        ]
    },
    {
        name: 'Hyejun',
        label: '혜준체',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hyejun.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hyejun.woff') format('woff')` },
        ]
    },
    {
        name: 'HyoNamAlwaysFighting',
        label: '효남 늘 화이팅',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Fighting_hyonam.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_04@1.0/Fighting_hyonam.woff') format('woff')` },
        ]
    },
    {
        name: 'HopeNuri',
        label: '희망누리',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hope_nuri.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_06@1.0/Hope_nuri.woff') format('woff')` },
        ]
    },
    {
        name: 'WhiteTailedEagle',
        label: '흰꼬리수리',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/White_kkorisuri.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_11@1.0/White_kkorisuri.woff') format('woff')` },
        ]
    },
    {
        name: 'MoreThanJustSayingHangInThere',
        label: '힘내라는 말보단',
        url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Saying_tobe_strong.woff') format('woff')`,
        weight: [
            { value: 400, url: `url('https://cdn.jsdelivr.net/gh/projectnoonnu/naverfont_09@1.0/Saying_tobe_strong.woff') format('woff')` },
        ]
    }
];

function OptionPanel() {
    const {
        // 기본 정보
        viewerNickname, setViewerNickname,

        // 배경
        bodyBgColor, setBodyBgColor,

        // 정렬
        align, setAlign,

        // 글꼴 관련
        fontFamily, setFontFamily,
        fontWeight, setFontWeight,
        availableWeights,
        fontSize, setFontSize,
        fontBold, setFontBold,
        lineHeight, setLineHeight,
        letterSpacing, setLetterSpacing,
        fontEffect, setFontEffect,
        fontEffectColor, setFontEffectColor,
        shadowX, setShadowX,
        shadowY, setShadowY,
        shadowBlur, setShadowBlur,

        // 채팅 스타일
        paddingLeftRight, setPaddingLeftRight,
        paddingTopBottom, setPaddingTopBottom,
        chatBgColor, setChatBgColor,
        chatTextColor, setChatTextColor,
        chatRadius, setChatRadius,
        chatMarginBottom, setChatMarginBottom,
        boxEffect, setBoxEffect,
        boxEffectColor, setBoxEffectColor,
        boxBorder, setBoxBorder,
        boxShadowX, setBoxShadowX,
        boxShadowY, setBoxShadowY,
        boxShadowBlur, setBoxShadowBlur,

        // 채팅 페이드아웃
        enableFadeOut, setEnableFadeOut,
        fadeDuration, setFadeDuration,

        // 닉네임
        showNickname, setShowNickname,
        blockNickname, setBlockNickname,
        nicknameSuffixType, setNicknameSuffixType,
        nicknameSuffixCustom, setNicknameSuffixCustom,
        nicknameSuffixColor, setNicknameSuffixColor,
        nameBgColor, setNameBgColor,
        nameColor, setNameColor,
        nameColorCheck, setNameColorCheck,

        // 뱃지 / 스티커
        userIconSize, setUserIconSize,
        showBadge, setShowBadge,
        badgeTop, setBadgeTop, // 💡 상하 위치 추가
        stickerSize, setStickerSize,
        stickerTop, setStickerTop, // 💡 상하 위치 추가

        // 알림바
        showNotice, setShowNotice,
        noticeText, setNoticeText,
        noticeFontSize, setNoticeFontSize,
        noticeTextColor, setNoticeTextColor,
        noticeBgColor, setNoticeBgColor,
        noticeHeight, setNoticeHeight,
        noticeRadius, setNoticeRadius,

    } = useCssStore();


    // 폰트를 백그라운드에서 다운로드하고 등록하는 로직
    useEffect(() => {
        const style = document.createElement('style');

        let importRules = ''; // @import 구문을 모을 변수
        let fontFaceRules = ''; // @font-face 구문을 모을 변수

        fontList.forEach(font => {
            // 1. URL에 .css가 포함되어 있거나, google fonts(family=) 주소인 경우 @import 사용
            if (font.url.includes('.css') || font.url.includes('family=')) {
                importRules += `@import ${font.url};\n`;
            }
            // 2. 그 외 직접적인 폰트 파일(woff, woff2 등)인 경우 @font-face 사용
            else {
                // 💡 따옴표가 중복 적용되지 않도록 기존 이름에서 홑따옴표를 제거하고 다시 씌웁니다.
                const safeFontName = font.name.replace(/'/g, "");

                fontFaceRules += `
                @font-face {
                    font-family: '${safeFontName}';
                    src: ${font.url};
                    font-display: swap;
                }\n`;

                // weight 배열이 있는 경우 개별 등록
                if (font.weight && font.weight.length > 0) {
                    font.weight.forEach(w => {
                        fontFaceRules += `
                        @font-face {
                            font-family: '${safeFontName}';
                            src: ${w.url};
                            font-weight: ${w.value};
                            font-display: swap;
                        }\n`;
                    });
                }
            }
        });

        // 💡 핵심: import 규칙들을 무조건 가장 위에 배치합니다.
        style.innerHTML = importRules + fontFaceRules;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // 💡 [추가된 코드] 프리셋 적용 시 굵기(availableWeights) 배열이 날아가는 현상 복구
    useEffect(() => {
        const currentFont = fontList.find(f => f.name.replace(/['"]/g, "") === fontFamily.replace(/['"]/g, ""));

        if (currentFont) {
            const weights = currentFont.weight || [];
            // 스토어의 가용 굵기 배열 개수와 실제 폰트의 굵기 배열 개수가 다르면 (즉, 프리셋이 덮어씌웠다면) 복구
            if (availableWeights.length !== weights.length) {
                const defaultWeightObj = weights.find(w => w.value === fontWeight) || weights.find(w => w.value === 400) || weights[0];
                const url = defaultWeightObj ? defaultWeightObj.url : currentFont.url;
                const weightVal = defaultWeightObj ? defaultWeightObj.value : 400;

                setFontFamily(currentFont.name, url, weights, weightVal);
            }
        }
    }, [fontFamily, availableWeights.length, fontWeight, setFontFamily]);

    return (
        <div className='option-wrapper'>
            {/* <ExportPresetButton /> */}
            <div className='chatting_row'>
                <span className='label'>샘플 프리셋</span>
                <p className="desc">처음 사용하시거나 빠르게 스타일을 적용하고 싶다면 아래 샘플 프리셋을 선택해보세요.</p>
                <p className="desc">프리셋은 적용 후 자유롭게 수정하실 수 있습니다.</p>
                <p className="desc">추후 다양한 프리셋이 추가될 예정입니다.</p>
                <PresetButton />
            </div>
            {/* 시청자 별명 */}
            <div className='chatting_row'>
                <label>
                    <span className='label'>시청자 별명 (글자길이 테스트용)</span>
                    <input
                        type="text"
                        value={viewerNickname}
                        onChange={(e) => setViewerNickname(e.target.value)}
                    />
                </label>
            </div>
            <div className='chatting_row'>
                <ColorPickerField
                    label="전체 배경색 (투명 사용을 권장합니다.)"
                    color={bodyBgColor}
                    onChange={setBodyBgColor}
                    allowTransparent={true}
                />
            </div>
            {/* 정렬 */}
            <div className='chatting_row'>
                <fieldset>
                    <span className='label'>정렬</span>
                    <label><input type="radio" name="align" value="left" checked={align === 'left'} onChange={e => setAlign(e.target.value)} />왼쪽 정렬</label>
                    <label><input type="radio" name="align" value="center" checked={align === 'center'} onChange={e => setAlign(e.target.value)} />가운데 정렬</label>
                    <label><input type="radio" name="align" value="right" checked={align === 'right'} onChange={e => setAlign(e.target.value)} />오른쪽 정렬</label>
                </fieldset>
            </div>
            {/* 글꼴 */}
            <div className='chatting_row'>
                <label>
                    <span className='label'>글꼴 선택</span>
                    <select
                        value={fontFamily.replace(/['"]/g, "")}
                        onChange={(e) => {
                            const targetValue = e.target.value;
                            const selected = fontList.find(f => f.name.replace(/['"]/g, "") === targetValue);
                            if (selected) {
                                const weights = selected.weight || [];
                                const defaultWeightObj = weights.find(w => w.value === 400) || weights[0];
                                const url = (defaultWeightObj && defaultWeightObj.url) ? defaultWeightObj.url : selected.url;
                                const defaultWeightVal = defaultWeightObj ? defaultWeightObj.value : 400;

                                setFontFamily(selected.name, url, weights, defaultWeightVal);
                            }
                        }}
                    >
                        {fontList.map((font, index) => {
                            const safeName = font.name.replace(/['"]/g, "");
                            return (
                                <option
                                    key={`${safeName}-${index}`}
                                    value={safeName}
                                    style={{ fontFamily: `'${safeName}'` }}
                                >
                                    {font.label}
                                </option>
                            );
                        })}
                    </select>
                </label>
            </div>
            {availableWeights && availableWeights.length > 1 && (
                <div className='chatting_row'>
                    <label>
                        <span className='label'>폰트 굵기</span>
                        <select
                            value={fontWeight}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                const selectedWeight = availableWeights.find(w => w.value === val);
                                if (selectedWeight) {
                                    const currentFont = fontList.find(f => f.name === fontFamily);
                                    const targetUrl = selectedWeight.url || (currentFont ? currentFont.url : '');

                                    setFontWeight(val, targetUrl);
                                }
                            }}
                        >
                            {availableWeights.map(w => (
                                <option key={w.value} value={w.value}>{w.value}</option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
            <div className='chatting_row'>
                <label>
                    <span className='label'>글자 크기 <span className="range-size">{fontSize}px</span></span>
                    <input type="range" min="14" max="64" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
                </label>
            </div>
            {availableWeights && availableWeights.length < 2 && (
                <div className='chatting_row'>
                    <label>
                        <span className='inline_label'>글자 두껍게</span>
                        <input type="checkbox" checked={fontBold} onChange={e => setFontBold(e.target.checked)} />
                    </label>
                </div>
            )}
            <div className='chatting_row'>
                <label>
                    <span className='label'>줄 간격 <span className="range-size">{lineHeight}px</span></span>
                    <input type="range" min="18" max="100" value={lineHeight} onChange={e => setLineHeight(Number(e.target.value))} />
                </label>
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='label'>글자 간격 <span className="range-size">{letterSpacing}px</span></span>
                    <input
                        type="range"
                        min="-2"
                        max="10"
                        step="0.1"
                        value={letterSpacing}
                        onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div className='chatting_row'>
                <fieldset>
                    <span className='label'>글자 효과</span>
                    <label><input type="radio" name="fontEffect" value="none" checked={fontEffect === 'none'} onChange={e => setFontEffect(e.target.value)} />효과 없음</label>
                    <label><input type="radio" name="fontEffect" value="thin-outline" checked={fontEffect === 'thin-outline'} onChange={e => setFontEffect(e.target.value)} />글자 테두리 얇게</label>
                    <label><input type="radio" name="fontEffect" value="bold-outline" checked={fontEffect === 'bold-outline'} onChange={e => setFontEffect(e.target.value)} />글자 테두리 두껍게</label>
                    <label><input type="radio" name="fontEffect" value="shadow" checked={fontEffect === 'shadow'} onChange={e => setFontEffect(e.target.value)} />글자 그림자</label>
                </fieldset>
                {fontEffect !== 'none' && (
                    <div className="effectOptions">
                        <ColorPickerField
                            label="글자 효과 및 테두리 색상"
                            color={fontEffectColor}
                            onChange={setFontEffectColor}
                            allowTransparent={false}
                        />
                        {fontEffect === 'shadow' && (
                            <>
                                <label>
                                    <span className='label'>
                                        그림자 X 오프셋 <span className="range-size">{shadowX}px</span>
                                    </span>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        value={shadowX}
                                        onChange={e => setShadowX(Number(e.target.value))}
                                    />
                                </label>
                                <label>
                                    <span className='label'>
                                        그림자 Y 오프셋 <span className="range-size">{shadowY}px</span>
                                    </span>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        value={shadowY}
                                        onChange={e => setShadowY(Number(e.target.value))}
                                    />
                                </label>
                                <label>
                                    <span className='label'>
                                        그림자 흐림 <span className="range-size">{shadowBlur}px</span>
                                    </span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={shadowBlur}
                                        onChange={e => setShadowBlur(Number(e.target.value))}
                                    />
                                </label>
                            </>
                        )}
                    </div>
                )}
            </div>
            {/* 채팅 */}
            <div className='chatting_row'>
                <label>
                    <span className='label'>채팅 상하 여백 <span className="range-size">{paddingTopBottom}px</span></span>
                    <input
                        type="range"
                        min="0"
                        max="24"
                        step="1"
                        value={paddingTopBottom}
                        onChange={(e) => setPaddingTopBottom(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='label'>채팅 좌우 여백 <span className="range-size">{paddingLeftRight}px</span></span>
                    <input
                        type="range"
                        min="0"
                        max="36"
                        step="1"
                        value={paddingLeftRight}
                        onChange={(e) => setPaddingLeftRight(parseFloat(e.target.value))}
                    />
                </label>
            </div>
            <div className='chatting_row'>
                <ColorPickerField
                    label="채팅 배경색"
                    color={chatBgColor}
                    onChange={setChatBgColor}
                    allowTransparent={true}
                />
            </div>
            <div className='chatting_row'>
                <ColorPickerField label="채팅 글자색" color={chatTextColor} onChange={setChatTextColor} allowTransparent={false} />
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='label'>채팅 박스 둥글기 <span className="range-size">{chatRadius}px</span></span>
                    <input type="range" min="0" max="48" value={chatRadius} onChange={e => setChatRadius(Number(e.target.value))} />
                </label>
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='label'>채팅 사이 간격 <span className="range-size">{chatMarginBottom}px</span></span>
                    <input type="range" min="0" max="50" value={chatMarginBottom} onChange={e => setChatMarginBottom(Number(e.target.value))} />
                </label>
            </div>
            <div className='chatting_row'>
                <fieldset>
                    <span className='label'>채팅 박스 효과</span>
                    <label><input type="radio" name="boxEffect" value="none" checked={boxEffect === 'none'} onChange={e => setBoxEffect(e.target.value)} />효과 없음</label>
                    <label><input type="radio" name="boxEffect" value="outline" checked={boxEffect === 'outline'} onChange={e => setBoxEffect(e.target.value)} />박스 테두리</label>
                    <label><input type="radio" name="boxEffect" value="shadow" checked={boxEffect === 'shadow'} onChange={e => setBoxEffect(e.target.value)} />박스 그림자</label>
                </fieldset>
                {boxEffect !== 'none' && (
                    <div className="effectOptions">
                        <ColorPickerField
                            label="채팅 박스 효과 및 테두리 색상"
                            color={boxEffectColor}
                            onChange={setBoxEffectColor}
                            allowTransparent={true}
                        />
                        {boxEffect === 'outline' && (
                            <label>
                                <span className='label'>
                                    채팅 박스 테두리 두께 <span className="range-size">{boxBorder}px</span>
                                </span>
                                <input
                                    type="range"
                                    min="0"
                                    max="5"
                                    value={boxBorder}
                                    onChange={e => setBoxBorder(Number(e.target.value))}
                                />
                            </label>
                        )}
                        {boxEffect === 'shadow' && (
                            <>
                                <label>
                                    <span className='label'>
                                        채팅 박스 그림자 X 오프셋 <span className="range-size">{boxShadowX}px</span>
                                    </span>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        value={boxShadowX}
                                        onChange={e => setBoxShadowX(Number(e.target.value))}
                                    />
                                </label>
                                <label>
                                    <span className='label'>
                                        채팅 박스 그림자 Y 오프셋 <span className="range-size">{boxShadowY}px</span>
                                    </span>
                                    <input
                                        type="range"
                                        min="-10"
                                        max="10"
                                        value={boxShadowY}
                                        onChange={e => setBoxShadowY(Number(e.target.value))}
                                    />
                                </label>
                                <label>
                                    <span className='label'>
                                        채팅 박스 그림자 흐림 <span className="range-size">{boxShadowBlur}px</span>
                                    </span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={boxShadowBlur}
                                        onChange={e => setBoxShadowBlur(Number(e.target.value))}
                                    />
                                </label>
                            </>
                        )}
                    </div>
                )}
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='inline_label'>채팅 사라짐 효과 사용</span>
                    <input type="checkbox" checked={enableFadeOut} onChange={e => setEnableFadeOut(e.target.checked)} />
                </label>
                {enableFadeOut && (
                    <div className="effectOptions">
                        <label>
                            <span className='label'>채팅 유지 시간 <span className="range-size">{fadeDuration}초</span></span>
                            <input type="range" min="10" max="60" value={fadeDuration} onChange={e => setFadeDuration(Number(e.target.value))} />
                        </label>
                    </div>
                )}
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='inline_label'>시청자 이름 보이기</span>
                    <input type="checkbox" checked={showNickname} onChange={e => setShowNickname(e.target.checked)} />
                </label>
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='label'>닉네임 꼬리말 추가</span>
                    <select
                        value={nicknameSuffixType}
                        onChange={(e) => setNicknameSuffixType(e.target.value)}
                    >
                        <option value="">선택 안 함</option>
                        <option value=" :">:</option>
                        <option value=" ♥">♥</option>
                        <option value=" ♡">♡</option>
                        <option value="님">님</option>
                        <option value=" >">&gt;</option>
                        <option value=" )">)</option>
                        <option value=" ]">]</option>
                        <option value="custom">직접 입력</option>
                    </select>
                </label>
                {nicknameSuffixType !== '' && (
                    <div className="effectOptions">
                        {nicknameSuffixType === 'custom' && (
                            <label style={{ marginBottom: '8px' }}>
                                <span className='label'>직접 입력 (띄어쓰기 포함 가능)</span>
                                <input
                                    type="text"
                                    value={nicknameSuffixCustom}
                                    onChange={(e) => setNicknameSuffixCustom(e.target.value)}
                                    placeholder="예: 님께서 말하길 "
                                />
                            </label>
                        )}
                        <ColorPickerField
                            label="꼬리말 글자색"
                            color={nicknameSuffixColor}
                            onChange={setNicknameSuffixColor}
                            allowTransparent={false}
                        />
                    </div>
                )}
            </div>
            <div className='chatting_row'>
                <label>
                    <span className='inline_label'>시청자 이름 줄바꿈</span>
                    <input type="checkbox" checked={blockNickname} onChange={e => setBlockNickname(e.target.checked)} />
                </label>
                {blockNickname && (
                    <div className='effectOptions'>
                        <ColorPickerField label="이름 배경색" color={nameBgColor} onChange={setNameBgColor} allowTransparent={true} />
                    </div>
                )}
            </div>
            <div className="chatting_row">
                <label>
                    <span className='inline_label'>시청자 이름 글자색 강제설정</span>
                    <input type="checkbox" checked={nameColorCheck} onChange={e => setNameColorCheck(e.target.checked)} />
                </label>
                {nameColorCheck && (
                    <ColorPickerField label="" color={nameColor} onChange={setNameColor} allowTransparent={false} />
                )}
            </div>
            
            {/* 뱃지 아이콘 설정 영역 */}
            <div className='chatting_row'>
                <label>
                    <span className='inline_label'>뱃지 아이콘 보이기</span>
                    <input type="checkbox" checked={showBadge} onChange={e => setShowBadge(e.target.checked)} />
                </label>
                {showBadge && (
                    <div className="effectOptions">
                        <label>
                            <span className='label'>뱃지 크기 <span className="range-size">{userIconSize}px</span></span>
                            <input type="range" min="24" max="48" value={userIconSize} onChange={e => setUserIconSize(Number(e.target.value))} />
                        </label>
                        <label style={{ marginTop: 8, display: 'block' }}>
                            <span className='label'>뱃지 상하 위치 조절 <span className="range-size">{badgeTop}px</span></span>
                            <input type="range" min="-24" max="24" value={badgeTop} onChange={e => setBadgeTop(Number(e.target.value))} />
                        </label>
                    </div>
                )}
            </div>

            {/* 💡 수정된 부분: 이모티콘 크기 밑에 이모티콘 상하 조절 슬라이더 추가 */}
            <div className='chatting_row'>
                <label>
                    <span className='label'>이모티콘 크기 <span className="range-size">{stickerSize}px</span></span>
                    <input type="range" min="24" max="96" value={stickerSize} onChange={e => setStickerSize(Number(e.target.value))} />
                </label>
                <div className="effectOptions" style={{ marginTop: 8 }}>
                    <label>
                        <span className='label'>이모티콘 상하 위치 조절 <span className="range-size">{stickerTop}px</span></span>
                        <input type="range" min="-24" max="24" value={stickerTop} onChange={e => setStickerTop(Number(e.target.value))} />
                    </label>
                </div>
            </div>

            <div className='chatting_row'>
                <label>
                    <span className='inline_label'>방송 공지 사용</span>
                    <input type="checkbox" checked={showNotice} onChange={e => setShowNotice(e.target.checked)} />
                </label>
                {showNotice && (
                    <div className='effectOptions'>
                        <label>
                            <span className='label'>공지 내용</span>
                            <input type="text" value={noticeText} onChange={e => setNoticeText(e.target.value)} />
                        </label>
                        <label>
                            <span className='label'>공지 글자 크기 <span className="range-size">{noticeFontSize}px</span></span>
                            <input type="range" min="16" max="64" value={noticeFontSize} onChange={e => setNoticeFontSize(Number(e.target.value))} />
                        </label>
                        <ColorPickerField label="공지 글자색" color={noticeTextColor} onChange={setNoticeTextColor} allowTransparent={false} />
                        <ColorPickerField
                            label="공지 배경색"
                            color={noticeBgColor}
                            onChange={setNoticeBgColor}
                            allowTransparent={true}
                        />
                        <label>
                            <span className='label'>공지 높이 <span className="range-size">{noticeHeight}px</span></span>
                            <input type="range" min="40" max="100" value={noticeHeight} onChange={e => setNoticeHeight(Number(e.target.value))} />
                        </label>
                        <label>
                            <span className='label'>공지 박스 둥글기 <span className="range-size">{noticeRadius}px</span></span>
                            <input type="range" min="0" max="48" value={noticeRadius} onChange={e => setNoticeRadius(Number(e.target.value))} />
                        </label>
                    </div>
                )}
            </div>
        </div>
    );
}

export default OptionPanel;