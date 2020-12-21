/* Слайдер */
var slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
    showSlides(slideIndex += 1);
}

function previousSlide() {
    showSlides(slideIndex -= 1);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName('slider-item');
    var paginationElements = document.getElementsByClassName('pagination-elem');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (var slide of slides) {
        slide.style.display = "none";
    }
    for (var elem of paginationElements) {
        elem.style.background = 'rgba(255, 255, 255, 0.5)';
    }
    slides[slideIndex - 1].style.display = "block"; 
    paginationElements[slideIndex - 1].style.background = '#FFF';
}

setInterval(nextSlide, 8000);

/* Цитата*/ 

$('#quote_block').click(function() {
    $('#quote_block').load('/zaes/quote_block.html');
});


var oldQuote = document.querySelector('.quote_card');
var newQuote = document.querySelector('.feature');

function imgOnKeys(func, ...codes) {
    var pressed = new Set();

    document.addEventListener('keydown', function(event) {
        pressed.add(event.key);

        for (var code of codes) {
            if (!pressed.has(code)) {
                return;
            }
        }

        func();
    });

    document.addEventListener('keyup', function(event) {
        pressed.delete(event.key);

        for (var code of codes) {
            if (!pressed.has(code)) {
                oldQuote.style.display = "block";
                newQuote.style.display = "none";
            }
        }
    });
}

imgOnKeys(function() {
    oldQuote.style.display = "none";
    newQuote.style.display = "block";
}, 'g', 'n', 'l');

/* Анимация статистики */
/*
function animateNumber(selector) {
    if ($(selector).text() !== 0) {
        $({numberValue: 0}).animate({numberValue: $(selector).text()}, {
            duration: 2000,
            easing: "linear",
            step: function(val) {
                $(selector).html(Math.ceil(val));
            }
        });
    }
};  

animateNumber(".animate1");
animateNumber(".animate2");
*/

$(window).on('load',function(){
    $('#staticBackdrop').modal('show');
});

function addEmail() {
    var inputEmail = document.getElementById('email');
    var email = inputEmail.value;
    var warningText = document.getElementById('warning-text');
    if (validateEmail(email)) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost/add_email.html',
            data: {
                email: email,
            },
            success: function() {
                $("#staticBackdrop").modal('hide');
            }
        });
    } else {
        inputEmail.style.borderColor = 'red';
        warningText.style.display = 'block';
        inputEmail.onfocus = function() {
            inputEmail.style.borderColor = '#ced4da';
            warningText.style.display = 'none';
        }
    }
}

function lostFocus() {
    var inputEmail = document.getElementById('email');
    var warningText = document.getElementById('warning-text');
    inputEmail.style.borderColor = '#ced4da';
    warningText.style.display = 'none';
}

function validateEmail(email) {
    var regexp = /\S+@\S+\.\S+/;
    return regexp.test(email);
}