//이미지 준비============================================================================
//원본 이미지 소스 배열 4 x 4
const originImage = ['minigameProject/image/0.png', 'minigameProject/image/1.png', 'minigameProject/image/2.png', 'minigameProject/image/3.png',
    'minigameProject/image/4.png', 'minigameProject/image/5.png',
    'minigameProject/image/6.png', 'minigameProject/image/7.png',
    'minigameProject/image/8.png', 'minigameProject/image/9.png',
    'minigameProject/image/10.png', 'minigameProject/image/11.png',
    'minigameProject/image/12.png', 'minigameProject/image/13.png',
    'minigameProject/image/14.png', null
];
//원본 복사
const copyOfOrigin = [...originImage];
//빈배열
const mixedImage = [];

//이미지 섞어서 빈배열에 저장========================================================
// function setImage() {
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
// }
// mixedImage.push(null);
// console.log(mixedImage);

const $puzzle = document.querySelector('.puzzle').children;
const arrayOfPics = [...$puzzle];
//클릭가능 버튼 지정하기==========================================================
function setMovePoint() {
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
    console.log(document.querySelectorAll('.movable'));
}
// setMovePoint();
const $picture = document.querySelector('.puzzle');
//movable 움직이기============================================================================
// console.log($puzzle[15]);
$picture.onclick = e => {
    const $blank = document.querySelector('#blank');
    setMovePoint();
    if (e.target.matches('.puzzle .movable')) {
        //    e.target.style.background = 'red';
        $blank.style.background = e.target.style.background;
        e.target.style.background = null;

        let temp = e.target.id;
        e.target.id = $blank.id;
        $blank.id = temp;
        // console.log($blank);
        [...$picture.children].forEach($pic => $pic.classList.remove('movable'));
        // return;
    }

}



// setImage();
// while (true) {
//     setMovePoint();
//     $picture.onclick = e => move;
//     if (
//         originImage.forEach(pic => `url("${pic}")`) ===
//         arrayOfPics.forEach(pic => pic.style.background)
//     ) {
//         break;
//     }
// }
// console.log(`url("${originImage[14]}")`);
// console.log(arrayOfPics[13].style.background);