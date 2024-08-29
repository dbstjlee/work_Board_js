const signInApp = {
    userList: JSON.parse(localStorage.getItem('userList')),
    elements: {
        inputs: document.querySelectorAll('.inputs'),
        button: document.querySelector('button')
    },

    init: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        this.elements.button.addEventListener('click', this.login.bind(this));
    },

    login: function() {
        const username = this.elements.inputs[0].value.trim();
        const password = this.elements.inputs[1].value.trim();

        // 유효성 검사
        if (username === "") {
            alert('아이디를 입력하세요');
            this.elements.inputs[0].focus();
            return;
        }

        if (password === "") {
            alert('비밀번호를 입력하세요');
            this.elements.inputs[1].focus();
            return;
        }

        // 단, 한명도 회원가입 없을 경우 예외 처리
        if (!this.userList || this.userList.length === 0) {
            alert('등록된 사용자가 없습니다');
            location.href = "sign-up.html";
            return;
        }

        let userFound = false;

        for (let i = 0; i < this.userList.length; i++) {
            if (this.userList[i].username === username) {
                userFound = true;

                if (this.userList[i].password !== password) {
                    alert('잘못된 비밀번호 입니다');
                    this.elements.inputs[1].focus();
                    return;
                } else {
                    localStorage.setItem('user', JSON.stringify(this.userList[i]));
                    alert('로그인 완료');
                    location.href = "board-list.html";
                    return;
                }
            }
        }

        if (!userFound) {
            alert('해당 아이디가 존재하지 않습니다');
            this.elements.inputs[0].focus();
        }
    }
};

// 애플리케이션 초기화
signInApp.init();
