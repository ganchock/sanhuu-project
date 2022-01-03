// Дэлгэцтэй ажиллах контроллер
var uiController = (function() {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"

    }
    var x = 1245;
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
})();

// Санхүүтэй ажиллах контроллер
var financeController = (function() {
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };
    return {
        addItems: function(type, desc, val) {
            var items, id;
            if (data.items[type].length === 0) id = 1;
            else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }
            if (type === 'inc') {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);
        },
        seeData: function() {
            return data;
        }
    }


})();

// Програмын холбогч контроллер
var appController = (function(uiController, fnController) {
    var ctrlAddItem = function() {
        // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
        var input = uiController.getInput();
        console.log(input)
            // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд холбоно.
        financeController.addItems(input.type, input.description, input.value);
        // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
        // 4. Төсвийн тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    };

    var setUpEventListeners = function() {
        var DOM = uiController.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener("click", function() {
            ctrlAddItem();
        });

        document.addEventListener("keypress", function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };
    return {
        init: function() {
            console.log('Application started ...');
            setUpEventListeners();
        }
    }
})(uiController, financeController);

appController.init();