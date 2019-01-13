export const capitalize = (text) => {
    if (text.search('-') > -1)
    {
        let newString;
        let a = text.split('-');
        if(a.length > 2) {
            let firstword = a[0].charAt(0).toUpperCase() + a[0].slice(1);
            let secondword = a[1].charAt(0).toUpperCase()+ a[1].slice(1);
            let thirdword = a[2].charAt(0).toUpperCase()+ a[2].slice(1);
            newString = firstword + '-' + secondword + '-' + thirdword;
        } else {
            let firstword = a[0].charAt(0).toUpperCase() + a[0].slice(1);
            let secondword = a[1].charAt(0).toUpperCase()+ a[1].slice(1);
                newString = firstword + '-' + secondword;
        }
        return newString;

    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  