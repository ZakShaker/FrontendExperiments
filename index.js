/**
 * @param {String} dateStr
 * @returns {Object}
 */
module.exports = function (dateStr) {
    var monthNames = [
        '01', '02', '03', '04',
        '05', '06', '07', '08',
        '09', '10', '11', '12'
    ];

    var dateTime = new Date(dateStr);

    dateTime
        .setUTCHours(
            Number(
                String(
                    String(
                        dateStr.match(/\d\d:/)
                    ).match(/\d\d/))
            )
        );

    var func = function (str) {
        var minutes = Number(str.getUTCMinutes());
        var strMinutes;
        if (minutes < 10) {
            strMinutes = '0'.concat(String(minutes));
        } else {
            strMinutes = String(minutes);
        }

        var hours = Number(str.getUTCHours());
        var strHours;
        if (hours < 10) {
            strHours = '0'.concat(String(hours));
        } else {
            strHours = String(hours);
        }

        var days = Number(str.getUTCDate());
        var strDays;
        if (days < 10) {
            strDays = '0'.concat(String(days));
        } else {
            strDays = String(days);
        }

        return String(str.getUTCFullYear())
            .concat('-')
            .concat(monthNames[str.getMonth()])
            .concat('-')
            .concat(strDays)
            .concat(' ')
            .concat(strHours)
            .concat(':')
            .concat(strMinutes);
    };

    var date = {
        value: func(dateTime),
        add: function (amount, unit) {
            if (amount < 0) throw new TypeError();
            if ('minutes'.match(new RegExp(unit))) {
                var mins = dateTime.getMinutes();
                dateTime.setMinutes(mins + amount);
                this.value = func(dateTime);
                return this;
            }
            if ('hours'.match(new RegExp(unit))) {
                var hours = dateTime.getHours();
                dateTime.setHours(hours + amount);
                this.value = func(dateTime);
                return this;
            }
            if ('days'.match(new RegExp(unit))) {
                hours = dateTime.getHours();
                dateTime.setHours(hours + 24 * amount);
                this.value = func(dateTime);
                return this;
            }
            if ('months'.match(new RegExp(unit))) {
                var months = dateTime.getMonth();
                dateTime.setMonth(months + amount);
                this.value = func(dateTime);
                return this;
            }
            if ('years'.match(new RegExp(unit))) {
                var years = dateTime.getUTCFullYear();
                dateTime.setUTCFullYear(years + amount);
                this.value = func(dateTime);
                return this;
            } else {
                throw new TypeError();
            }

        }
        ,
        subtract: function (amount, unit) {
            if (amount < 0) throw new TypeError();
            if ('minutes'.match(new RegExp(unit))) {
                var mins = dateTime.getMinutes();
                dateTime.setMinutes(mins - amount);
                this.value = func(dateTime);
                return this;
            }
            if ('hours'.match(new RegExp(unit))) {
                var hours = dateTime.getHours();
                dateTime.setUTCHours(hours - amount);
                this.value = func(dateTime);
                return this;
            }
            if ('days'.match(new RegExp(unit))) {
                hours = dateTime.getHours();
                dateTime.setUTCHours(hours - 24 * amount);
                this.value = func(dateTime);
                return this;
            }
            if ('months'.match(new RegExp(unit))) {
                var months = dateTime.getMonth();
                dateTime.setMonth(months - amount);
                this.value = func(dateTime);
                return this;
            }
            if ('years'.match(new RegExp(unit))) {
                var years = dateTime.getUTCFullYear();
                dateTime.setUTCFullYear(years - amount);
                this.value = func(dateTime);
                return this;
            } else {
                throw new TypeError();
            }

        }
    };
    return date;
};