const PHONE_NUMBER = '+000000000000';

export const PHONE = (() => {
    const DIGITS_ONLY = /[^\d]/g;
    const PHONE_GROUPS = /^(\d{3})(\d{2})(\d{3})(\d{4})$/;

    const format = (value: string): string => {
        const groups = value.replace(DIGITS_ONLY, '').match(PHONE_GROUPS);

        return groups ? `+${groups.slice(1).join(' ')}` : value;
    };

    return {
        raw: PHONE_NUMBER,
        digits: PHONE_NUMBER.replace(DIGITS_ONLY, ''),
        telHref: `tel:${PHONE_NUMBER}`,
        display:  format(PHONE_NUMBER),
    } as const;
})();

export const SOCIAL_LINK = {
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    whatsapp: `https://api.whatsapp.com/send?phone=${PHONE.digits}`,
} as const;
