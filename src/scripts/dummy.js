export const settings = new Map([
    ["active-hours", {
        startUTC: 3,
        endUTC: 18
    }],
    ["delivery-charges", {
        val: 200
    }],
    ["max-deals", {
        val: 6
    }],
    ["max-reviews", {
        val: 6
    }]
])

export const deals = new Map([
    ["5SkfwIMo94ukaY6ppasn", {
        id: 0,
        title: 'Today\'s Special',
        price: 1200,
        discount: 10,
        content: ["Fajita Pizza ", "20 Hotwings ", "1 Litre Drink "],
        deal: {
            pizza: 1,
            hotwings: 1,
            drink: 1
        }
    }],
    ["5SkfwIMo94ukaY6ppaso", {
        id: 1,
        title: 'Regular Deal 1',
        price: 999,
        discount: 20,
        content: ["Medium Pizzas (2)", "10 Hotwings ", "Soda cans (2)"],
        deal: {
            mpizza: 2,
            hotwings: 1,
            sdrink: 2
        }
    }],
    ["5SkfwIMo94ukaY6ppasp", {
        id: 2,
        title: 'Regular Deal 2',
        price: 1500,
        discount: 15,
        content: ["Large Pizza ", "Small Piza ", "10 Chicken Nuggets (2)", "1 litre drink "],
        deal: {
            pizza: 1,
            spizza: 1,
            nuggets: 2,
            drink: 1
        }
    }],
    ["5SkfwIMo94ukaY6ppasq", {
        id: 3,
        title: 'Regular Deal 3',
        price: 1850,
        discount: 5,
        content: ["Large Pizzas (2)", "1.5 litre drink ", "Chinese Pasta "],
        deal: {
            pizza: 2,
            drink: 1,
            pasta: 1
        }
    }],
    ["5SkfwIMo94ukaY6ppasr", {
        id: 4,
        title: 'Banger Deal 1',
        price: 3300,
        discount: 9,
        content: ["Large Pizzas (2)", "Zinger Burgers (2)", "20 Chicken Hotwings ", "1.5 litre drinks (2)"],
        deal: {
            pizza: 2,
            zinger: 2,
            hotwings: 1,
            drink: 2
        }
    }],
    ["5SkfwIMo94ukaY6ppass", {
        id: 5,
        title: 'Banger Deal 2',
        price: 5300,
        discount: 18,
        content: ["Large Pizzas (3)", "20 Chicken Nuggets ", "1.5 litre drinks (3)", "Zinger Burgers (5)", "Family Fries (2)"],
        deal: {
            pizzas: 3,
            nuggets: 1,
            drink: 3,
            zinger: 5,
            fries: 2
        }
    }],
    ["5SkfwIMo94ukaY6ppast", {
        id: 6,
        title: 'Banger Deal 3',
        price: 4300,
        discount: 20,
        content: ["Large Pizzas (3)", "Small Pizza ","20 Chicken Nuggets ", "Soda cans (2)", "Family Fries "],
        deal: {
            pizza: 3,
            spizza: 1,
            nuggets: 20,
            sdrink: 2,
            fries: 1
        }
    }],
    ["5SkfwIMo94ukaY6ppasu", {
        id: 7,
        title: 'Special Deal 1',
        price: 1600,
        discount: 13,
        content: ["Medium Pizzas (2)", "Fruit Dessert (2)", "1 litre drink ", "Family Fries (2)"],
        deal: {
            mpizza: 2,
            dessert: 2,
            drink: 1,
            fries: 2
        }
    }],
    ["5SkfwIMo94ukaY6ppasv", {
        id: 8,
        title: 'Special Deal 2',
        price: 720,
        discount: 12,
        content: ["Small Pizzas (2)", "Zinger Burger (2)", "1 litre drink "],
        deal: {
            spizza: 2,
            zinger: 2,
            drink: 1
        }
    }],
])

export const reviews = new Map([
    ["0RnB3NnbiqGYc6jEz24a",{
        title: 'Adam Janjua',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 23 2022',
        email: 'alijinjua@gmail.com',
        latest: -164804712,
        oldest: 164804712
    }],
    ["0RnB3NnbiqGYc6jEz24b",{
        title: 'George Bush Jr',
        stars: 3,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 23 2022',
        email: 'usstatedept@hotmail.com',
        latest: -164804715,
        oldest: 164804715
    }],
    ["0RnB3NnbiqGYc6jEz24c",{
        title: 'Crystal Anne',
        stars: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'May 07 2022',
        email: 'jellymello848@gmail.com',
        latest: -165192387,
        oldest: 165192387
    }],
    ["0RnB3NnbiqGYc6jEz24d",{
        title: 'Qween Hun',
        stars: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 24 2022',
        email: 'supremeleader@hunsvil.le',
        latest: -164813943,
        oldest: 164813943
    }],
    ["0RnB3NnbiqGYc6jEz24e",{
        title: 'Mustafa Goku',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 24 2022',
        email: 'goku12334@gmail.com',
        latest: -164813936,
        oldest: 164813936
    }],
    ["0RnB3NnbiqGYc6jEz24f",{
        title: 'Majeed Don',
        stars: 3,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 23 2022',
        email: 'fluffpgc@outlook.com',
        latest: -164804705,
        oldest: 164804705
    }],
    ["0RnB3NnbiqGYc6jEz24g",{
        title: 'Miss Jane',
        stars: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 23 2022',
        email: 'missjanelle@gmail.com',
        latest: -164804702,
        oldest: 164804702
    }],
    ["0RnB3NnbiqGYc6jEz24h",{
        title: 'Raja Abdullah Zafar',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 23 2022',
        email: 'raja.zafar229@gmail.com',
        latest: -164804700,
        oldest: 164804700
    }],
    ["0RnB3NnbiqGYc6jEz24i",{
        title: 'Motayyab Jabbar',
        stars: 4,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        date: 'Mar 24 2022',
        email: 'motayyabjabbar123@yahoo.com',
        latest: -164814119,
        oldest: 164814119
    }]
])