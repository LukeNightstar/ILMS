# Project ILMS
## 주요 기능 : 강의 / 과제 / 게시판(커뮤니티) / 관리자 모드

### installPackage
```
npm i
```
## 반드시 DB 생성과 API 연결 후 서버를 시작할 것
```
.env 파일 생성 후 
.env.template의 내용을 복사하여 사용할 것

.env 파일에 API의 key 입력 및 TeacherID 기입(관리자 모드 작동)

clerk의 webhook 설정 > ngrok로 localhost 외부포트로 생성
```

## Prisma DB 생성
```bash
npx prisma db push
npx prisma generate
node scripts/seed.ts
```
#### DB에 대해서 
만약 개발을 완료하고 배포까지 고려하고 있다면, DB를 로컬 자원을 사용하지 말고 PlanetScale과 같은 웹 서버 DB를 사용할 것
```
npx prisma studio
```

## Clerk WebHook 설정
```
clerk dashboard에서 webhook 생성 후 webhook secret을 env 등록해야함
배포 전에는 ngrok를 통해서 localhost를 외부에서 접속 가능하게 만들어야 함
https://ngrok로 만든 url/api/webhook/user
배포 후에는 배포된 domain 으로 webhook을 수정해야함
https://배포된 url/api/webhook/user
```

## 개발자 모드
```bash
npm run dev
```

로컬 주소 : [http://localhost:3000](http://localhost:3000)

## Learn More (Next.js)

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Next.js GitHub repository](https://github.com/vercel/next.js/)

## 배포 Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## 참고
개발환경
```
macOS SONOMA 14.0
iTerm
IntelliJ IDEA
DataGrip
Arc Browser
```

벤치마킹
- [discord Bot MEE6](https://mee6.xyz/en)

UI 
- [shadcn-ui](https://ui.shadcn.com/)
- [tailwindCSS](https://tailwindcss.com/)
- [MUI](https://mui.com/)

DB
- [PlanetScale](https://planetscale.com/)

API
- [clerk](https://clerk.com/)
- [edgeStore](https://edgestore.dev/)
- [uploadThing](https://uploadthing.com/)
- [ngrok](https://ngrok.com/)
- [MUX](https://www.mux.com/)

CodeWithAntonio
- [CodeWithAntonio](https://www.codewithantonio.com/) : 6년차+a 풀스택 개발자 Antonio님의 강의에 정말 많은 도움을 받았습니다.
- [Antonio's Github](https://github.com/AntonioErdeljac)