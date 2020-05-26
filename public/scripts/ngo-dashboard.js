//dashboard functions
function volunteers(){
    document.getElementById('volunteers').classList.remove('hide');
    document.getElementById('activities').classList.add('hide');
    document.getElementById('basic-info').classList.add('hide');
    document.getElementById('ngo-settings').classList.add('hide');
}
function activities(){
    document.getElementById('volunteers').classList.add('hide');
    document.getElementById('activities').classList.remove('hide');
    document.getElementById('basic-info').classList.add('hide');
    document.getElementById('ngo-settings').classList.add('hide');
}
function basicInfo(){
    document.getElementById('volunteers').classList.add('hide');
    document.getElementById('activities').classList.add('hide');
    document.getElementById('basic-info').classList.remove('hide');
    document.getElementById('ngo-settings').classList.add('hide');
}
function ngoSettings(){
    document.getElementById('volunteers').classList.add('hide');
    document.getElementById('activities').classList.add('hide');
    document.getElementById('basic-info').classList.add('hide');
    document.getElementById('ngo-settings').classList.remove('hide');
}


//functions for interests card background on dashboard
function agriculture2() {
    var element = document.getElementById("agricdiv2");
    element.classList.toggle("new-interest-style");
}
function animal2() {
    var element = document.getElementById("animaldiv2");
    element.classList.toggle("new-interest-style");
}
function child2() {
    var element = document.getElementById("childdiv2");
    element.classList.toggle("new-interest-style");
}
function sports2() {
    var element = document.getElementById("sportsdiv2");
    element.classList.toggle("new-interest-style");
}
function fund2() {
    var element = document.getElementById("funddiv2");
    element.classList.toggle("new-interest-style");
}
function general2() {
    var element = document.getElementById("generaldiv2");
    element.classList.toggle("new-interest-style");
}
function social2() {
    var element = document.getElementById("socialdiv2");
    element.classList.toggle("new-interest-style");
}
function teaching2() {
    var element = document.getElementById("teachingdiv2");
    element.classList.toggle("new-interest-style");
}
function research2() {
    var element = document.getElementById("researchdiv");
    element.classList.toggle("new-interest-style");
}
function refugee2() {
    var element = document.getElementById("refugeediv2");
    element.classList.toggle("new-interest-style");
}