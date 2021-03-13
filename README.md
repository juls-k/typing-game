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

js 모듈 구성
index.js - 화면 초기화
common.js - 버튼 이벤트, 단어 API 호출, 타이머, 점수 계산 등 게임 주요 기능
router.js - 해시 라우터 방식 사용, 라우팅 페이지의 핸들바(hbs) 템플릿 렌더링


### 게임 플레이 화면
![game_play](https://user-images.githubusercontent.com/80272087/111021840-6ee96780-8412-11eb-8c77-bf90e32c4a12.PNG)

게임 플레이


게임 데이터(문제): 게임 플레이 화면 렌더링시 API를 통해 게임 데이터를 초기화합니다.


점수: API로 부터 받아온 데이터 배열의 length를 총 점수로 사용합니다. (각 스테이지 별 시간이 만료될 경우 -1점)


초기화: 초기화 버튼을 누를 시 게임 시작 전 화면으로 이동되며 게임 데이터가 초기화됩니다.


게임


게임을 시작합니다. 


Input 박스에 포커스를 활성화시켜 클릭 후 바로 문제를 작성할 수 있도록 합니다.


문제를 차례로 노출합니다. 


Input 박스에 입력한 값과 스테이지의 문제 단어가 일치하면 점수 차감 없이 다음 스테이지 문제를 노출합니다.


타이머 만료시 점수가 1점 차감되며 다음 스테이지 문제를 노출합니다.


각 스테이지의 문제를 맞출 때마다 문제를 푸는데 걸린 시간(문제당 기준 시간 - 문제당 남은 타이머 시간)을 더합니다.




### 게임 결과 화면
![game_result](https://user-images.githubusercontent.com/80272087/111021842-70b32b00-8412-11eb-8425-2cab09e69d1e.PNG)


모든 스테이지가 완료되면 게임 결과 페이지로 이동합니다.


각 스테이지 별 문제를 푸는데 걸린 시간(문제당 기준 시간 - 문제당 남은 타이머 시간)을 현재 남은 점수로 나누어 평균 소요 시간을 노출합니다.


다시 시작 버튼을 클릭할 시 게임 페이지로 이동하여 게임을 시작할 수 있습니다.


