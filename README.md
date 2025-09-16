## Сайт для индивидуального кондитера и его пекарни

Автор: Кравченкова Елизавета 

Ссылка: https://bakery-web-ftzw.onrender.com


## Структура базы данных

<div align="center">
  <img src="./er-diagram.png" alt="Схема отношений" height="400">
</div>

1.User (Пользователь)

Описание: Учетные записи пользователей системы
Атрибуты:

id : Уникальный идентификатор
email : Email (уникальный, для входа)
password : пароль
name :  имя
role : Роль (customer, admin)

orders : One-to-Many → Order (история заказов)

Бизнес-правила:
Email должен быть уникальным

2.Cake (Торт)

Описание: Торты как основной продукт
Атрибуты:

id : Уникальный идентификатор
name : Название (например, "Красный бархат")
description : Описание состава и декора
price : Базовая цена за 1 кг
isAvailable: Доступность

orderItems : One-to-Many → OrderItem

3. Pastry (Пирожное)

Описание: Штучные кондитерские изделия
Атрибуты:

id : Уникальный идентификатор
name : Название (например, "Эклер")
pricePerPiece : Цена за 1 шт.
minOrderQuantity : Минимальное количество (например, 6)
isAvailable: Доступность

orderItems : One-to-Many → OrderItem

4. OrderItem (Позиция заказа)

Описание: Элемент в составе заказа
Атрибуты:

id : Уникальный идентификатор
quantity : Количество элемента
itemPrice : Цена заказа

Отношения:
order : Many-to-One → Order
cake : Many-to-One → Cake
pastry : Many-to-One → Pastry

Бизнес-правила:
Обязательна ссылка либо на Cake, либо на Pastry

5. Order (Заказ)

Описание: Заказ клиента
Атрибуты:

id : Уникальный идентификатор
status : Статус (new, baking, delivering, completed)
totalPrice : Итоговая сумма


Отношения:
customer : Many-to-One → User
items : One-to-Many → OrderItem

6. Enum OrderStatus 
   NEW - только создан
   IN_PROGRESS - в процессе
   COMPLETED -готов
   CANCELED - отменен

7. Enum Role 
   CUSTOMER - покупатель
   ADMIN - aдмин
