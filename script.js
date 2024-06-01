const form = document.querySelector(".form");
const nameUser = document.querySelector('#name');
const secondName = document.querySelector('#secondName');
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const checkbox = document.querySelector('#agree');
const buttonSubmit = document.querySelector('#button')
const clearReset = document.querySelector('#clear')

//если событие submit, то обязательно должно быть event.preventDefault(), иначе это будет действие по умолчанию и это перезагрузка страницы (могут спросить на собеседовании)
form.addEventListener("submit", (event) => {
    if (buttonSubmit) {
        // Предотвращает действие браузера по умолчанию. В данном случае — отправку формы
        // https://learn.javascript.ru/default-browser-action
        event.preventDefault();

        // Здесь твой код
        //почему выборка у тебя в коде внутри клик?
        //если клик будет привязан не к form, а к nameUser, то анкета не отправиться, тк клик не привязан к остальным выборкам?

        const message = document.createElement('div');
        //message.classList.add('')
        fetch(`https://polinashneider.space/user`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    //Content-Type: "Application.JSON" означает, что мы обмениваемся с сервером данными в формате JSON.
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer: AliokhnaKate',
                },
                //используем JSON.stringify для того, чтобы трансформировать объект в строку и аккуратно передать его по сети.
                body: JSON.stringify({
                    "name": nameUser.value,
                    "secondName": secondName.value,
                    "phone": phone.value,
                    "email": email.value,
                    "agree": checkbox.checked
                }),
            })
            //необязательно в обоих then может быть разная переменная, может быть и одинаковая. используем метод json, чтобы привести в одинаковый формат
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                if (data.message) {
                    message.textContent = 'Ваши данные успешно добавились!';
                    // message.classList.add('form');
                    // form.prepend(message);
                    // form.reset();
                    messageText(message);
                }
            })
            .catch((error) => {
                if (error.message) {
                    message.textContent = 'Произошла ошибка, попробуйте еще раз!';
                    //message.classList.add('message');
                    //form.prepend(message);
                    //form.reset();
                    messageText(message);
                }
            })
    } else {
        message.textContent = '';
    }
})

function messageText(text) {
    text.classList.add('message');
    form.prepend(text);
    form.reset();
}