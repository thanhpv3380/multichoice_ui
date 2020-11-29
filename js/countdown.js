/**
 * set countdown cho trang làm bài thi
 * @param {int} time số phút làm bài
 */
var countdown = (time) => {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    var distance = time * minute;

    var x = setInterval(function() {
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
            console.log("Exam time out!");
        }
    }, 1000);
};
countdown(30);