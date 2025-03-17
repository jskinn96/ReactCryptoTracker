// import React from 'react';
import ReactDOM from 'react-dom/client';
//g 라우터를 연결시키기 위해 필요
import { RouterProvider } from "react-router-dom";
import { router } from './CryptoTracker/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//g 리액트 쿼리로 관리 중인 데이터 캐시를 확인할 수 있다.
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
//g recoil 상태를 연결하기 위해 필요 
import { RecoilRoot } from 'recoil';

/**
* g QueryClient 기본 설정 추가
* g 옵션은 CryptoTracker\component\CoinMain.tsx 참고
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 신선한 상태 유지
      cacheTime: 1000 * 60 * 10, // 10분 후 캐시 삭제
      retry: 2, // 요청 실패 시 2번 재시도
      refetchOnWindowFocus: false, // 창 전환 시 자동 리패치 비활성화
    },
  },
});
**/
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  //   <ThemeProvider theme={DarkMode}>
  //     <Reset />
  //     <RouterProvider router={router} />
  //   </ThemeProvider>
  // </React.StrictMode>
  <RecoilRoot>
    <QueryClientProvider client={queryClient}> 
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </RecoilRoot>
);