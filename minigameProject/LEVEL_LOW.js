const originImage = ['image/l0.png', 'image/l1.png', 'image/l2.png', 'image/l3.png',
    'image/l4.png', 'image/l5.png',
    'image/l6.png', 'image/l7.png', null
];

function getImage() {
    //이미지 준비============================================================================
    //원본 이미지 소스 배열 4 x 4
    //원본 복사
    const copyOfOrigin = [...originImage];
    //빈배열
    const mixedImage = [];
    const $picture = document.querySelector('.lowLevelGame');
    //이미지 섞어서 빈배열에 저장

    //mixImage에 순차적으로 이미지 넣기
    for (let i = 0; i < copyOfOrigin.length; i++) {
        mixedImage.push(copyOfOrigin[i]);
    }

    let orderedIndex = 0;
    while (true) {
        const $setImage = document.createElement('div');
        $setImage.classList.add('mixedImage');
        $setImage.id = `index${orderedIndex}`;
        if (orderedIndex === mixedImage.length - 1) {
            $setImage.id = `blank`;
            $picture.appendChild($setImage);
            break;
        }
        $setImage.style.background = `url(${mixedImage[orderedIndex]})`;
        $picture.appendChild($setImage);

        orderedIndex++;
    }

    //blank가 돌아다니면서 그림 섞기 --- 6, 8 사라짐
    const UP = 0;
    const LEFT = 1;
    const RIGHT = 2;
    const DOWN = 3;
    let shuffleCount = 0;

    const $puzzle = document.querySelector('.lowLevelGame').children;
    const arrayOfPics = [...$puzzle];
    let temp;
    while (shuffleCount < 1000) {
        const $blank = document.querySelector('#blank');
        let movePoint = arrayOfPics.indexOf($blank);
        let direction = Math.floor(Math.random() * 4);
        // let direction = 0;
        console.log(direction);
        switch (direction) {
            case UP:
                if (Math.floor(movePoint / 3) === 0) {
                    console.log('제일윗줄');
                    break;
                }
                console.log('제일윗줄아님');
                const targetUp = arrayOfPics[movePoint - 3];
                console.log(arrayOfPics.indexOf(targetUp));
                console.log($blank.style.background);
                console.log(targetUp.style.background);
                $blank.style.background = targetUp.style.background;
                targetUp.style.background = null;
                console.log('정상동작');
                console.log($blank.style.background);
                console.log(targetUp.style.background);
                temp = targetUp.id;
                targetUp.id = $blank.id;
                $blank.id = temp;
                console.log(targetUp.id);
                break;

            case LEFT:
                if (movePoint % 3 === 0) {
                    console.log('제일왼쪽');
                    break;
                }
                console.log('제일왼쪽아님');
                const targetLeft = arrayOfPics[movePoint - 1];
                $blank.style.background = targetLeft.style.background;
                targetLeft.style.background = null;

                temp = targetLeft.id;
                console.log(targetLeft.id);
                targetLeft.id = $blank.id;
                $blank.id = temp;
                break;

            case RIGHT:
                if (movePoint % 3 === 2) {
                    console.log('제일오른쪽');
                    break;
                }
                console.log('제일오른쪽아님');
                const targetRight = arrayOfPics[movePoint + 1];
                $blank.style.background = targetRight.style.background;
                targetRight.style.background = null;

                temp = targetRight.id;
                console.log(targetRight.id);
                targetRight.id = $blank.id;
                $blank.id = temp;
                break;

            case DOWN:
                if (Math.floor(movePoint / 3) === 2) {
                    console.log('제일아랫줄');
                    break;
                }
                console.log('제일아랫줄아님');
                const targetDown = arrayOfPics[movePoint + 3];
                $blank.style.background = targetDown.style.background;
                targetDown.style.background = null;

                temp = targetDown.id;
                console.log(targetDown.id);
                targetDown.id = $blank.id;
                $blank.id = temp;
                break;

        }
        shuffleCount++;
        // console.log(arrayOfPics[8].id);
        // console.log($blank.id);

    }

}


// function getImage() {
//     //이미지 준비============================================================================
//     //원본 이미지 소스 배열 4 x 4
//     //원본 복사
//     const copyOfOrigin = [...originImage];
//     //빈배열
//     const mixedImage = [];
//     const $picture = document.querySelector('.lowLevelGame');
//     //이미지 섞어서 빈배열에 저장
//     // function setImage() {
//     orderedIndex = 0;
//     while (mixedImage.length < 8) {
//         // const mixedIndex = Math.floor(Math.random() * 9);
//         // if (copyOfOrigin[mixedIndex] === null) {
//         //     continue;
//         // } else {
//         //     mixedImage.push(copyOfOrigin[mixedIndex]);
//         //     copyOfOrigin[mixedIndex] = null;
//         // }
//         //==================테스트용===========================================
//         const mixedIndex = orderedIndex;
//         if (copyOfOrigin[mixedIndex] === null) {
//             continue;
//         } else {
//             mixedImage.push(copyOfOrigin[mixedIndex]);
//             copyOfOrigin[mixedIndex] = null;
//         }
//         //==================테스트용===========================================

//         const $setImage = document.createElement('div');
//         $setImage.classList.add('mixedImage');
//         $setImage.id = `index${orderedIndex}`;
//         $setImage.style.background = `url(${mixedImage[orderedIndex]})`;
//         $picture.appendChild($setImage);

//         orderedIndex++;
//     }
//     const $setImage = document.createElement('div');
//     $setImage.classList.add('mixedImage');
//     $setImage.id = `blank`;
//     $picture.appendChild($setImage);
// }

//클릭가능 버튼 지정하기==========================================================
function setMovePoint() {
    const $puzzle = document.querySelector('.lowLevelGame').children;
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
            (i + 1) % 3 == 0) {
            continue;
        }
        if ((i - movePoint) === 1 &&
            i % 3 === 0) {
            continue;
        }
        if (Math.abs(i - movePoint) === 3 ||
            Math.abs(i - movePoint) === 1) {

            $puzzle[i].classList.add('movable');

        }
    }

}


function endOfGame() {
    const $puzzle = document.querySelector('.lowLevelGame').children;
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
    const $picture = document.querySelector('.lowLevelGame');
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
    const $picture = document.querySelector('.lowLevelGame');
    $picture.addEventListener('click', movePuzzle);
}

playPuzzleGame();