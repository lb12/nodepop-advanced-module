'use strict';

const setLocale = (req, res, next) => {
    const locale = req.params.locale;
    const backTo = req.get('referer');
    
    res.cookie('nodepop-locale', locale, {maxAge: 1000 * 60 * 60 * 24 * 20});

    res.redirect(backTo);
};

module.exports = {
    setLocale
}