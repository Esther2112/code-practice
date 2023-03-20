/*
    게임인원 입력받기 (2 ~ 4명)
    플레이어 이름 입력받아서 배열에 저장(n번 플레이어 : 이름)
    실탄개수 입력받아서 배열에 랜덤으로 저장 
    1번 플레이어부터 시작 '[이름 님의 턴!] 탄창을 회전합니다.'
    # 엔터를 누르면 격발합니다. --> 생존 or 사망
    총알 모두 소진하면 게임 종료
    생존인원 출력
*/

//플레이어 정보 입력
var players = [];
var temp = prompt(`게임을 플레이할 인원을 입력하세요`);
while (true) {
    if (isNaN(+temp)) {
        temp = prompt(`숫자가 아닙니다. 게임을 플레이할 인원을 숫자로 입력하세요`);
    } else if (+temp > 6 || +temp <= 1) {
        temp = +prompt(`게임을 플레이할 인원을 2명 이상 6명 이하로 입력하세요`);
    } else {
        alert(`총 플레이어는 ${temp}명입니다`);
        players.length = +temp;
        break;
        
    }

}

for (var i = 0; i < players.length; i++) {
    players[i] = prompt(`플레이어 이름을 등록합니다.\n${i+1}번 플레이어 이름 : `)
}
alert(`${players} 참가!`)

//총 준비
var shotGun = [0, 0, 0, 0, 0, 0];
var numOfShot = +prompt(`실탄 개수`);
while (numOfShot >= players.length) {
    numOfShot = +prompt(`실탄 개수가 플레이어 수보다 많거나 같습니다.\n실탄 개수를 다시 입력해주세요.`);
}
var loaded = 0;
while (loaded < numOfShot) {
    var index = Math.floor(Math.random() * 6);
    if (shotGun[index] === 0) {
        shotGun[index] = 1;
        loaded++;
    } else {
        continue;
    }
}

//게임 시작
var deathCount = 0;
var shotGunIndex = 0;
alert(`총을 받았습니다. ${players[0]}부터 시작합니다.`);
while (numOfShot !== deathCount) {
    for (var i = 0; i < players.length; i++) {
        prompt(`[ ${players[i]}님의 턴! ] 탄창을 회전합니다.\n # 엔터를 누르면 격발합니다.`);
        if (shotGun[shotGunIndex] === 0) {
            alert(`휴... ${players[i]}님은 생존했습니다.`);
            shotGunIndex++;
        } else {
            alert(`빵!! [${players[i]}]님 사망...RIP`);
            players.splice(i, 1);
            shotGunIndex++;
            deathCount++;
            i--;
        }
        if (numOfShot === deathCount) {
            break;
        }
    }
}
alert(`# 총알이 모두 소진되었습니다. 게임을 종료합니다.\n# 생존한 인원 : ${players}`);