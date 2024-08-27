// 샘플 데이터 입력
const sampleBoardList = [
    {
      id: 1,
      title: "첫번째 게시글",
      content: "첫번째 게시글에 내용 입니다.",
      username: "홍길동",
      today: "2024.08.25",
      count: 5,
    },
    {
      id: 2,
      title: "두번째 게시글",
      content: "두번째 게시글에 내용 입니다.",
      username: "이몽룡",
      today: "2024.08.25",
      count: 5,
    },
    {
      id: 3,
      title: "세번째 게시글",
      content: "세번째 게시글에 내용 입니다.",
      username: "성춘향",
      today: "2024.08.25",
      count: 14,
    },
    {
      id: 4,
      title: "네번째 게시글",
      content: "네번째 게시글에 내용 입니다.",
      username: "변학도",
      today: "2024.08.25",
      count: 21,
    },
    {
      id: 5,
      title: "다번째 게시글",
      content: "다번째 게시글에 내용 입니다.",
      username: "심청",
      today: "2024.08.25",
      count: 51,
    },
  ];
//   localStorage.setItem('boardList', JSON.stringify(sampleBoardList));
  
  document.addEventListener("DOMContentLoaded", function () {
    // DOM 접근
    const boardContainer = document.querySelector(".board-content-box"); // 컨텐트를 넣을 Element 선택
    const writeButton = document.querySelector(".btn"); // 글쓰기 버튼 Element 선택
    const paginationContainer = document.querySelector(".num-box");
  
    // 로컬 스토리지에서 게시글 목록 가져오기
    const storedBoardList = JSON.parse(localStorage.getItem("boardList"));
    // 게시글 목록을 내림차수능로 정렬하기
    if (storedBoardList) {
      storedBoardList.reverse();
    }
  
    // 페이징 처리 필요한 변수
    let currentPage = 0;
    const limit = 2; // 한 페이지당 게시글 수
    loadPosts(currentPage);
  
    // 게시글을 로드 하는 함수
    function loadPosts(page) {
      const offset = page * limit;
      const end = offset + limit;
  
      let postElements = ""; // 게시긁 HTML 요소을 저장할 변수
  
      // 방어적 코드 작성
      if (storedBoardList != null && storedBoardList.length > 0) {
        // 반복문을 사용 ()
        for (let i = offset; i < end && i < storedBoardList.length; i++) {
          postElements += `<div class="board" data-id=${storedBoardList[i].id}>
                  <div class="board-1">${i + 1}</div>
                  <div class="board-2">${storedBoardList[i].title}</div>
                  <div class="board-3">${storedBoardList[i].username}</div>
                  <div class="board-4">${storedBoardList[i].today}</div>
                  <div class="board-5">${storedBoardList[i].count}</div>
                </div>`;
        }
        boardContainer.innerHTML = postElements; // 게시글 컨테이너에 HTML 추가
        createPagination(storedBoardList, page);
      } else {
        // 게시글이 없는 경우 메세지 표시
        boardContainer.innerHTML = '<div class="no-list"  style="text-align:center; margin-top:20px"> 조회된 게시글이 없습니다 </div>';
      }
    }

    // 페이지 네이션 생성 함수 선언
    function createPagination(boardList, currentPage) {
        // 전체 게시글 수, 한 페이지 당 보여질 게시글 수
        // const: 상수
        const totalPosts = boardList.length; // 전체 게시글 수
        const totalPages = Math.ceil(totalPosts / limit); // 전체 페이지 수

        // 페이지 번호 HTML을 저장할 변수
        let paginationHTML = "";
        for(let i = 0; i < totalPages; i++){
        paginationHTML += `<span class="num" data-page="${i}">${i + 1}</span>` ;
        }
        paginationContainer.innerHTML = paginationHTML;

        // 생성된 페이지 번호의 요소 접근(동적 할당)
        const pageNumbers = document.querySelectorAll('.num');

        // 현재 페이지 번호에 스타일 적용
        pageNumbers[currentPage].style.backgroundColor = 'gray';
        pageNumbers[currentPage].style.fontWeight = 600;

        pageNumbers.forEach((pageNumbers) => {
            pageNumbers.addEventListener('click', (event) => {
                // console.log('event', event);
                // console.log('event.target', event.target);
                // console.log('event.target.dataset', event.target.dataset);
                // console.log('event.target.dataset.page', event.target.dataset.page);
                // 해당하는 번호를 가지고 와서 다시 렌더링
                const targetPageNumber = parseInt(event.target.dataset.page); // 문자열 --> number로 변환
                loadPosts(targetPageNumber);
            })
        });

        // 글쓰기 버튼 눌렀을 경우 -> 글쓰기 페이지 이동 처리
        writeButton.onclick = function() {
            location.href = "board-write.html";
        }
        // 해당 row  게시글을 눌렀을 경우 -> 상세보기 화면 이동 처리

    }

  });
  