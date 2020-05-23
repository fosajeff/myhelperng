//dashboard functions
function profile(){
    document.getElementById('profile').classList.remove('hide');
    document.getElementById('opportunities').classList.add('hide');
    document.getElementById('preference').classList.add('hide');
    document.getElementById('about-you').classList.add('hide');
    document.getElementById('settings').classList.add('hide');
}
function opportunities(){
    document.getElementById('profile').classList.add('hide');
    document.getElementById('opportunities').classList.remove('hide');
    document.getElementById('preference').classList.add('hide');
    document.getElementById('about-you').classList.add('hide');
    document.getElementById('settings').classList.add('hide');
}
function preference(){
    document.getElementById('profile').classList.add('hide');
    document.getElementById('opportunities').classList.add('hide');
    document.getElementById('preference').classList.remove('hide');
    document.getElementById('about-you').classList.add('hide');
    document.getElementById('settings').classList.add('hide');
}
function aboutYou(){
    document.getElementById('profile').classList.add('hide');
    document.getElementById('opportunities').classList.add('hide');
    document.getElementById('preference').classList.add('hide');
    document.getElementById('about-you').classList.remove('hide');
    document.getElementById('settings').classList.add('hide');
}
function settings(){
    document.getElementById('profile').classList.add('hide');
    document.getElementById('opportunities').classList.add('hide');
    document.getElementById('preference').classList.add('hide');
    document.getElementById('about-you').classList.add('hide');
    document.getElementById('settings').classList.remove('hide');
}


//functions for interests card background on dashboard
function agriculture() {
    var element = document.getElementById("agricdiv");
    element.classList.toggle("new-interest-style");
}
function animal() {
    var element = document.getElementById("animaldiv");
    element.classList.toggle("new-interest-style");
}
function child() {
    var element = document.getElementById("childdiv");
    element.classList.toggle("new-interest-style");
}
function sports() {
    var element = document.getElementById("sportsdiv");
    element.classList.toggle("new-interest-style");
}
function fund() {
    var element = document.getElementById("funddiv");
    element.classList.toggle("new-interest-style");
}
function general() {
    var element = document.getElementById("generaldiv");
    element.classList.toggle("new-interest-style");
}
function social() {
    var element = document.getElementById("socialdiv");
    element.classList.toggle("new-interest-style");
}
function teaching() {
    var element = document.getElementById("teachingdiv");
    element.classList.toggle("new-interest-style");
}
function research() {
    var element = document.getElementById("researchdiv");
    element.classList.toggle("new-interest-style");
}
function refugee() {
    var element = document.getElementById("refugeediv");
    element.classList.toggle("new-interest-style");
}