ko.validation.init({
    errorMessageClass: "help-block text-danger"
});

ko.bindingHandlers.fadeVisible = {
    init: function (element, valueAccessor) {
        // Start visible/invisible according to initial value
        var shouldDisplay = valueAccessor();
        $(element).toggle(shouldDisplay);
    },
    update: function (element, valueAccessor) {
        // On update, fade in/out
        var shouldDisplay = valueAccessor();
        shouldDisplay ? $(element).fadeIn() : $(element).fadeOut();
    }
};

function VevaiosiViewModel() {
    var self = this;

    self.name = ko.observable("").extend({
        // required: true,
        required: {
            message: "Αυτό το πεδίο είναι υποχρεωτικό"
        },
        minLength: 2,
        // validation: {
        //    message: "Please enter at least 2 characters",
        //    validator: function(value) {
        //       return value.length >= 2;
        //    }
        // }
    });
    self.address = ko.observable("").extend({
        // required: true,
        required: {
            message: "Αυτό το πεδίο είναι υποχρεωτικό"
        },
        minLength: 2
    });

    self.hasBeenSubmitted = ko.observable(false);
    self.allFieldsFilled = ko.observable(false);
    

    self.reasons = ko.observableArray([{
            id: 1,
            text: "Μετάβαση σε φαρμακείο ή επίσκεψη στον γιατρό, εφόσον αυτό συνιστάται μετά από σχετική επικοινωνία."
        },
        {
            id: 2,
            text: "Μετάβαση σε εν λειτουργία κατάστημα προμηθειών αγαθών πρώτης ανάγκης (σούπερ μάρκετ, μίνι μάρκετ), όπου δεν είναι δυνατή η αποστολή τους."
        },
        {
            id: 3,
            text: "Μετάβαση σε δημόσια υπηρεσία ή τράπεζα, στο μέτρο που δεν είναι δυνατή η ηλεκτρονική συναλλαγή."
        },
        {
            id: 4,
            text: "Κίνηση για παροχή βοήθειας σε ανθρώπους που βρίσκονται σε ανάγκη ή συνοδεία ανηλίκων μαθητών από/προς το σχολείο."
        },
        {
            id: 5,
            text: "Μετάβαση σε τελετή κηδείας υπό τους όρους που προβλέπει ο νόμος ή μετάβαση διαζευγμένων γονέων ή γονέων που τελούν σε διάσταση που είναι αναγκαία για τη διασφάλιση της επικοινωνίας γονέων και τέκνων, σύμφωνα με τις κείμενες διατάξεις."
        },
        {
            id: 6,
            text: "Σωματική άσκηση σε εξωτερικό χώρο ή κίνηση με κατοικίδιο ζώο, ατομικά ή ανά τρία άτομα, τηρώντας στην τελευταία αυτή περίπτωση την αναγκαία απόσταση 1,5 μέτρου."
        }
    ]);

    self.reason_selected = ko.observable().extend({
        // required: true,
        required: {
            message: "Αυτό το πεδίο είναι υποχρεωτικό"
        }
    });

    self.hrefUrl = ko.computed(function(){
        return "sms:13033?body:" + self.reason_selected() + " " + self.name() + " " + self.address();
    }, self);
    
    
    self.allFields = ko.computed(function () {
        self.errors = ko.validation.group(this);
        if (self.errors().length > 0) {
            console.log("Validation Failed")
            // self.errors.showAllMessages();
            self.allFieldsFilled(false)
        } else {
            console.log("Validation Passed")
            console.log({
                name: self.name(),
                address: self.address(),
                reason_selected: self.reason_selected()
            })
            self.allFieldsFilled(true)
        }
    }, this);

    self.submit = function () {
        self.errors = ko.validation.group(this);
        if (self.errors().length > 0) {
            console.log("Validation Failed")
            self.errors.showAllMessages();
        } else {
            console.log("Validation Passed")
            console.log({
                name: self.name(),
                address: self.address(),
                reason_selected: self.reason_selected()
            })
            self.hasBeenSubmitted(true)
        }
    }
};

const knockoutApp = document.querySelector("#knockout-app");
ko.applyBindings(new VevaiosiViewModel(), knockoutApp);