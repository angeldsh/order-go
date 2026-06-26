INSERT INTO roles (name)
VALUES ('ROLE_CLIENTE');
INSERT INTO roles (name)
VALUES ('ROLE_ADMIN');
INSERT INTO roles (name)
VALUES ('ROLE_EMPLEADO');

INSERT INTO usuarios (username, password, email)
VALUES ('angel-admin', '$2a$10$ZLLV3sFfIsgKylbPFm/Lt.PrFAVm5MYtcYV6h53EZm8uSb4D/MKPC', 'angeldshspotify@gmail.com');


INSERT INTO usuarios_roles (usuario_id, rol_id)
VALUES (1, 2);


INSERT INTO categorias (nombre)
VALUES ('Starters'),
       ('Meat'),
       ('Fish'),
       ('Desserts'),
       ('Drinks'),
       ('Bread');

-- Insert products
INSERT INTO productos (id, descripcion, imagen, nombre, precio, categoria_id)
VALUES (1, 'Delicious homemade Iberian ham croquettes', '73c1b215-d689-4ffb-9e81-c3fc44e4312b_croquetas.jpg',
        'Iberian Ham Croquettes', 8.5, 1),
       (2, 'Classic Caesar salad with grilled chicken, romaine lettuce, and creamy dressing',
        'a893a4c1-d6da-42b8-861f-fa637ebca28c_ensalada.jpg', 'Caesar Salad', 10.99, 1),
       (3, 'Selection of grilled vegetables with olive oil and fresh herbs',
        '7fb72894-1bb3-4738-be5b-309aff3ad689_parrillada.png', 'Grilled Vegetables', 9.5, 1),
       (4, 'Classic Spanish potato omelette with onion and free-range eggs',
        'c7566107-60cb-4e28-a329-e609dbee2e9f_tortilla.jpg', 'Spanish Omelette', 7.99, 1),
       (5, 'Dry-aged bone-in beef ribeye, grilled to perfection',
        'f3a91751-287e-4be7-abb2-47ad11eb9647_chuleton.jpg', 'Beef Ribeye', 24.99, 2),
       (6, 'Tender and juicy beef tenderloin, grilled',
        '01589435-06c2-4e6f-a26f-c829296e867a_solomillo.jpg', 'Beef Tenderloin', 22.99, 2),
       (7, 'Pork ribs marinated in BBQ sauce, oven-roasted',
        '9af2007e-bcb4-40f4-b4fa-5a582ddde639_costillas.jpg', 'BBQ Pork Ribs', 13.99, 2),
       (8, 'Slow-roasted suckling lamb shoulder with herbs',
        '4bbeccd0-b102-4b23-8ea6-4f3a1afd5bcc_cordero.jpg', 'Roast Lamb', 26.5, 2),
       (9, 'Hake fillet in tomato sauce, peppers, and onion',
        '11acac09-babc-474c-a045-cec4da58417f_merluza-al-vapor.jpg', 'Basque-style Hake', 15.5, 3),
       (10, 'Fresh battered and fried whiting, served with lemon',
        'be00dd9a-d6f0-42f6-af3d-bd1ae4199e48_pescadilla.jpeg', 'Fried Whiting', 11.99, 3),
       (11, 'Desalted cod loins cooked in olive oil with garlic and chili',
        '8102681f-9ca2-4aa4-8723-f20e753ccbb7_bacalao.jpeg', 'Cod Pil-Pil', 17.5, 3),
       (12, 'Cod loins cooked in tomato sauce, onion, and red pepper',
        'c0d81d94-9ccc-4522-9bb2-d024b1cb901c_bacalao_vizcaina.jpg', 'Biscayan-style Cod', 18.99, 3),
       (13, 'Delicious dark chocolate cake with white chocolate frosting',
        'e8d2c95c-3988-41d0-8027-4055e95c59f9_tarta_chocolate.jpg', 'Chocolate Cake', 6.99, 4),
       (14, 'Traditional Catalan dessert with a pastry cream base and burnt caramel',
        '2f9342c4-b426-4a0e-931d-232d1554ed24_crema_catalana.jpeg', 'Catalan Cream', 5.5, 4),
       (15, 'Artisanal vanilla ice cream with chocolate chips and caramel sauce',
        '29ef9aee-80f3-4b81-baaf-f032b25e5a3f_helado_vainilla.jpeg', 'Vanilla Ice Cream', 4.99, 4),
       (16, 'Homemade dessert of rice cooked in milk and sugar, sprinkled with cinnamon',
        '7dd220d1-c28c-4279-b18f-3eb1d21d299c_arroz_leche.jpg', 'Rice Pudding', 5.99, 4),
       (17, 'Natural mineral water in a 500 ml bottle', '82e4bfd4-cde1-4423-b8b5-1368f9a7683a_agua_mineral.jpg', 'Mineral Water', 1.5, 5),
       (18, 'Bottle of Rioja Crianza red wine, 2016 vintage', 'be3333b9-0a8c-4a07-b34b-741ad04d3c54_vino.jpg', 'Rioja Crianza Red Wine', 18.99, 5),
       (19, 'Bottle of craft IPA beer, 330 ml', '5c53a0c2-4349-4132-8457-0a2ceb90b139_cerveza.jpg', 'Craft IPA Beer', 5.99, 5),
       (20, 'Cup of freshly brewed espresso coffee, 30 ml', 'f759228d-eaf2-4c7e-8a2a-b69c1579041e_cafe.jpg', 'Espresso Coffee', 2.5, 5),
       (21, 'Freshly baked sourdough bread, served with olive oil and tomato', '02c9c6db-1cce-4726-89e8-f81592115530_pan.jpg', 'House Bread', 3.5, 6);

