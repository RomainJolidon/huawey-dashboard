class Serializable {

    static jsonDeepCopy(json) {
        return JSON.parse(JSON.stringify(json));
    }

    static isDate(field) {
        const timestamp = Date.parse(field);
        if (isNaN(timestamp))
            return false;

        const date = new Date(timestamp).toISOString();
        // we cannot only compare `field` with `date` because golang provide μs precision and javascript only ms precision
        // exemple: 2020-04-06T08:42:53.268813Z vs 2020-04-06T08:42:53.310Z

        // size of a μs precision ISO datetime
        if (field.length > 27)
            return false;

        // timezone aware marker
        if (field.slice(-1) !=='Z')
            return null;

        // check if both have the same second precision
        // we don't check ms precision because it can be stripped if equal to 0
        return field.substring(0, 19) === date.substring(0, 19);

    }

    fromJson(json) {
        for (const propName in json) {
            const prop = json[propName];
            if (typeof (prop) == "string" && Serializable.isDate(prop))
                this[propName] = new Date(prop);
            else
                this[propName] = prop;
        }
        return this;
    }
}

module.exports = Serializable;
