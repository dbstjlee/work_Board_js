// 로그인 상태 여부
redirectToPageIfNotLoggedIn('sign-in');

document.addEventListener('DOMContentLoaded', function () {

    // 사용할 요소에 접근
const title = document.querySelector('.title');
const username = document.querySelector('.username');
const fileInput = document.querySelector('.file');
const imgViewBox = document.querySelector('.img-box');
const button = document.querySelector('.btn');
const today = new Date();

// 사용자 선택한 이미지를 저장할 공간 필요
let imageData = null;

// 사용자 정보 가져오기
 const getUser = JSON.parse(localStorage.getItem('user'));
 username.value = getUser.username;

 // 파일 미리보기 기능 만들기
 function fileUpload(event) {
        
    const file = event.target.files[0];
    //console.log('file', file);
    // 파일 크기 유효성 검사 
    // 1024 * 1024  * 5 =  (5MB) 이하만 허용 
    if(file.size >= 5242880) { 
        alert('첨부 파일은 5MB 이하만 가능 합니다');
        event.target.value = "";
        return; 
    }
    // 파일 타입 유효성 검사 
    const validFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if(!validFileTypes.includes(file.type))   {
        alert('유효한 파일 타입이 아닙니다.(jpeg, png, gif만 허용');
        return; 
    } 

    // 파일 미리보기 기능 
    const reader = new FileReader();
    reader.readAsDataURL(file); // Base64 인코딩 바이트 단위 데이터를 -- 64개 문자로 표현하는 인코딩 방식
    reader.onload = function (e) {
        console.log('Base64', e.target.result);
        imgViewBox.innerHTML = `<img src="${e.target.result}" alt="Upload Image">`;
        // 글 저장시에 로컬스토리지에 바이너리 데이터를 -- 64 인코딩 저장 
        imageData = reader.result;
    }
}


  // 글 저장하는 기능 만들기 
  function saveBoard() {
    // 유효성 검사 
    if(title.value === "") {
        alert('제목을 입력하시오');
        return;
    }
    
    if(content.value === "") {
        alert('내용을 입력하시오');
        return;
    }

    // 로컬 스토리지에 게시글 전체 목록 가져오기 
    let boardList = JSON.parse(localStorage.getItem('boardList') || [] );

    // 고유 ID 생성 
    const newId = generateUniqueId(boardList);

    // 객체 리터럴 표기법 사용 
    const board = {
        id: newId, 
        title : title.value,
        content : content.value, 
        username: username.value, 
        today:  `${day.getFullYear()}.${day.getMonth() + 1}.${day.getDate()}`,
        count: 0, 
        imgData: imageData
    };
    
    // 배열에다가 생성한 객체 추가 
    boardList.push(board);

    // 로컬 스토리지에 저장 (배열 전체)
    localStorage.setItem("boardList", JSON.stringify(boardList));
    // 페이지 이동 처리 
    location.href = 'board-list.html';
}

// 고유 아이디 생성 함수 
function generateUniqueId(boardList) {
    return boardList.length > 0  ? boardList[boardList.length - 1].id + 1 :  1 ;
}

// 이벤트 리스너 등록 처리 - file change 
fileInput.addEventListener('change', fileUpload);
button.addEventListener('click', saveBoard);
});

button.onclick = function() {
    location.href = "board-list.html";
}
