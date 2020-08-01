var UIController = (function () {

    var DOMStrings = {
        pNumber: '.phone-number',
        cNumber: '.conf-number',
        amnt: '.amount',
        payBtn: '.pay-btn'
    };

    return {
        getInput: function() {

            return {
                phoneNumber: document.querySelector(DOMStrings.pNumber).value,
                confNumber: document.querySelector(DOMStrings.cNumber).value,
                amount: document.querySelector(DOMStrings.amnt).value
            };
            
        },

        clearFields: function() {

            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.pNumber + ', ' + DOMStrings.cNumber + ',' + DOMStrings.amnt);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach (function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();

        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    }

})();

var controller = (function (UICtrl) {

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.payBtn).addEventListener('click', function() {
            proceedPay();   
            // window.location.href = "/Users/yasirujayathilaka/Documents/Projects/CSE Assignment/EasyPay/card_details.html";
        });

    };

    var proceedPay = function() {
        var phoneNum, confNum, payAmount;
        // 1. Get input values
        phoneNum = UICtrl.getInput().phoneNumber;
        confNum = UICtrl.getInput().confNumber;
        payAmount = UICtrl.getInput().amount;

        var refID = Math.floor(Math.random()*1000000000);
        var sucUrl = "http://yasirumacbook.hopto.org:81/TopUplk/success.html"
        var unSucUrl = "http://yasirumacbook.hopto.org:81/TopUplk/unsuccess.html"
      
        // 2.Confirm phone number
        if (phoneNum >= 0110000001  && confNum >= 0110000001 && payAmount >=0) {
            if (phoneNum == confNum) {
                localStorage.setItem('merchant', 'topuplk');
                localStorage.setItem('amount', payAmount);
                localStorage.setItem('refID',  refID);
                localStorage.setItem('successUrl',  sucUrl);
                localStorage.setItem('unSuccessUrl',  unSucUrl);
                UICtrl.clearFields();
                window.location.href = "http://yasirumacbook.hopto.org:81/EasyPay/index.html";
            }
    
            else {
                window.alert("Entered phone numbers mismatch! Please try again");
                UICtrl.clearFields();
            }
        }
        else {
            window.alert("Please enter valid details!");
        }

    }

    return {
        init: function() {
            console.log('Started');
            setupEventListeners();
        }
    }

})(UIController);

controller.init();