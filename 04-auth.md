хэширование паролей
токен-идентификатор

хэширование-необратимо(алгоритм хэширования)
шифрование-обратимо(ключ+алгоритм шифрования)

хэширование-асинохрон процесс

---

эндпоинт-роут
router.post("/signup",..)
router.get("/", getContactsController);

---

аутентификация-залогинься-мы не знаем кто ты есть, представься. узнать кто и что из себя представляет пользователь, подтвердить, что вы есть вы, а не кто-то другой.
авторизация-мы знаем кто ты есть, но давай проверим есть ли у тебя права. определяет какие права на какие операция у вас есть в сервисе. когда валидируются ваши права.

---

передавать креденшиалы в http протоколе
креденшиал-идетификатор, который дает вам доступ в сервис
signature-подпись

---

соль-набор случайных данных, котор добавляются к паролю, что бы его сложнее было взломать

---

пэйлоад-закодированнная инфа о пользователе
логаут-удаление токена
мидлвар-промежуточный обработчик

---

1.Считать заголовок Authrization из запроса.
2.Разделить заголовок на 2 слова.
3.Проверить, равно ли первое слово "Bearer":
-если не равно-отправить 401ю ошибку;
-если равно-шаг 4.
4.Проверить токен на валидность с помощью SECRET_KEY и jwt.sign:
-если токен не валиден-отправить 401ю ошибку;
-если токен валиден-шaг 5.
5.Найти в коллекции users пользователя с таким токеном:
-если его нет-отправить 401ю ошибку;
-если есть-шаг 6.
6.Прикрепить к объекту запроса (req) найденного пользователя:
req.user=user;
7.Вызвать next().

---

параметр запроса хранится в req.query
через : - это параметр маршрута
