const size = {
    //mobileS: '320px',
    //mobileM: '375px',
    mobile: '425px',
    tablet: '768px',
    //laptop: '1024px',
    //laptopL: '1440px',
    desktop: '2560px'
};

let prevKey = 0, list = {};
for (let key in size) {
    if (prevKey === 0) {
        list[key] = `(min-width: 0px) and (max-width: ${size[key]}) `
    } else {
        list[key] = `(min-width: ${size[prevKey]}) and (max-width: ${size[key]})`
    }
    prevKey = key;
}

export const device = list;

/*{
    mobileS: `(max-width: ${size.mobileS}) and  (min-width: 0)`,
    mobileM: `(max-width: ${size.mobileM}) and  (min-width: ${size.mobileS})`,
    mobileL: `(max-width: ${size.mobileL}) and  (min-width: ${size.mobileM})`,
    tablet: `(max-width: ${size.tablet}) and  (min-width: ${size.mobileL})`,
    laptop: `(max-width: ${size.laptop}) and  (min-width: ${size.tablet})`,
    laptopL: `(max-width: ${size.laptopL}) and  (min-width: ${size.laptop})`,
    desktop: `(max-width: ${size.desktop}) and  (min-width: ${size.laptopL})`,
    desktopL: `(min-width: ${size.desktopL})`
};*/