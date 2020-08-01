var requestHandler = (function () {

    return {
        getData: function() {
            if(!localStorage.getItem('refID')) {
                window.alert("Error occured!, will redirect to merchant");
                window.location.href = "http://yasirumacbook.hopto.org:81/TopUplk";
            }
            else {
                return {
                    merchant: localStorage.getItem('merchant'),
                    refID: localStorage.getItem('refID'),
                    amount: localStorage.getItem('amount'),
                    sucUrl: localStorage.getItem('successUrl'),
                    unSucUrl: localStorage.getItem('unSuccessUrl')
                };
            }

        },

        postRequest: function(cardName, cardNumber, expMonth, expYear, cvv, amount, authKey, refID, merchant) {
            var response, status;

            var sucPop = document.querySelector('.success-pop');
            var unsucPop = document.querySelector('.unsuccess-pop');

            var data = this.getData();
            var request = "cNumber=" + cardNumber + "&expM=" + expMonth + "&expY=" + expYear + "&cvv=" + cvv + "&amount=" + amount;
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    response = xhttp.responseText;
                    console.log(response);

                    if (response=='101' || response=='303') {
                        status = 'Approved';
                        updateDatabase();
                        localStorage.clear();
                        document.querySelector('.process-pop').style.display = "none";
                        sucPop.style.display = "block";
                        setTimeout(function() {
                            window.location.href = data.sucUrl;
                          }, 5000);
                       
                    }
                    else if ((response=='202' || response=='505' || response=='404' || response=='606' || response=='707')) {
                        status = 'Diclined';
                        updateDatabase();
                        localStorage.clear();
                        document.querySelector('.process-pop').style.display = "none";
                        unsucPop.style.display = "block";
                        setTimeout(function() {
                            window.location.href = data.unSucUrl;
                          }, 5000);
                        
                    }
                    else {

                    }
                }
              };
            xhttp.open("POST", "http://yasirumacbook.hopto.org:81/onlineBankTrans/process_trans.php", true);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.setRequestHeader("auth-key", authKey);
            xhttp.send(request);

            var updateDatabase = function() {

                var update = "merchant=" + merchant + "&cName=" + cardName + "&cNumber=" + cardNumber + "&refID=" + refID + "&amount=" + amount + "&status=" + status + "&response=" + response;

                var xhttp2 = new XMLHttpRequest();
                xhttp2.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        console.log(xhttp2.responseText);
                    }
                };

                xhttp2.open("POST", "http://yasirumacbook.hopto.org:81/EasyPay/update_database.php", true);
                xhttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhttp2.setRequestHeader("auth-key", authKey);
                xhttp2.send(update);
            }

        }
    }

})();

var UIController = (function () {

    var DOMStrings = {
        cardName: '.card-name',
        cardNumber: '.card-number',
        expM: '.exp-month',
        expY: '.exp-year',
        cvvNum: '.cvv',
        submitBtn: '.sub-btn'
    };

    return {
        getInput: function() {

            return {
                cName: document.querySelector(DOMStrings.cardName).value,
                cNumber: document.querySelector(DOMStrings.cardNumber).value,
                expMonth: document.querySelector(DOMStrings.expM).value,
                expYear: document.querySelector(DOMStrings.expY).value,
                cvv: document.querySelector(DOMStrings.cvvNum).value
            };
            
        },

        clearFields: function() {

            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.cardName + ', ' + DOMStrings.cardNumber + ',' + DOMStrings.expM + ',' + DOMStrings.expY + ',' + DOMStrings.cvvNum);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach (function (current, index, array) {
                current.value = "";
            });

            fieldsArr[0].focus();

        },

        checkInputs: function() {
            var input = this.getInput();

            if (input.cNumber >= 1000000000000000 && input.expMonth >= 1 && input.expYear >= 2020 && input.cvv >= 1) {
                console.log('pass');
                if (input.cNumber <= 9999999999999999 && input.expMonth <= 12 && input.expYear <= 2100 && input.cvv <= 999) {
                    return true;
                }
                else {
                    window.alert("Please enter valid details!");
                    return false;
                }
            }
            else {
                window.alert("Please enter valid details!2");
                return false;
            }
        },

        getDOMStrings: function() {
            return DOMStrings;
        }
    }

})();

var controller = (function (UICtrl, rqsHand) {

    var setupEventListeners = function() {

        var DOM = UICtrl.getDOMStrings();

        document.querySelector(DOM.submitBtn).addEventListener('click', function() {
            document.getElementById('mypop').style.display = "block";
            document.querySelector('.process-pop').style.display = "block";
            proceedTransaction();
        });

    };

    var proceedTransaction = function () {

        // 1. Validate inputs
        var valid = UICtrl.checkInputs();

        // 2. Format inputs
        if (valid) {
            // 3. Get inputs
            var cardName = UICtrl.getInput().cName;
            var cardNumber = UICtrl.getInput().cNumber;
            var expYear = UICtrl.getInput().expYear;
            var expMonth = UICtrl.getInput().expMonth;
            var cvv = UICtrl.getInput().cvv;

            // 4. Get transaction data
            var merchant = rqsHand.getData().merchant;
            var amount = rqsHand.getData().amount;
            var refID = rqsHand.getData().refID;

            // 5. Get auth key
            console.log(authKey);

            // 6. Submit Request
            // console.log(cardNumber);
            // console.log(expYear);
            // console.log(expMonth);
            // console.log(cvv);
            // console.log(amount);
            // console.log(refID);
            UICtrl.clearFields();
            rqsHand.postRequest(cardName, cardNumber, expMonth, expYear, cvv, amount, authKey, refID, merchant);

            // console.log(status);
            // checkStatus(status);
        }
    };

    return {
        init: function() {
            console.log('Started');
            setupEventListeners();
        },

        setupAuthKey: function() {
            function uuidv4() {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                  return v.toString(16);
                });
              }
    
              return uuidv4();
        }

    }

})(UIController, requestHandler);

var authKey = controller.setupAuthKey();
console.log(authKey);
controller.init();

