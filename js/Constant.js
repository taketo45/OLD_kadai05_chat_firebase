'use strict';
// const isDebug = ture;

const login = {
    $login: $("#login"),
    to_url: "memo_app.html",
}

const memo_app ={
    $status: $("#status"),
    $uname: $("#uname"),
    $email: $("#email"),
    $prof: $("#prof"),
    $title: $("#title"),
    $text: $("#text"),
    $sendbtn: $("#send"),
    $outbtn: $("#out"),
    out_url: "login.html",
}

export { login, memo_app };