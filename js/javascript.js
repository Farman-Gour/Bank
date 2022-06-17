"use strict"
let ifscCode = document.querySelector(".ifsc");
let bankName = document.querySelector(".bank");
let branchName = document.querySelector(".branch");
let bankCode = document.querySelector(".bankcode");
let bankAddress = document.querySelector(".address");
let district = document.querySelector(".district");
let center = document.querySelector(".center");
let state = document.querySelector(".state");
let invalid = document.querySelector(".invalid");

document.querySelector(".sub").addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(".sub").style.display = "none";
    document.querySelector(".res").style.display = "none";
    document.querySelector(".loader").style.display = "inline";
    ifscCode.innerHTML = "";
    bankName.innerHTML = "";
    branchName.innerHTML = "";
    bankCode.innerHTML = "";
    bankAddress.innerHTML = "";
    district.innerHTML = "";
    center.innerHTML = "";
    state.innerHTML = "";
    let val = document.querySelector(".code").value;
    let xhr = new XMLHttpRequest();
    xhr.open("get", "https://ifsc.razorpay.com/" + val, true);
    xhr.send();

    xhr.onreadystatechange = function () {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".sub").style.display = "inline";
        document.querySelector(".res").style.display = "inline";

        if (this.readyState == 0) {
            console.log("data sending");
        }
        else if (this.readyState == 1) {
            console.log("data send");
        }
        else if (this.readyState == 2) {
            console.log("data processing");
        }
        else if (this.readyState == 3) {
            console.log("data receiving");
        }
        else if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.response));
            let data = JSON.parse(this.response)
            invalid.innerHTML = "";
            ifscCode.innerHTML = data.IFSC;                             /* ifsc code */
            bankName.innerHTML = data.BANK.toUpperCase();               /* bank name */
            branchName.innerHTML = data.BRANCH;                         /* branch name */
            bankCode.innerHTML = data.BANKCODE;                         /* bank code */
            bankAddress.innerHTML = data.ADDRESS;                       /* bank address */
            district.innerHTML = data.DISTRICT;                         /* district name*/
            center.innerHTML = data.CENTRE;                             /* center name*/
            state.innerHTML = data.STATE;                               /* state name*/
        }
        else {
            console.log("not found");
            if (val == "") {
                document.querySelector(".code").focus();
                document.querySelector(".invalid").innerHTML = "Please Enter IFSC Code";
            }
            else {
                document.querySelector(".code").focus();
                invalid.innerHTML = "Please Enter Valid IFSC Code";
            }
        }
    }
})

$(document).ready(function () {

    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $(".gotop").fadeIn("slow");
        }
        else {
            $(".gotop").fadeOut("slow");
        }
    })

    $(".gotop").click(function () {
        $("body,html").animate({
            "scrollTop": "0"
        }, "slow")
    })


})
