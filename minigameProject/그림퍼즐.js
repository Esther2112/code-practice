//원본 이미지 소스 배열 4 x 4
const originImage = ['minigameProject/image/0.png', 'minigameProject/image/1.png'
, 'minigameProject/image/2.png', 'minigameProject/image/3.png', 
'minigameProject/image/4.png', 'minigameProject/image/5.png', 
'minigameProject/image/6.png', 'minigameProject/image/7.png', 
'minigameProject/image/8.png', 'minigameProject/image/9.png', 
'minigameProject/image/10.png', 'minigameProject/image/11.png', 
'minigameProject/image/12.png', 'minigameProject/image/13.png', 
'minigameProject/image/14.png', null];
//원본 복사
const copyOfOrigin = [...originImage];
//빈배열
const mixedImage = [];


//이미지 섞어서 빈배열에 저장
orderedIndex = 0;
while (mixedImage.length < 15) {
    const mixedIndex = Math.floor(Math.random() * 16);
    if (copyOfOrigin[mixedIndex] === null) {
        continue;
    } else {
        mixedImage.push(copyOfOrigin[mixedIndex]);
        copyOfOrigin[mixedIndex] = null;
    }

    const $setImage = document.querySelector(`#index${orderedIndex}`);
    // console.log(`${mixedImage[orderedIndex]}`);
    $setImage.style.background = `url(${mixedImage[orderedIndex]})`;
    // $setImage.classList.add(`${mixedImage[orderedIndex]}`);

    orderedIndex++;
}

//퍼즐맞추기
//클릭가능 버튼 지정하기
//배열 사본 생성
const $puzzle = document.querySelector('.puzzle').children;
const $blank = document.querySelector('#blank');
const arrayOfPics = [...$puzzle];
//blank 인덱스 찾기
let movePoint = arrayOfPics.indexOf($blank);
// console.log(movePoint);
//4칸, 1칸거리 그림들에게 movable 클래스 주기
for(let i = 0; i < arrayOfPics.length; i++) {
    if(Math.abs(arrayOfPics[i] - movePoint) === 4 ||
        Math.abs(arrayOfPics[i] - movePoint) === 1) {
        $puzzle[i].classList.add('movable');
    }
}
//movable 움직이기

