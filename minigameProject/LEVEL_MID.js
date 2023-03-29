/*
    <업데이트 해야 할것>
    그림 섞을때 13, 14가 서로 섞이면 안됨
    마지막 퍼즐 맞춘 후 엔딩알럿 띄우기
    레벨 선택에 따른 이미지 변경
    css 개선
 */

// const lowLevel = document.querySelector('.lowLevel');

// function setLowLevel() {
//     const lowLevelGame = document.querySelector('.lowLevelGame');
//     const $puzzle = document.querySelectorAll('.puzzle');
//     $puzzle[1].style.display = 'none';
//     $puzzle[2].style.display = 'none';
//     lowLevelGame.style.display = 'block';
//     // document.querySelector('.midLevel').removeEventListener('click', setMidLevel);
//     // document.querySelector('.highLevel').removeEventListener('click', setHighLevel);
    
//     // low_playPuzzleGame();
// }
// // console.log(setMidLevel ());
// lowLevel.addEventListener('click', setLowLevel);

// const midLevel = document.querySelector('.midLevel');

// function setMidLevel() {
//     const midLevelGame = document.querySelector('.midLevelGame');
//     const $puzzle = document.querySelectorAll('.puzzle');
//     $puzzle[0].style.display = 'none';
//     $puzzle[2].style.display = 'none';
//     midLevelGame.style.display = 'block';
//     // document.querySelector('.lowLevel').removeEventListener('click', setLowLevel);
//     // document.querySelector('.highLevel').removeEventListener('click', setHighLevel);
//     playPuzzleGame();
// }
// // console.log(setMidLevel ());
// midLevel.addEventListener('click', setMidLevel);

// const highLevel = document.querySelector('.highLevel');

// function setHighLevel() {
//     const highLevelGame = document.querySelector('.highLevelGame');
//     const $puzzle = document.querySelectorAll('.puzzle');
//     $puzzle[0].style.display = 'none';
//     $puzzle[1].style.display = 'none';
//     highLevelGame.style.display = 'block';
//     // document.querySelector('.lowLevel').removeEventListener('click', setLowLevel);
//     // document.querySelector('.MidLevel').removeEventListener('click', setMidLevel);
// }
// // console.log(setMidLevel ());
// highLevel.addEventListener('click', setHighLevel);



const originImage = ['image/0.png', 'image/1.png', 'image/2.png', 'image/3.png',
    'image/4.png', 'image/5.png', 'image/6.png', 'image/7.png',
    'image/8.png', 'image/9.png', 'image/10.png', 'image/11.png',
    'image/12.png', 'image/13.png', 'image/14.png', null
];

function getImage() {
    //이미지 준비============================================================================
    //원본 이미지 소스 배열 4 x 4
    //원본 복사
    const copyOfOrigin = [...originImage];
    //빈배열
    const mixedImage = [];
    const $picture = document.querySelector('.midLevelGame');
    //이미지 섞어서 빈배열에 저장
    // function setImage() {
    orderedIndex = 0;
    while (mixedImage.length < 15) {
        // const mixedIndex = Math.floor(Math.random() * 16);
        // if (copyOfOrigin[mixedIndex] === null) {
        //     continue;
        // } else {
        //     mixedImage.push(copyOfOrigin[mixedIndex]);
        //     copyOfOrigin[mixedIndex] = null;
        // }
        //==================테스트용===========================================
        const mixedIndex = orderedIndex;
        if (copyOfOrigin[mixedIndex] === null) {
            continue;
        } else {
            mixedImage.push(copyOfOrigin[mixedIndex]);
            copyOfOrigin[mixedIndex] = null;
        }
        //==================테스트용===========================================

        const $setImage = document.createElement('div');
        $setImage.classList.add('mixedImage');
        $setImage.id = `index${orderedIndex}`;
        $setImage.style.background = `url(${mixedImage[orderedIndex]})`;
        $picture.appendChild($setImage);

        orderedIndex++;
    }
    const $setImage = document.createElement('div');
    $setImage.classList.add('mixedImage');
    $setImage.id = `blank`;
    $picture.appendChild($setImage);
}

//클릭가능 버튼 지정하기==========================================================
function setMovePoint() {
    const $puzzle = document.querySelector('.midLevelGame').children;
    const arrayOfPics = [...$puzzle];
    //배열 사본 생성
    const $blank = document.querySelector('#blank');
    //blank 인덱스 찾기
    let movePoint = arrayOfPics.indexOf($blank);
    // console.log(movePoint);
    //4칸, 1칸거리 그림들에게 movable 클래스 주기
    //blank가 가장자리에 있을때 예외사항 두기
    for (let i = 0; i < arrayOfPics.length; i++) {
        if ((i - movePoint) === -1 &&
            (i + 1) % 4 == 0) {
            continue;
        }
        if ((i - movePoint) === 1 &&
            i % 4 === 0) {
            continue;
        }
        if (Math.abs(i - movePoint) === 4 ||
            Math.abs(i - movePoint) === 1) {

            $puzzle[i].classList.add('movable');

        }
    }

}


function endOfGame() {
    const $puzzle = document.querySelector('.midLevelGame').children;
    const arrayOfPics = [...$puzzle];
    for (let i = 0; i < arrayOfPics.length - 1; i++) {
        if (arrayOfPics[i].style.background === `url("${originImage[i]}")`) {
            arrayOfPics[i].style.opacity = 1;
        } else {
            return;
        }
    }
    
    const $ending = document.querySelector('.ending');
    $ending.style.display = 'block';
    return;
}

//movable 움직이기=========================================================================
function movePuzzle(e) {
    const $picture = document.querySelector('.midLevelGame');
    const $blank = document.querySelector('#blank');
    setMovePoint();
    if (e.target.matches('.puzzle .movable')) {
        //    e.target.style.background = 'red';
        $blank.style.background = e.target.style.background;
        e.target.style.background = null;

        let temp = e.target.id;
        e.target.id = $blank.id;
        $blank.id = temp;
    }
    // [...$picture.children].forEach($pic => $pic.classList.remove('movable'));
    const $puzzle = [...$picture.children];
    for (let i = 0; i < $puzzle.length; i++) {
        if ($puzzle[i].classList.contains('movable')) {
            $puzzle[i].classList.remove('movable');
        }
    }
    endOfGame();
    return;
}


function playPuzzleGame() {
    getImage();
    const $picture = document.querySelector('.midLevelGame');
    $picture.addEventListener('click', movePuzzle);
}

playPuzzleGame();