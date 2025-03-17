import styled, { keyframes } from 'styled-components';

const rotateCoin = keyframes`
    /* 0%: 코인이 정면을 향하고 있음 */
    0% {
        /* 코인 전체 너비 (정면) */
        width: var(--coin-diameter);
        /* 중심 정렬 */
        transform: translateX(0);                    
        /* 완전한 동전 원 모양 */
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%), var(--coin-face-color);
        /* 측면 (옆면) 표시를 위한 그림자 초기화 (정면에서는 보이지 않음) */
        box-shadow: 0 0 0 var(--coin-edge-dark);     
    }

    /* 49.999%: 코인이 절반 회전하여 옆면을 향하기 직전 (앞면이 보이지 않는 상태) */
    49.999% {
        /* 코인의 보이는 너비를 매우 얇게 (옆면 두께) */
        width: var(--coin-edge-thickness);
        /* 왼쪽으로 절반 두께만큼 이동하여 중심 보정 */
        transform: translateX(calc(-1 * var(--half-edge)));
        /* 옆에서 본 경우에도 타원 형태 유지 */
        border-radius: 50%;
        /* 코인 표면 어둡게 (거의 보이지 않음) */
        background-color: var(--coin-face-lowlight);
        /* 다중 그림자를 사용하여 코인 측면 전체를 채움 (양수 방향 그림자) */
        box-shadow: 
        1px 0 0 var(--coin-edge-color),
        2px 0 0 var(--coin-edge-color),
        3px 0 0 var(--coin-edge-color),
        4px 0 0 var(--coin-edge-color),
        5px 0 0 var(--coin-edge-color),
        6px 0 0 var(--coin-edge-color),
        7px 0 0 var(--coin-edge-color),
        8px 0 0 var(--coin-edge-color),
        9px 0 0 var(--coin-edge-color),
        10px 0 0 var(--coin-edge-color),
        11px 0 0 var(--coin-edge-color),
        12px 0 0 var(--coin-edge-color);
    }

    /* 50%: 코인이 정확히 옆면을 향한 상태 (앞면->뒷면 전환 지점) */
    50% {
        width: var(--coin-edge-thickness);
        /* transform은 그대로 유지 (translateX 동일) */
        transform: translateX(calc(-1 * var(--half-edge)));
        border-radius: 50%;
        background-color: var(--coin-face-lowlight);
        /* 이 순간에는 앞면/뒷면 전환이 이루어지므로 동일하게 처리 */
        box-shadow: 
        1px 0 0 var(--coin-edge-color),
        2px 0 0 var(--coin-edge-color),
        3px 0 0 var(--coin-edge-color),
        4px 0 0 var(--coin-edge-color),
        5px 0 0 var(--coin-edge-color),
        6px 0 0 var(--coin-edge-color),
        7px 0 0 var(--coin-edge-color),
        8px 0 0 var(--coin-edge-color),
        9px 0 0 var(--coin-edge-color),
        10px 0 0 var(--coin-edge-color),
        11px 0 0 var(--coin-edge-color),
        12px 0 0 var(--coin-edge-color);
    }

    /* 50.001%: 코인이 절반 이상 회전하여 뒷면이 보이기 시작 (옆면 상태 유지) */
    50.001% {
        width: var(--coin-edge-thickness);
        /* 오른쪽으로 절반 두께만큼 이동하여 중심 보정 (반대측) */
        transform: translateX(var(--half-edge));
        border-radius: 50%;
        background-color: var(--coin-face-lowlight);
        /* 반대 방향(음수 방향)으로 측면 그림자 적용 */
        box-shadow: 
        -1px 0 0 var(--coin-edge-color),
        -2px 0 0 var(--coin-edge-color),
        -3px 0 0 var(--coin-edge-color),
        -4px 0 0 var(--coin-edge-color),
        -5px 0 0 var(--coin-edge-color),
        -6px 0 0 var(--coin-edge-color),
        -7px 0 0 var(--coin-edge-color),
        -8px 0 0 var(--coin-edge-color),
        -9px 0 0 var(--coin-edge-color),
        -10px 0 0 var(--coin-edge-color),
        -11px 0 0 var(--coin-edge-color),
        -12px 0 0 var(--coin-edge-color);
    }

    /* 100%: 코인이 한 바퀴 돌아 다시 정면 (뒷면) 을 향함 */
    100% {
        width: var(--coin-diameter);
        /* 다시 중심으로 복귀 */
        transform: translateX(0);
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%), var(--coin-face-color);
        /* 초기 상태와 동일하게 설정 (다크 엣지 색상으로 그림자 초기화) */
        box-shadow: 0 0 0 var(--coin-edge-dark);
    }
`;


const Coin3D = styled.div`
    /* CSS 변수 정의: 코인 크기와 색상 */
    /* 코인 지름 */
    --coin-diameter: 100px;
    /* 코인 두께 */
    --coin-thickness: 12px;
    --half-edge: calc(var(--coin-thickness) / 2);
    /* 옆면에서 보이는 최소 두께 (거의 0에 가까운 값) */
    --coin-edge-thickness: 2px;
    /* 코인 표면 색 (금색) */
    --coin-face-color: #FFD700;
    /* 코인 표면 어두운 색 (옆으로 기울어졌을 때) */
    --coin-face-lowlight: #CCAC00;
    /* 코인 측면 색 (금속의 옆면) */
    --coin-edge-color: #CCAC00;
    /* 코인 측면 암부 색 (그림자) */
    --coin-edge-dark: #B08D00;

    width: var(--coin-diameter);
    height: var(--coin-diameter);
    border-radius: 50%;
    position: relative;
    /* 3D 효과를 위해 요소를 화면에 가운데 배치 및 적절한 원근 설정 */
    margin: 50px auto;
    /* 원근감 부여 (회전에 약간의 3D 깊이) */
    perspective: 800px;
    transform-style: preserve-3d;
    
    /* 애니메이션 적용: 무한 회전 */
    animation: ${rotateCoin} 3s ease-in-out infinite;
`;

const LoadingEl = () => {
    
    return <Coin3D />;
};

export default LoadingEl;
