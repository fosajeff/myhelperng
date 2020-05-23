const ngoForm = document.getElementById('ngo-signup-part');
const volunteerForm = document.getElementById('volunteer-signup-part');
const donorForm = document.getElementById('donor-signup-part');
const ngoBtn = document.getElementById('ngo-join');
const volunteerBtn = document.getElementById('volunteer-join');
const donorBtn = document.getElementById('donor-join');
const signUpIntro = document.getElementById('signup-intro')


//Event listeners
ngoBtn.addEventListener('click', showNgoSignup);
volunteerBtn.addEventListener('click', showVolunteerSignup);
donorBtn.addEventListener('click', showDonorSignup);


//functions for event listeners
function showNgoSignup() {
    ngoForm.classList.remove('hide');
    signUpIntro.classList.add('hide');
}

function showVolunteerSignup(){
    volunteerForm.classList.remove('hide');
    signUpIntro.classList.add('hide');
}
function showDonorSignup(){
    donorForm.classList.remove('hide');
    signUpIntro.classList.add('hide');
}