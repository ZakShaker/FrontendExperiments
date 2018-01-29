// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
    var args = command.split(' ');

    var operation = args[0];

    if (operation.search(/ADD/) > -1) {
        var contact = {
            name: args[1],
            phones: args[2].split(',')
        };

        if (phoneBook[contact.name] == undefined) {
            phoneBook[contact.name] = contact.phones;
        } else {
            phoneBook[contact.name] = phoneBook[contact.name].concat(contact.phones);
        }
    }

    if (operation.search(/SHOW/) > -1) {
        var contacts = [];
        for (var name in phoneBook) {
            if (phoneBook[name].length > 0) {
                var cont = {
                    name: name,
                    phones: phoneBook[name]
                };
                contacts.push(cont);
            }
        }

        contacts.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });

        var results = [];

        contacts.forEach(function (c) {
            var contactInfo = c.name + ': ' + c.phones.join(', ');
            results.push(contactInfo);
        });

        return results;
    }

    if (command.search(/REMOVE_PHONE /) > -1) {
        var phoneNumber = args[1];
        var found = false;
        for (var key in phoneBook) {
            var phonePosition = phoneBook[key].indexOf(phoneNumber);
            if (phonePosition > -1) {
                phoneBook[key].splice(phonePosition, 1);
                return true;
            }
        }
        return found;
    }

}