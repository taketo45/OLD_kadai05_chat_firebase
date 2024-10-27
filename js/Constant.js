'use strict';
// const isDebug = ture;

const login = {
    $login: $("#login"),
    to_url: "memo_app.html",
}

const memo_app = {
    $status: $("#status"),
    $uname: $("#uname"),
    $email: $("#email"),
    $prof: $("#prof"),
    $title: $("#title"),
    $text: $("#text"),
    $sendbtn: $("#send"),
    $outbtn: $("#out"),
    $photobtn: $("#photo"),
    out_url: "login.html",
    photo_url: "photo_app.html",
}

const photo_app = {
    $input: $("#input"),
    $form: $("#form"),
}

export { login, memo_app, photo_app };