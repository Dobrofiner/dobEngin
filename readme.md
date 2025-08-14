## dobEngin
Движок, созданный за день до дня рождения, который весит всего 4.54 кб <br>
Лицензия: [MIT](LICENSE)

## Api, и т.д..

1. const objectName = new dobEngin; <br>
Создание объекта движка. <br>
2. .start()  <br>
Инитиализация canvas и drw объекта. <br>
3. .placeAssetsImgs() <br>
Берет пути к ассетам из массива assets и создает img объекты и пихает их в объект assetsForUse <br>
4. .fps <br>
Значение которое содержит фпс счетчик....с приколами <br>
5. .startGameLoop() <br>
Запуск gameLoop'а. без этого рисовка графики работать не будет <br>
6. .gameLoop() <br>
Можно переопределять. здесь ваш собственный код для игрового цикла
7. .width, .height <br>
Содержат ширину и высоту canvas'а....можно менять <br>
8. .objects - массив хранящий все инстансы объектов <br>
9. .objectTypes - объект,хранящий созданные типы объектов <br>
10. .createObjectType(type,name,...properties) <br>
где type - тип объекта(sprite/text),name- конечно имя объекта <br>
...properties содержит параметры  в порядке - name,x,y, и spriteImage если это спрайт и text если это text объект <br>
11. .spawnObject(type,...properties) <br>
создает объект,с типом из type(из objectTypes),с свойствами(name,x,y,[[text||spriteImage]]) <br>
12. downloadString(string,mime,name) => string <br>
возврашает строку вида data:text/plain,string а также скачивает её с установленным именем файла(и расширинием и mime). работает даже в file:// <br>
13. .dUid() => number <br>
повышает .nextDuid на 1 и возврашает это. Система уникальных UID порядкового типа этого движка. dUid расшифровывается как Dobrofiner UID system <br>
14. .drw - используется для рисования графики на канвасе движка. <br>
15. Класс sprite(properties,engine) <br>
класс спрайта. основной класс для создания объектов. содержит: <br>
.dUid - всегда 0,если тип объекта не был создан как объект... <br>
.props содержит <br>
{ <br>
name  - имя объекта <br>
x - координата x на сетке <br>
y - координата y на сетке <br>
spriteImage - содержит ссылку на спрайт объекта <br>
} <br>
.type - всегда "sprite" <br>
.getSprite(spr) => string (assetsForUse[spr]) || Object  <br>
Возвращает либо объект с спрайтом либо spr подставленный в объект храняший загруженные спрайты <br>
.setProps(..props) <br>
 устанавливает свойства,но обновляет только те значения порядкорве которых не равны undefined/null и т.д <br>
16. Класс text <br>
класс текста. основной класс для создания объектов. содержит: <br>
.dUid - тоже самое что и с sprite <br>
.props содержит <br>
{ <br>
name  - имя объекта <br>
x - координата x на сетке <br>
y - координата y на сетке <br>
text - текст который он будет отображать <br>
} <br>
.type - всегда "text" <br>
.setProps(..props) <br>
 тоже самое что и с sprite <br>

## Пример кода
 <br>
Посмотреть можно в файле [game.js](game.js) <br>

