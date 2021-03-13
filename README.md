# typing-game

주어진 단어가 표시되면 Input에 단어를 정해진 시간 내에 입력하여 점수를 획득하는 Web Application
* webpack, vanilla JS

## Install
  npm install
## Usage
  npm run start
## Build
  npm run build
## Test
  npm run test
  



### 프로젝트 구성
![initial](https://user-images.githubusercontent.com/80272087/111021747-f71b3d00-8411-11eb-871a-05208734c2a8.PNG)

####js 모듈 구성


index.html에 게임 결과, 완료 화면 템플릿을 router.js를 통해 렌더링합니다.
라우팅 방식은 hash router 방식을 사용합니다.
게임 주요 기능(단어 API 호출, 버튼 이벤트, 타이머, 점수 계산 등)은 common.js로 모듈화합니다.


### 게임 플레이 화면
![game_play](https://user-images.githubusercontent.com/80272087/111021840-6ee96780-8412-11eb-8c77-bf90e32c4a12.PNG)



### 게임 결과 화면
![game_result](https://user-images.githubusercontent.com/80272087/111021842-70b32b00-8412-11eb-8425-2cab09e69d1e.PNG)
