const originImage = ['minigameProject/image/0.png', 'minigameProject/image/1.png', 'minigameProject/image/2.png', 'minigameProject/image/3.png',
    'minigameProject/image/4.png', 'minigameProject/image/5.png',
    'minigameProject/image/6.png', 'minigameProject/image/7.png',
    'minigameProject/image/8.png', 'minigameProject/image/9.png',
    'minigameProject/image/10.png', 'minigameProject/image/11.png',
    'minigameProject/image/12.png', 'minigameProject/image/13.png',
    'minigameProject/image/14.png', null
];


function getImage() {
    //이미지 준비============================================================================
    //원본 이미지 소스 배열 4 x 4
    //원본 복사
    const copyOfOrigin = [...originImage];
    //빈배열
    const mixedImage = [];

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

        const $setImage = document.querySelector(`#index${orderedIndex}`);
        $setImage.style.background = `url(${mixedImage[orderedIndex]})`;

        orderedIndex++;
    }
}



//클릭가능 버튼 지정하기==========================================================
function setMovePoint() {
    const $puzzle = document.querySelector('.puzzle').children;
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
    const $puzzle = document.querySelector('.puzzle').children;
    const arrayOfPics = [...$puzzle];
    for (let i = 0; i < arrayOfPics.length - 1; i++) {
        if (arrayOfPics[i].style.background === `url("${originImage[i]}")`) {
            // arrayOfPics[i].style.background === 'green';
            // console.log(arrayOfPics.length);
            // console.log(arrayOfPics[i].style.background);
            // console.log(`url("${originImage[i]}")`);
        } else {
            return;
        }
    }
    alert('끝!!!!!!!!!!!!!!!!!!!!!!');
}

//movable 움직이기=========================================================================
function movePuzzle(e) {
    const $picture = document.querySelector('.puzzle');
    const $blank = document.querySelector('#blank');
    setMovePoint();
    if (e.target.matches('.puzzle .movable')) {
        //    e.target.style.background = 'red';
        $blank.style.background = e.target.style.background;
        e.target.style.background = null;

        let temp = e.target.id;
        e.target.id = $blank.id;
        $blank.id = temp;
        [...$picture.children].forEach($pic => $pic.classList.remove('movable'));

        endOfGame();
    }
}

function playPuzzleGame() {
    getImage();
    const $picture = document.querySelector('.puzzle');
    $picture.addEventListener('click', movePuzzle);
    
}

playPuzzleGame();