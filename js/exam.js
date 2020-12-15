window.onload = () => {
  const exam = new Exam();
};

class Exam {
  constructor() {
    console.log("hamf khoi tao");
   
    this.loadData();


    this.initEvent();
    }
  /**
   * Hàm khởi tạo sự kiện cho trang làm bài thi
   */
  initEvent = () => {
    this.countdown(examData.TimeLimited);
    //TODO: set sự kiện cho answer
    document.querySelectorAll('.exam-item .answer-item input').forEach( (item) => {
      item.addEventListener("click", this.answerOnClick);
    })

    document.getElementById('submit-exam').addEventListener("click",this.submitExamOnclick);
  };

  loadData = () => {
    
    
    //lấy dữ liệu cần load  
    var Name = examData.NameExam;
    var question = examData.question;
    //vị trí cần load 
    const examName = document.getElementById('exam-name');
    const task = document.getElementById('task');
    const questionBox = document.getElementById('question-box');
    //load data
    examName.innerHTML = Name; // Tên của bài thi
    var listQuestion = document.createElement('ul');
    listQuestion.className = "answer row"
    //load câu hỏi
    question.forEach((questionItem, index) => {
      // tạo element
      var examItem = document.createElement('div');
      var examAnswer = document.createElement('ul');
      var numQuestion = document.createElement('li')
      //set class
      examItem.className = "exam-item";
      examAnswer.className ="exam-answer row";
      numQuestion.className = "answer-item ";

      numQuestion.innerHTML = index + 1;
      questionBox.appendChild(numQuestion);
      numQuestion.dataset.id=questionItem.id;
      examItem.dataset.id = questionItem.id; // gán id của câu hỏi 

      examItem.innerHTML = `
      <div class="exam-question">
        <div class="question-number">${index+1}.</div>
        <p class="question">
        ${questionItem.content}
        </p>
      </div>`
      questionItem.answer.forEach((answerItem, index2) => {
        var answerIndex = String.fromCharCode(65+index2);
        var answerElement = document.createElement('li');
        answerElement.className = "answer-item col l-6 m-12 c-12"
        answerElement.dataset.id = answerItem.id;
        answerElement.innerHTML = `<input id="${answerItem.id}" name="${questionItem.id}" type="radio"><label for="${answerItem.id}">${answerIndex}. ${answerItem.content}</label>`;
        examAnswer.appendChild(answerElement);
      })
      examItem.appendChild(examAnswer);
      
      task.appendChild(examItem);
    })
  }


  /**
   * set countdown cho trang làm bài thi
   * @param {int} time số phút làm bài
   */
  countdown = (time) => {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
    var distance = time * minute;
    var self = this.submitExamOnclick;
    var x = setInterval(function () {
      let h = Math.floor((distance % day) / hour),
        m = Math.floor((distance % hour) / minute),
        s = Math.floor((distance % minute) / second);
      document.getElementById("hours").innerText =
        h >= 10 ? h : "0" + h.toString();
      document.getElementById("minutes").innerText =
        m >= 10 ? m : "0" + m.toString();
      document.getElementById("seconds").innerText =
        s >= 10 ? s : "0" + s.toString();
      distance = distance - 1000;
      //sự kiện khi hết thời gian làm bài
      if (distance < 0) {
        clearInterval(x);

        self();
        console.log("Exam time out!");
      }
    }, 1000);
  };

  answerOnClick (){
    //lấy id câu hỏi và đáp án đã chọn 
    var questionId = this.getAttribute('name');
    var answerId = this.getAttribute('id');
    var stringQuery = `.result-box .answer-item[data-id="${questionId}"]`;

    var questionBox = document.querySelector(stringQuery);

    questionBox.classList.add('answer-item-active');
    questionBox.dataset.answerId = answerId;
  } 

  submitExamOnclick(){
    var questionResult = Array.from(document.querySelectorAll('.result-box .answer-item'));
    var results = questionResult.map((question) => {
      var result = {
        questionId: "",
        answerId : ""
      };
      result.questionId = question.dataset.id;
      
      result.answerId = question.dataset.answerId;

      return result;
    })
    //TODO: thông báo nếu nhận thấy có câu chưa làm 
    console.log(results);
  }

}



var examData = {
    id: '1',
    TimeLimited: 0.1,
    NameExam: "ĐỀ THI KẾT THÚC HỌC PHẦN Giải Tích I",
    question: [
      {
        id: '1',
        content: 'Đặc điểm cơ bản của chủ nghĩa Mác giai đoạn 1842 - 1844 là gì?',
        answer: [
          {
            id: '1',
            content: 'Kế tục triết học Hê-ghenB. Phê phán các thành tựu triết học của nhân loại.'
          },
          {
            id: '2',
            content: 'Sự chuyển biến về tư tưởng từ chủ nghĩa duy tâm và dân chủ cách mạng sang chủ nghĩa duy vật và Cộng sản chủ nghĩa.'
          },
          {
            id: '3',
            content: 'Phê phán tôn giáo.'
          },
          {
            id: '4',
            content: 'Tiếp tục hoàn thành các tác phẩm triết học nhằm phê phán tôn giáoB. Hình thành những nguyên lý triết học duy vật biện chứng, duy vật lịch sử và chủ nghĩa xã hội khoa học.C. Nghiên cứu về vai trò của hoạt động thực tiễn đối với nhận thức.D. Hoàn thành bộ “Tư Bản”.'
          }
        ]
      },
      {
        id: '2',
        content: 'Đây là một câu hỏi hay.',
        answer: [
          {
            id: '5',
            content: 'Đây có phải là đáp án đúng không.'
          },
          {
            id: '6',
            content: 'Đây có phải là đáp án đúng không.'
          },
          {
            id: '7',
            content: 'Đây có phải là đáp án đúng không.'
          },
          {
            id: '8',
            content: 'Đây có phải là đáp án đúng không.'
          }
        ]
      },
      {
        id: '3',
        content: 'Đây là một câu hỏi hay.',
        answer: [
          {
            id: '9',
            content: 'Đây có phải là đáp án đúng không.'
          },
          {
            id: '10',
            content: 'Đây có phải là đáp án đúng không.'
          },
          {
            id: '11',
            content: 'Đây có phải là đáp án đúng không.'
          },
          {
            id: '12',
            content: 'Đây có phải là đáp án đúng không.'
          }
        ]
      }
    ]
}
