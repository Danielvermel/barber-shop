import Vue from 'vue';
import $dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';


Vue.filter('formatNumberWithCommas', function(value) {
    if (!isNaN(value)) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});

Vue.filter('unslug', function(slug) {
    let regexp = /[_,\- ]+/;
    if(slug && isNaN(slug)) {
        let words = slug.split(regexp);

        for (var i = 0; i < words.length; i++) {
            let word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1);
        }

        return words.join(' ');
    } else {
        return slug;
    }
});

Vue.filter('serviceHistory', function(slug) {
    if(slug) {
        let words = slug.split('_');
        for (var i = 0; i < words.length; i++) {
            let word = words[i];
            words[i] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }

        return words.join(' ');
    }
});

Vue.filter('slugify', function(value) {
    if (value) {
        value = value.replace(/^\s+|\s+$/g, '');

        // Make the string lowercase
        value = value.toLowerCase();

        // Remove accents, swap ñ for n, etc
        var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆÍÌÎÏŇÑÓÖÒÔÕØŘŔŠŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇíìîïňñóöòôõøðřŕšťúůüùûýÿžþÞĐđßÆa·/_,:;";
        var to   = "AAAAAACCCDEEEEEEEEIIIINNOOOOOORRSTUUUUUYYZaaaaaacccdeeeeeeeeiiiinnooooooorrstuuuuuyyzbBDdBAa------";
        for (var i=0, l=from.length ; i<l ; i++) {
            value = value.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        // Remove invalid chars
        value = value.replace(/[^a-z0-9 -]/g, '')
        // Collapse whitespace and replace by -
        .replace(/\s+/g, '-')
        // Collapse dashes
        .replace(/-+/g, '-');

        return value;
    }
});

Vue.filter('truncate' , function(value) {
    if(value) {
        return (value.length > 85) ? value.substr(0, 85 - 1) + '...' : value;
    }
});

Vue.filter('initials', function(value) {
    if (value) {
        let name =  value.match(/\b\w/g) || [];

        return ((name.shift() || '') + (name.pop() || '')).toUpperCase();
    }
});

Vue.filter('titlecase', function(value) {
    if (value) {
        return value.replace(/\w\S*/g, function (value) {
            return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
        });
    }
});

Vue.filter('formatPriceDecimal', function(value) {
    value = parseFloat(value);
    if (!isNaN(value)) {
        return  value.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
    }
});

Vue.filter('formatPrice', function(value) {
    if (!isNaN(value)) {
        return  parseFloat(value).toLocaleString('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );
    }
});

Vue.filter('vehiclePriceWithAdminFee', function(vehicle) {
    if (vehicle.advert_type === 'SOR_VEHICLE') {
        return Number.parseInt(vehicle.price) + Number.parseInt(vehicle.admin_fee || 0);
    }

    return vehicle.price;
});

Vue.filter('formatTime', function(value) {
    if (value) {
        // remove everything after & including the last :
        var afterWithout = value.substr(0, value.lastIndexOf(":"));

        return afterWithout;
    }
});

Vue.filter('formatCardVehicleName', function(value) {
    try {
        let lowercase = value.toLowerCase().trim();
        let map = {
            'honda honda e' : 'Honda Honda e',
            'honda honda e advance' : 'Honda Honda e Advance'
        };

        if (map[lowercase]) {
            return map[lowercase];
        }

        return value
    } catch(e) {
        return value;
    }
});

Vue.filter('formatVehicleRange', function(value) {
    try {
        let lowercase = value.toLowerCase();
        let map = {
            'asx' : 'ASX',
            'captur' : 'CAPTUR',
            'clio' : 'CLIO',
            'civic-type-r' : 'Civic Type-R',
            'cr-v' : 'CR-V',
            'cr-v-hyrbid' : 'CR-V Hybrid',
            'cx-30' : 'CX-30',
            'cx-5' : 'CX-5',
            'e' : 'e',
            'eclipse-cross' : 'Eclipse Cross',
            'grand-scenic' : 'GRAND SCENIC',
            'hr-v' : 'HR-V',
            'i10' : 'i10',
            'i20' : 'i20',
            'i30' : 'i30',
            'ioniq' : 'IONIQ',
            'kadjar' : 'KADJAR',
            'koleos' : 'KOLEOS',
            'kangoo' : 'KANGOO',
            'leaf' : 'LEAF',
            'logan' : 'Logan MCV',
            'logan-stepway' : 'Logan MCV Stepway',
            'master' : 'MASTER',
            'megane' : 'MEGANE',
            'magane-r.s' : 'MEGANE R.S',
            'megane-st' : 'MEGANE ST',
            'mx-5' : 'MX-5',
            'mx-5 rf' : 'MX-5 RF',
            'outlander-phev' : 'Outlander PHEV',
            'sandero-stepway' : 'Sandero Stepway',
            'santa-fe' : 'Santa Fe',
            'shogun-sport' : 'Shogun Sport',
            'trafic' : 'TRAFIC',
            'xc40' : 'XC40',
            'xc60' : 'XC60',
            'xc90' : 'XC90',
            'x-trail' : 'X-Trail',
            'zoe' : 'ZOE',
        };

        if (map[lowercase]) {
            return map[lowercase]
        };

        return value
    } catch(e) {
        return value;
    }
});


Vue.filter('formatBodyType', function(value) {
    if (value) {
        if (value.toUpperCase() === "MPV") {
            return 'MPV';
        }

        if (value.toUpperCase() === "SUV") {
            return 'SUV';
        }

        return value.replace(/\w\S*/g, function (value) {
            return value.charAt(0).toUpperCase() + value.substr(1).toLowerCase();
        });
    }
});

Vue.filter('formatVrm', function(value) {
    if (value) {
        return   value.substr(0, 4) + ' ' + value.substr(4);
    }
});

Vue.filter('formatNumber', function(value) {
    if (!isNaN(value)) {
        return  parseFloat(value).toLocaleString('en-GB', { maximumFractionDigits: 0});
    }
});

Vue.filter('uppercase', function(value) {
    if (value) {
        return value.toUpperCase() ;
    }
});

Vue.filter('formatDate', function(value) {
    $dayjs.extend(advancedFormat);
    if (value) {
        return $dayjs(value).format('Do MMM YYYY');
    }
});

Vue.filter('formatBlogDate', function(value) {
    $dayjs.extend(advancedFormat);
    if (value) {
        return $dayjs(value).format('DD/MM/YYYY');
    }
});

Vue.filter('formatMonthYear', function(value) {
    $dayjs.extend(advancedFormat);
    if (value) {
        return $dayjs(value).format('MMMM YYYY');
    }
});


Vue.filter('formatDayMonth', function(value) {
    $dayjs.extend(advancedFormat);
    if (value) {
        return $dayjs(String(value)).format('dddd Do MMMM')
    }
});

Vue.filter('formatDayMonthTime', function(value) {
    $dayjs.extend(advancedFormat);
    if (value) {
        return $dayjs(String(value)).format('dddd Do MMMM @ HH:mm')
    }
});
