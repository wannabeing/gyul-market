# 귤마켓

**NextJs**를 이용한 당근마켓 클론 사이트입니다.<br>

[velog](https://velog.io/@wannabeing/Next.js-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0)에서도 보실 수 있습니다.

<br>

---

## 🌐 프로젝트 링크

[클릭](https://gyul-market-8bhs1esvp-wannabeing.vercel.app/)하시면 이동합니다.

---

## 🚀 개발환경

- **프론트엔드**: React, NextJS, TailwindCSS
- **백엔드**: Prisma, PlanetScale
- **배포**: Vercel, PlanetScale
- **라이브러리**: npm, Twillo, CloudFlare, SendGrid, SWR, iron-session 등
- **언어**: JavaScript, TypeScript

---

## 📦 프로젝트 구조

    src
    ├── componenets/* 		# 리액트 컴포넌트 폴더
    └── libs 				# JS 함수 라이브러리 폴더
        └── client/* 			# 프론트 JS 폴더
        └── server/* 			# 서버 JS 폴더
    └── pages 				# 라우트 폴더
        └── api					# 내장 API 서버
            └── posts/* 			# 동네생활 API
            ├── products/* 			# 상품 API
            ├── streams/* 			# 라이브 스트리밍 API
            ├── users/*				# 유저 API
                ....
                └── enter.ts 		# sms/mail 인증 API
                └── token.ts 		# 토큰 발급 API
          	└── imgfile.ts 			# CloudFlare API
            	....
        ├── chats/*				# 채팅 컴포넌트 페이지
        ├── community/*         # 동네생활 컴포넌트 페이지
        ├── faq/*               # FAQ 컴포넌트 페이지
        ├── products/*          # 상품 컴포넌트 페이지
        ├── profile/*           # 유저 컴포넌트 페이지
        ├── streams/*           # 라이브 스트리밍 컴포넌트 페이지
        ├── _app.tsx			# 최상위 컴포넌트
        ├── enter.tsx        	# 회원가입 컴포넌트 페이지
        └── index.tsx        	# 메인 컴포넌트 페이지
    ├── posts/*        		# FAQ 정적파일 폴더
    ├── prisma/*           	# DB 스키마 폴더
    └── styles/*           	# 전역 CSS 폴더

---

## ⚙️ 기능

- **상품**

  - 상품 좋아요 기능 구현
  - 상품 업로드 및 상세 페이지 구현

- **동네생활**

  - 질문글 업로드 및 상세 페이지 구현
  - 유저 위치를 통한 동네인증 마크 구현
  - 궁금해요 기능 구현
  - 답변댓글 실시간 업로드 구현

- **채팅**

  - 채팅 업로드 및 상세 페이지 구현

- **라이브**

  - CloudFlare를 통한 라이브 스트리밍 기능 구현
  - 라이브 스트리밍 댓글 실시간 업로드 구현

- **유저**

  - SendGrid를 통한 이메일 인증 구현
  - TWILIO를 통한 문자 인증 구현
  - 토큰 인증 구현
  - iron-session을 이용한 stateless 세션 로그인/로그아웃 기능 구현
  - 유저 프로필 이미지 변경 기능 구현

- **이외**

  - ISR을 이용한 FAQ 페이지 렌더링
  - TailwindCSS 를 이용한 CSS 적용

---

## ⏱️ 앞으로 추가할 수 있는 기능

    - 토큰 인증은 회원가입 할 경우에만 사용
    - 채팅 기능 구현
    - 무한 스크롤 구현
    - 프로필 이미지 수정시, 로딩시간을 줄이거나 로딩 보여주기
    - 상품 상세 페이지 모달 구현
    - FAQ 탭 추가하여 사용자에게 보이기 및 FAQ 업데이트
    - SNS 계정 로그인 기능 추가

---

## 🎞 상세 페이지 정보

<details>
<summary>메인 페이지 (로그인/로그아웃)</summary>

> ### 로그인 메인페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/1f4005e2-a999-41b6-87c1-afb246eac95c/image.png)

> ### 로그아웃 메인페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/efb6aa55-3ace-49f8-b556-806f783df562/image.png)

</details>

<details>
<summary>회원가입 페이지</summary>

> ### 이메일 탭
>
> ![](https://velog.velcdn.com/images/wannabeing/post/efb6aa55-3ace-49f8-b556-806f783df562/image.png)

> ### 휴대폰 탭
>
> ![](https://velog.velcdn.com/images/wannabeing/post/4c19dd91-1483-4fd4-bb4e-78b2182a6e7f/image.png)

> ### 토큰 입력 페이지 (로그인 이후)
>
> ![](https://velog.velcdn.com/images/wannabeing/post/ac11cd23-b416-4c65-ad3b-b8b20813672a/image.png)![](https://velog.velcdn.com/images/wannabeing/post/6fd67132-e8b3-4ae7-8cdf-ae9e1890e3ac/image.png)

> ![](https://velog.velcdn.com/images/wannabeing/post/84fb2a2c-3b8c-464b-b0de-8bcab3df2e28/image.png)

</details>

<details>
<summary> 상품 페이지 </summary>

> ### 상품 상세 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/0d0a96f4-5a68-4055-99f4-1e2667efeeb8/image.png)

> ### 상품 업로드 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/b83a738b-460a-4f8b-a459-83986a3de151/image.png)

</details>

<details>
<summary> 동네생활 페이지 </summary>

> ### 동네생활 메인 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/e4f1d3ed-8b5e-4bbe-988f-8ef8cc6c9235/image.png)

> ### 동네생활 업로드 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/83c8f8c3-8319-450e-8cb1-36fdc3ad8806/image.png)

> ### 동네생활 상세 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/5bc4f447-0c1a-4441-bf6c-2531c068e3bf/image.png)

</details>

<details>
<summary> 채팅 페이지 </summary>

> ### 채팅 메인 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/4a10817e-fd16-439c-aa6e-1ec5241e37bc/image.png)

> ### 채팅 상세 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/19dbaebb-3652-421c-ab7b-c5e8ea949141/image.png)

</details>

<details>
<summary> 라이브 스트리밍 페이지 </summary>

> ### 라이브 메인 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/6f486840-9a51-4d01-bdec-b09a0fa4200f/image.png)

> ### 라이브 페이지 구현 (OBS 이용)
>
> ![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/79440384/195507005-0efeb3cf-139f-4420-8f7f-e23da54abb06.gif)

> ### 라이브 시작 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/6f54a4fc-0138-4e19-a83f-893a8ffbab6e/image.png)

> ### 라이브 상세 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/7ec1d690-f7e5-4be6-b3fd-4bf261d220be/image.png)

</details>

<details>
<summary> 프로필 페이지 </summary>

> ### 프로필 메인 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/20eb69f7-703a-4390-8d22-63c705fe5581/image.png)

> ### 판매내역/구매내역/관심목록 페이지 (동일)
>
> ![](https://velog.velcdn.com/images/wannabeing/post/2de88908-3749-460c-82f1-9640bd1c35e4/image.png)

> ### 프로필 변경 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/82e58e11-260b-4b07-816b-dea6ae6aa0ac/image.png)

</details>

<details>
<summary> FAQ 페이지 </summary>

> ### FAQ 메인 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/fba705d8-1500-46f9-904f-9bed8ac95ac3/image.png)

> ### FAQ 상세 페이지
>
> ![](https://velog.velcdn.com/images/wannabeing/post/882423da-2215-402c-b43e-97935e04210a/image.png)

</details>

---

## 👩‍💻 느낀 점

- SPA + SSR 방식으로써, express + React 같은 느낌을 받았다.
- 메일/문자 인증 구현을 하면서 너무나도 하고 싶었던 부분이였기 때문에 즐겁게 했다.
- TailwindCSS가 얼마나 좋은지도 경험했다.
  css가 길어질수록 가독성은 떨어지지만 너무나도 쉽게 스타일을 만들 수 있었다.
- 타입스크립트가 많이 어려워서 헤맸다.. 🥲
- 리액트 쿼리와 SWR의 장/단점을 알게 되었다.
- 리액트 훅 폼은 앞으로 계속해서 사용할꺼 같다. 정말 너무 편리하다.
- CloudFlare의 스트리밍 기능은 생각보다 좋았고, 편리했다.
  하지만 이미지 API는 구현은 너무 쉬웠다..
- **아쉬웠던 점은**, Cloudflare의 이미지 API의 서버가 너무 느렸다. 또한 React가 익숙하지 않은 상태에서 Next를 사용하려다보니 많이 헤맸다. React 관련 프로젝트를 더 해야겠다는 생각을 했다.
