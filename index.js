// ------ Добавление полей в форму (количество человек)
let aboutDiv = document.querySelector('.form-about'),
    aboutDivContainer = document.querySelector('.form-about-container');

function clear(elem) {
    elem.innerHTML = '';
}

function change() {
    clear(aboutDivContainer);
    let input = document.getElementById('quantity').value; // количество людей
    
    for(let i = 0; i < input; i++) {
        let aboutDivClone = aboutDiv.cloneNode(true);
        aboutDivContainer.appendChild(aboutDivClone);
        aboutDivClone.childNodes[1].childNodes[3].setAttribute('name', `FIO${i}`);
        aboutDivClone.childNodes[3].childNodes[3].setAttribute('name', `jobTitle${i}`);
        aboutDivClone.childNodes[5].childNodes[3].setAttribute('name', `department${i}`);
        aboutDivClone.childNodes[7].childNodes[3].setAttribute('name', `Email${i}`);
        aboutDivClone.childNodes[9].childNodes[3].setAttribute('name', `phone${i}`);
        aboutDivClone.childNodes[9].childNodes[3].setAttribute('id', `phone`);
    }

    $(function($){
        $('[id=phone]').mask("+7(999) 999-99-99");
    });
}

// ------ Отправка формы
$(document).ready(function() {
	$('#form').on('submit', function(e) {
        e.preventDefault();
        // ----- Валидация
        // if (document.form.start.value == '' || document.form.end.value == '' 
        // || document.form.quantity.value == '' || document.form.FIO.value == '' 
        // || document.form.jobTitle.value == '' || document.form.department.value == ''
        // || document.form.Email.value == '') {
		// 	alert('Заполните все поля');
        //     valid = false;
		// 	return valid;
		// }
		$.ajax({
            method: "POST",
            url: "form.php",
            data: $(this).serialize(),
            success: function(data) {
                if (data) {
                    console.log(data);
                } else {
                    alert(`Данные отправлены`);
                    $(this).find('input').val('');
                    $('#form').trigger('reset');
                    clear(aboutDivContainer);
                    let aboutDivClone = aboutDiv.cloneNode(true);
                    aboutDivContainer.appendChild(aboutDivClone);
                }
            }, error: function() {
                alert(`Ошибка отправки`);
            }
		});
        return false;
	});
});

// ------ Маска для телефона
$(function($){
	$('[id=phone]').mask("+7(999) 999-99-99");
});


// ------ Левое большое меню (скрыть, показать)
let btn = document.querySelectorAll('.main-left__popup'),
    dropMenu = document.querySelectorAll('.main-left__ul'),
    arrow = document.querySelectorAll('.left__popup-arrow-img');

btn.forEach(element => {
    element.addEventListener('click', element => {
        const menu = element.currentTarget.dataset.path;
        arrow.forEach(element => {
            if (element.dataset.path == menu && element.classList.contains('left__popup-arrow-img')) {
                element.classList.remove('left__popup-arrow-img');
                element.classList.add('left__popup-arrow-img-active');
            } else if (element.dataset.path == menu && element.classList.contains('left__popup-arrow-img-active')) {
                element.classList.remove('left__popup-arrow-img-active');
                element.classList.add('left__popup-arrow-img');
            }
        });
        dropMenu.forEach(element => {
            if (element.dataset.path == menu && element.classList.contains('main-left__ul')) {
                element.classList.remove('main-left__ul');
                element.classList.add('main-left__ul-active');
            } else if (element.dataset.path == menu && element.classList.contains('main-left__ul-active')) {
                element.classList.remove('main-left__ul-active');
                element.classList.add('main-left__ul');
            }
        });
    });
});